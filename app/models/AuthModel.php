<?php

class AuthModel {
    public function __construct()
    {
        $this->db = new Database;
    }

    /* Create: Función para dar de alta al usuario.
        Tener en cuenta que para los campos TIMESTAMP, no se usa la función bind.
    */
    public function crear_usuario($data)
	{
		
		$keyw = "keyword";
		$this->db->query("INSERT INTO usuario
                          (nombre, apellido, avatar, email, pass, created_at) 
						  VALUES 
						  (:nombre, :apellido, :avatar, :email, aes_encrypt(:pass,:keyword), CURRENT_TIMESTAMP)");
        $this->db->bind('nombre', $data['nombre']);
        $this->db->bind('apellido', $data['apellido']);
        $this->db->bind('avatar', $data['avatar']);                  
		$this->db->bind('email', $data['email']);
		$this->db->bind('pass', $data['pass']);
		$this->db->bind('keyword', $keyw);
		if ($this->db->execute()) {
			return true;
		} else {
			return false;
		}
	}

    	/* Método para buscar el mail y la contraseña para comprobar si existe y poder loguear
		*	Devuelve un objeto con los datos del usuario.
		*/

	public function buscar_por_mail($data)
	{
		$this->db->query("SELECT 
						usuario.id, usuario.nombre, usuario.apellido, usuario.email,
                         usuario.rol_id, usuario.avatar,
                         rol.nombre AS rol,
                         aes_decrypt(usuario.pass, 'keyword') AS pass
                  FROM usuario
                  INNER JOIN rol ON rol.id = usuario.rol_id
                  WHERE usuario.email = :email
                  AND usuario.deleted_at IS NULL");
		$this->db->bind('email', $data['email']);
		
		$result = $this->db->register();
		return $result;
	}
			
	public function permiso_por_rol ($rol_id)
	{
		$this->db->query(
			"SELECT permiso.nombre 
		FROM rol_permiso 
		INNER JOIN permiso 
		ON permiso.id = rol_permiso.permiso_id
		WHERE rol_permiso.rol_id = :rol_id"
		);

		$this->db->bind('rol_id',(int) $rol_id);
		
		//nombre de permisos segun id de rol
		return array_column($this->db->registers(), 'nombre');
	}





	public function change_pass($pass, $email)
	{
		
		$keyw = 'keyword';
		$this->db->query("UPDATE usuario SET
								pass = aes_encrypt(:new_pass,:keyword),
								updated_at=CURRENT_TIMESTAMP
							 WHERE email=:mail");
		$this->db->bind('new_pass', $pass);
		$this->db->bind('keyword', $keyw);
		$this->db->bind('mail', $email);
		if ($this->db->execute()) {
			return true;
		} else {
			return false;
		}
	}



	
}
?>