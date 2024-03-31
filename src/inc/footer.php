<script src="../node_modules/preline/dist/preline.js"></script>
<script src="../node_modules/comfy.js/dist/comfy.js"></script>
<script src="../node_modules/lodash/lodash.min.js"></script>
<script src="../node_modules/apexcharts/dist/apexcharts.min.js"></script>
<script src="https://preline.co/assets/js/hs-apexcharts-helpers.js"></script>
<script src="./main.js"></script>
<?php if (isset($_GET['channel']) && isset($_GET['show-for']) && isset($_GET['guess-for'])) {?>
<script>
    getPhp(<?php echo $showFor; ?>, <?php echo $guessFor; ?>, <?php echo json_encode($streamer); ?>);
</script>  
<?php } ?>
</body>
</html>
