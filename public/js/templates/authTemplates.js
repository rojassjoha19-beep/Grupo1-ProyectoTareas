export const loginTemplate = () => `
<div class="container my-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-5">
            <div class="card border-0 shadow-lg rounded-3">
                <div class="card-body p-4 p-sm-5">
                    
                    <div class="text-center mb-4">
                        <h1 class="h4 text-gray-900 fw-bold">Iniciar Sesión</h1>
                        <p class="text-muted small">Ingresá tus credenciales para acceder</p>
                    </div>

                    <form id="formLogin" class="user" novalidate>
                        <div class="mb-3">
                            <label for="exampleInputEmail" class="form-label small text-muted">Correo Electrónico</label>
                            <input
                                name="email"
                                type="email"
                                class="form-control"
                                id="exampleInputEmail"
                                placeholder="ejemplo@correo.com"
                                required
                            >
                        </div>

                        <div class="mb-3">
                            <label for="exampleInputPassword" class="form-label small text-muted">Contraseña</label>
                            <div class="input-group">
                                <input
                                    name="password"
                                    type="password"
                                    class="form-control"
                                    id="exampleInputPassword"
                                    placeholder="••••••••"
                                    required
                                >
                                <button class="btn btn-outline-secondary btn-toggle-password" type="button" tabindex="-1">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </div>
                        </div>

                        <div class="mb-3 form-check">
                            <input type="checkbox" name="remember" class="form-check-input" id="customCheck">
                            <label class="form-check-label small" for="customCheck">Recordame</label>
                        </div>

                        <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">
                            Ingresar
                        </button>
                    </form>

                    <hr class="my-4">

                    <div class="text-center mb-2">
                        <a class="small text-decoration-none" href="/reset-password" data-link>
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                    <div class="text-center">
                        <a class="small text-decoration-none" href="/register" data-link>
                            ¿No tenés cuenta? Registrate
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
`;

export const resetPasswordTemplate = () => `
<div class="container my-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-5">
            <div class="card border-0 shadow-lg rounded-3">
                <div class="card-body p-4 p-sm-5">
                    
                    <div class="text-center mb-4">
                        <h1 class="h4 text-gray-900 fw-bold">¿Olvidaste la contraseña?</h1>
                        <p class="text-muted small mb-0">Ingresá tu email y te enviaremos las instrucciones para generar una nueva.</p>
                    </div>

                    <form id="formForgotPassword" class="user" novalidate>
                        <div class="mb-4">
                            <label for="inputEmail" class="form-label small text-muted">Correo Electrónico</label>
                            <input 
                                name="email" 
                                type="email" 
                                class="form-control form-control-user" 
                                id="inputEmail" 
                                placeholder="tu@email.com"
                                required
                            >
                        </div>

                        <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">
                            Enviar Instrucciones
                        </button>
                    </form>

                    <hr class="my-4">

                    <div class="text-center">
                        <a class="small text-decoration-none" href="/login" data-link>
                            ¿Te acordaste? Volver al Login
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
`;

export const registerTemplate = () => `
<div class="container my-5">
    <div class="row justify-content-center">
        <div class="col-lg-7">
            <div class="card border-0 shadow-lg rounded-3">
                <div class="card-body p-4 p-sm-5">
                    
                    <div class="text-center mb-4">
                        <h1 class="h4 text-gray-900 fw-bold">Crear una Cuenta</h1>
                        <p class="text-muted small">Completá tus datos para registrarte en el sistema</p>
                    </div>

                    <form id="formRegister" enctype="multipart/form-data" novalidate>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="nombre" class="form-label small text-muted">Nombre</label>
                                <input type="text" name="nombre" class="form-control" id="nombre" required>
                            </div>
                            <div class="col-md-6">
                                <label for="apellido" class="form-label small text-muted">Apellido</label>
                                <input type="text" name="apellido" class="form-control" id="apellido">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label small text-muted">Correo Electrónico</label>
                            <input type="email" name="email" class="form-control" id="email" required>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="password" class="form-label small text-muted">Contraseña</label>
                                <div class="input-group">
                                    <input type="password" name="password" class="form-control" id="password" required>
                                    <button class="btn btn-outline-secondary btn-toggle-password" type="button" tabindex="-1">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="password2" class="form-label small text-muted">Repetir Contraseña</label>
                                <div class="input-group">
                                    <input type="password" name="password2" class="form-control" id="password2" required>
                                    <button class="btn btn-outline-secondary btn-toggle-password" type="button" tabindex="-1">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="avatar" class="form-label small text-muted">Imagen de Perfil (Opcional)</label>
                            <input type="file" name="avatar" class="form-control" id="avatar" accept="image/png, image/jpeg, image/jpg">
                        </div>

                        <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">
                            Registrarse
                        </button>
                    </form>

                    <hr class="my-4">

                    <div class="text-center">
                        <a class="small text-decoration-none" href="/login" data-link>
                            ¿Ya tenés cuenta? ¡Iniciá sesión!
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
`;

export const updatePasswordTemplate = () => `
<div class="container my-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-5">
            <div class="card border-0 shadow-lg rounded-3">
                <div class="card-body p-4 p-sm-5">
                    
                    <div class="text-center mb-4">
                        <h1 class="h4 text-gray-900 fw-bold">Actualizar Contraseña</h1>
                        <p class="text-muted small">Ingresá tu clave temporal y definí la nueva</p>
                    </div>

                    <form id="formUpdatePassword" class="user" novalidate>
                        <div class="mb-3">
                            <label for="inputUpdateEmail" class="form-label small text-muted">Correo Electrónico</label>
                            <input 
                                id="inputUpdateEmail"
                                name="email" 
                                type="email" 
                                class="form-control" 
                                placeholder="tu@email.com"
                                required
                            >
                        </div>

                        <div class="mb-3">
                            <label for="inputPassActual" class="form-label small text-muted">Contraseña Temporal / Actual</label>
                            <div class="input-group">
                                <input 
                                    id="inputPassActual"
                                    name="pass_actual" 
                                    type="password" 
                                    class="form-control" 
                                    placeholder="••••••••"
                                    required
                                >
                                <button class="btn btn-outline-secondary btn-toggle-password" type="button" tabindex="-1">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="inputPassNueva" class="form-label small text-muted">Nueva Contraseña</label>
                            <div class="input-group">
                                <input 
                                    id="inputPassNueva"
                                    name="pass_nueva" 
                                    type="password" 
                                    class="form-control" 
                                    placeholder="••••••••"
                                    required
                                >
                                <button class="btn btn-outline-secondary btn-toggle-password" type="button" tabindex="-1">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="inputPassNueva2" class="form-label small text-muted">Repetir Nueva Contraseña</label>
                            <div class="input-group">
                                <input 
                                    id="inputPassNueva2"
                                    name="pass_nueva2" 
                                    type="password" 
                                    class="form-control" 
                                    placeholder="••••••••"
                                    required
                                >
                                <button class="btn btn-outline-secondary btn-toggle-password" type="button" tabindex="-1">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">
                            Guardar Nueva Contraseña
                        </button>
                    </form>

                    <hr class="my-4">

                    <div class="text-center">
                        <a class="small text-decoration-none" href="/login" data-link>
                            Volver al Login
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
`;
