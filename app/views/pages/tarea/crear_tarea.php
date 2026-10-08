<?php require RUTA_APP . "/views/layout/admin/header.php";?>

<!-- Page Wrapper -->
<div id="wrapper">

    <?php require RUTA_APP . "/views/layout/admin/menu.php";?>

    <!-- Content Wrapper -->
    <div class="d-flex flex-column flex-grow-1">

        <!-- Main Content -->
        <div id="content">

            <!-- Topbar -->
            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <!-- Sidebar Toggle (Topbar) -->
                <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                    <i class="fa fa-bars"></i>
                </button>


                <!-- Topbar Navbar -->
                <ul class="navbar-nav ml-auto">







                    <div class="topbar-divider d-none d-sm-block"></div>

                    <!-- Nav Item - User Information -->
                    <li class="nav-item dropdown no-arrow">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span
                                class="mr-2 d-none d-lg-inline text-gray-600 small"><?php echo $_SESSION['nombre'];?></span>
                            <img class="avatar" src="<?php echo RUTA_AVATAR.$_SESSION['avatar'];?>" alt="">
                        </a>
                        <!-- Dropdown - User Information -->
                        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Perfil
                            </a>


                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Cerrar Sesión
                            </a>
                        </div>
                    </li>

                </ul>

            </nav>
            <!-- End of Topbar -->

            <!-- Begin Page Content -->
            <div class="container-fluid">

                <!-- Page Heading -->
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Crear nueva tarea </h1>
                    <a href="<?php echo RUTA_URL;?>/TareaController/NuevaTarea/"
                        class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                            class="fa fa-plus fa-sm text-white-50"></i> Nueva</a>
                </div>

                <!-- Content Row -->
                <div class="row">


                    <div class="card shadow mb-4">
                        <!--      <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                        </div> -->
                        <div class="card-body">
                            <form action="<?php echo RUTA_URL;?>/TareaController/GuardarTarea" method="post">
                                <div class="row">
                                    <div class="col-4">
                                    <label for="exampleFormControlTextarea1" class="form-label">Título</label>
                                        <input name="titulo" class="form-control form-control-lg" type="text"
                                            placeholder="Título" aria-label=".form-control-lg example">
                                    </div>
                                    <div class="col-4">
                                    <label for="exampleFormControlTextarea1" class="form-label">Estado</label>
                                        <select name="id_estado" class="form-select form-select-lg mb-3"
                                            aria-label="Large select example">
                                            <option>Elegir Estado</option>
                                            <?php foreach($data['estados'] as $est):?>
                                            <option style="color:<?php echo $est->color;?>"
                                                value=<?php echo $est->id;?>><?php echo $est->tipoEstado;?></option>
                                            <?php endforeach;?>
                                        </select>

                                    </div>
                                    <div class="col-4">
                                    <label for="exampleFormControlTextarea1" class="form-label">Fecha de Vencimiento</label>
                                        <input name="expired_at" class="form-control form-control-lg" type="date"
                                            placeholder="Título" aria-label=".form-control-lg example">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Descripción de
                                            tarea</label>
                                        <textarea name="descripcion" class="form-control form-control-lg"
                                            id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <input type="hidden" name="id_usuario" value="<?php echo $_SESSION['id'];?>">
                                    <input type="submit" value="Guardar" class="btn btn-lg btn-primary">
                                </div>
                        </div>


                        </form>
                    </div>


                </div>




            </div>
            <!-- /.container-fluid -->

        </div>
        <!-- End of Main Content -->
        <?php require RUTA_APP . "/views/layout/admin/footer.php";?>