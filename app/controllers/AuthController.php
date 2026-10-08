<?php

class AuthController extends BaseController {

    private $authModel;

    public function __construct() {
        $this->authModel = $this->model('AuthModel');
    }

    public function checkSession() {
        if (isset($_SESSION['user_id'])) {
            $this->jsonResponse([
                'success' => true,
                'user' => [
                    'id'     => $_SESSION['user_id'],
                    'nombre' => $_SESSION['user_name'] ?? '',
                    'email'  => $_SESSION['user_email'] ?? '',
                    'avatar' => $_SESSION['user_avatar'] ?? null
                ]
            ]);
        } else {
            $this->jsonResponse(['success' => false, 'message' => 'Sin sesión activa'], 401);
        }
    }

    public function login() {
        $data = $this->getJsonBody();

        if (empty($data['email']) || empty($data['password'])) {
            $this->jsonResponse([
                'success' => false, 
                'message' => 'Credenciales incompletas'
            ], 400);
        }

        $user = $this->authModel->buscar_por_mail(['email' => $data['email']]);

        // Si el usuario existe y recuperó la contraseña
        if ($user && isset($user->pass)) {
            // Limpiamos bytes nulos o espacios invisibles que deja AES_DECRYPT de MySQL
            $dbPass = trim((string)$user->pass);
            $inputPass = trim((string)$data['password']);

            if ($dbPass === $inputPass) {
                $_SESSION['user_id']     = $user->id;
                $_SESSION['user_name']   = $user->nombre;
                $_SESSION['user_email']  = $user->email;
                $_SESSION['user_avatar'] = $user->avatar ?? null;

                $this->jsonResponse([
                    'success' => true, 
                    'message' => 'Sesión iniciada correctamente',
                    'user'    => $_SESSION
                ]);
            }
        }

        $this->jsonResponse([
            'success' => false, 
            'message' => 'Email o contraseña incorrectos'
        ], 401);
    }
    public function register() {
        $data = !empty($_POST) ? $_POST : $this->getJsonBody();

        if (empty($data['email']) || empty($data['password']) || empty($data['nombre'])) {
            $this->jsonResponse([
                'success' => false, 
                'message' => 'Todos los campos obligatorios deben ser completados'
            ], 400);
        }

        // Fix de la restricción NOT NULL de la BD asignando avatar por defecto
        $avatarPath = 'img_default.png';

        if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = '../public/uploads/avatars/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            $fileExtension = pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
            $fileName = uniqid('avatar_', true) . '.' . strtolower($fileExtension);
            $targetFilePath = $uploadDir . $fileName;

            $allowedTypes = ['jpg', 'jpeg', 'png', 'webp'];
            if (in_array(strtolower($fileExtension), $allowedTypes)) {
                if (move_uploaded_file($_FILES['avatar']['tmp_name'], $targetFilePath)) {
                    $avatarPath = 'uploads/avatars/' . $fileName;
                }
            }
        }

        $registered = $this->authModel->crear_usuario([
            'nombre'   => filter_var($data['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS),
            'apellido' => filter_var($data['apellido'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
            'email'    => filter_var($data['email'], FILTER_VALIDATE_EMAIL),
            'pass'     => $data['password'],
            'avatar'   => $avatarPath
        ]);

        if ($registered) {
            $this->jsonResponse([
                'success' => true, 
                'message' => 'Usuario registrado exitosamente'
            ], 201);
        } else {
            $this->jsonResponse([
                'success' => false, 
                'message' => 'Error al registrar el usuario o el email ya existe'
            ], 400);
        }
    }

    public function resetPassword() {
        $data = $this->getJsonBody();
        $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);

        if (!$email) {
            $this->jsonResponse([
                'success' => false, 
                'message' => 'Ingresá un correo electrónico válido'
            ], 400);
        }

        try {
            require_once RUTA_APP . '/emails/email_pass.php';

            $this->jsonResponse([
                'success' => true, 
                'message' => 'Instrucciones enviadas a tu casilla de correo'
            ]);

        } catch (Exception $e) {
            $this->jsonResponse([
                'success' => false, 
                'message' => 'No se pudo enviar el correo: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updatePassword() {
        $data = $this->getJsonBody();

        $email      = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
        $passActual = $data['pass_actual'] ?? '';
        $passNueva  = $data['pass_nueva'] ?? '';
        $passNueva2 = $data['pass_nueva2'] ?? '';

        if (!$email || empty($passActual) || empty($passNueva) || empty($passNueva2)) {
            $this->jsonResponse([
                'success' => false, 
                'message' => 'Todos los campos son obligatorios, incluido el email'
            ], 400);
        }

        if ($passNueva !== $passNueva2) {
            $this->jsonResponse([
                'success' => false, 
                'message' => 'Las nuevas contraseñas no coinciden'
            ], 400);
        }

        $user = $this->authModel->buscar_por_mail(['email' => $email]);

        if ($user && isset($user->pass) && $user->pass == $passActual) {
            $updated = $this->authModel->change_pass($passNueva, $email);

            if ($updated) {
                $this->jsonResponse([
                    'success' => true, 
                    'message' => 'Contraseña actualizada correctamente'
                ]);
            } else {
                $this->jsonResponse([
                    'success' => false, 
                    'message' => 'Error al guardar la nueva contraseña'
                ], 500);
            }
        } else {
            $this->jsonResponse([
                'success' => false, 
                'message' => 'La clave temporal enviada es incorrecta o la cuenta no existe'
            ], 400);
        }
    }

    public function logout() {
        session_unset();
        session_destroy();
        $this->jsonResponse([
            'success' => true, 
            'message' => 'Sesión cerrada correctamente'
        ]);
    }
}