```php
<!-- Footer -->
<footer class="d-flex justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-6 d-flex align-items-center">

        Prof. Juan Pablo Cesarini | <?php echo date('d-m-Y');?>

    </div>
</footer>
<!-- End of Footer -->

</div>
<!-- End of Content Wrapper -->

</div>
<!-- End of Page Wrapper -->

<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
</a>

<!-- Logout Modal-->
<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">

    <div class="modal-dialog" role="document">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Ya te vas?</h5>

                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>

            <div class="modal-body">
                Seleccioná "Logout" si realmente querés abandonar esta sesión.
            </div>

            <div class="modal-footer">

                <button class="btn btn-secondary" type="button" data-dismiss="modal">
                    Cancel
                </button>

                <a class="btn btn-primary" href="<?php echo RUTA_PUBLIC;?>/AuthController/logout">
                    Logout
                </a>

            </div>

        </div>

    </div>

</div>

<!-- jQuery -->
<script src="<?php echo RUTA_PUBLIC;?>/vendor/jquery/jquery.min.js"></script>

<!-- Bootstrap -->
<script src="<?php echo RUTA_PUBLIC;?>/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- jQuery Easing -->
<script src="<?php echo RUTA_PUBLIC;?>/vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- Toastr -->
<script src="<?php echo RUTA_PUBLIC;?>/vendor/toastr/toastr.min.js"></script>

<!-- SB Admin 2 -->
<script src="<?php echo RUTA_PUBLIC;?>/vendor/sb-admin-2/sb-admin-2.min.js"></script>

<!-- JavaScript principal de la aplicación -->
<script type="module" src="<?php echo RUTA_PUBLIC;?>/js/main.js"></script>

</body>

</html>
```
