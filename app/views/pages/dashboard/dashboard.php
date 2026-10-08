<?php require RUTA_APP . "/views/layout/admin/header.php"; ?>

<!-- Page Wrapper -->
<div id="wrapper">

    <?php require RUTA_APP . "/views/layout/admin/menu.php"; ?>
    
    <!-- Content Wrapper -->
    <div class="d-flex flex-column flex-grow-1">

        <!-- Main Content -->
        <div id="content">

            <!-- Topbar -->
            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow-sm px-4">

                <!-- Sidebar Toggle (Topbar) -->
                <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle me-3">
                    <i class="fa fa-bars"></i>
                </button>

                <!-- Topbar Navbar -->
                <ul class="navbar-nav ms-auto align-items-center">

                    <div class="topbar-divider d-none d-sm-block"></div>

                    <!-- Nav Item - User Information -->
                    <li class="nav-item dropdown no-arrow">
                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown" role="button"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="me-2 d-none d-lg-inline text-gray-600 small fw-bold"><?php echo $_SESSION['nombre']; ?></span>
                            <img class="avatar rounded-circle" src="<?php echo RUTA_AVATAR . $_SESSION['avatar']; ?>" alt="Avatar" width="32" height="32">
                        </a>
                        <!-- Dropdown - User Information -->
                        <div class="dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="userDropdown">
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                                Perfil
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                <i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                                Cerrar Sesión
                            </a>
                        </div>
                    </li>

                </ul>

            </nav>
            <!-- End of Topbar -->

            <!-- Begin Page Content -->
            <div class="container-fluid px-4">

                <!-- Page Heading -->
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h1 class="h3 mb-0 text-gray-800 fw-bold">Tus tareas</h1>
                        <p class="text-muted small mb-0">Gestión dinámica de actividades</p>
                    </div>
                    <button id="btnNuevaTarea" class="btn btn-primary btn-sm shadow-sm fw-bold" data-bs-toggle="modal" data-bs-target="#modalTarea">
                        <i class="fas fa-plus-circle fa-sm text-white-50 me-1"></i> Nueva Tarea
                    </button>
                </div>

                <!-- Barra de Filtros -->
                <div class="row mb-4">
                    <div class="col-md-4">
                        <label for="selectFiltroEstado" class="form-label small text-muted mb-1">Filtrar por estado</label>
                        <select id="selectFiltroEstado" class="form-select form-select-sm shadow-sm">
                            <option value="0">Todos los estados</option>
                            <?php foreach ($data['estados'] as $estado): ?>
                                <option value="<?php echo $estado->id_estado; ?>">
                                    <?php echo $estado->nombre; ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>

                <!-- Tabla Principal -->
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0" id="dataTable" width="100%" cellspacing="0">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col" class="ps-4">#</th>
                                        <th scope="col">Título</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Fecha de Alta</th>
                                        <th scope="col">Vencimiento</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col" class="text-center pe-4" colspan="2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaTareasBody">
                                    <!-- Carga dinámica vía Javascript / API -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            <!-- /.container-fluid -->
            
        </div>
        <!-- End of Main Content -->

    </div>
    <!-- End of Content Wrapper -->

</div>
<!-- End of Page Wrapper -->

<!-- Modal Unificado: Crear / Editar Tarea -->
<div class="modal fade" id="modalTarea" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
            <div class="modal-header">
                <h5 class="modal-title fw-bold" id="modalTareaTitulo">Nueva Tarea</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <form id="formTarea" novalidate>
                <input type="hidden" name="id_tarea" id="id_tarea">

                <div class="modal-body">
                    <div class="mb-3">
                        <label for="tareaTitulo" class="form-label small text-muted">Título</label>
                        <input type="text" name="titulo" id="tareaTitulo" class="form-control" placeholder="Ej: Redactar documentación" required>
                    </div>

                    <div class="mb-3">
                        <label for="tareaDescripcion" class="form-label small text-muted">Descripción</label>
                        <textarea name="descripcion" id="tareaDescripcion" class="form-control" rows="3" placeholder="Detalles de la tarea..."></textarea>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="tareaExpiredAt" class="form-label small text-muted">Vencimiento</label>
                            <input type="date" name="expired_at" id="tareaExpiredAt" class="form-control">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="tareaIdEstado" class="form-label small text-muted">Estado</label>
                            <select name="id_estado" id="tareaIdEstado" class="form-select" required>
                                <?php foreach ($data['estados'] as $estado): ?>
                                    <option value="<?php echo $estado->id_estado; ?>">
                                        <?php echo $estado->nombre; ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary fw-bold">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php require RUTA_APP . "/views/layout/admin/footer.php"; ?>