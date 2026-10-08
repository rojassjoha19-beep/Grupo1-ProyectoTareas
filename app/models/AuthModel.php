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

    	/* Método para buscar el mail y la contraseña para comprobar si existe y poder loguear*/

	public function buscar_por_mail($data)
	{
		$this->db->query("SELECT id, nombre, email, avatar, aes_decrypt(pass, 'keyword') AS pass 
							  FROM usuario
							  WHERE usuario.email =:email
							  AND deleted_at IS NULL");
		$this->db->bind('email', $data['email']);
		
		$result = $this->db->register();
		return $result;
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