<!-- Sidebar -->
<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <div class="sidebar-brand d-flex align-items-center justify-content-center" href="">
        <div>
            <!-- <i class="fas fa-laugh-wink"></i> -->
            <img class="avatar" src="<?php echo RUTA_AVATAR.$_SESSION['avatar'];?>" alt="">
        </div>
        <div class="sidebar-brand-text mx-3"><?php echo $_SESSION['nombre'];?></div>
    </div>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
        <a class="nav-link" href="index.html">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
        Tareas
    </div>
    <!-- Nav Item - Charts -->
    <li class="nav-item">
        <a class="nav-link" href="<?php echo RUTA_URL;?>/TareaController/NuevaTarea">
            <i class="fas fa-plus-circle"></i>
            <span>Nueva Tarea</span></a>
    </li>
    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"
            aria-controls="collapseTwo">
            <i class="fas fa-fw fa-list"></i>
            <span>Listados</span>
        </a>
        
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Tipos</h6>
                <a class="collapse-item " style="color:violet;" href="<?php echo RUTA_URL;?>/TareaController/listarTarea/0"><b>All</b></a>
                <?php foreach ($data['estados'] as $est):?>
                <a class="collapse-item" style="color:<?php echo $est->color;?> "href="<?php echo RUTA_URL;?>/TareaController/listarTarea/<?php echo $est->id;?>"><b><?php echo $est->tipoEstado;?></b></a>
               
                <?php endforeach;?>
            </div>
        </div>
    </li>
 
  

    <!-- Divider -->
    <hr class="sidebar-divider">



  



 


</ul>
<!-- End of Sidebar -->