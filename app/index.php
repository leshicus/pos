<?php require_once("resources/config.php"); ?>
<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <title>Office</title>

    <!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" type="text/javascript" src="bootstrap.js"></script>

    <script type="text/javascript" src="resources/libs/yaml/dist/yaml.js"></script>

    <!-- <script>// * динамически генерит адрес доступа к файлу ws
        var my_awesome_script = document.createElement('script');
        my_awesome_script.setAttribute('src','<?php /*echo WS_ADDRESS;*/ ?>');
        document.head.appendChild(my_awesome_script);
    </script>-->
    <script type="text/javascript">
        var SITE_ROOT_URL ='<?php echo SITE_ROOT_URL;?>';
        var WS_ADDRESS ='<?php echo WS_ADDRESS;?>';
        var FAYE_WS_ADDRESS ='<?php echo FAYE_WS_ADDRESS;?>';
    </script>
    <script type="text/javascript" src="resources/libs/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="resources/libs/faye.js"></script>
    <script type="text/javascript" src="resources/libs/FayeClient.js"></script>
    <script type="text/javascript" src="resources/libs/socket.io-1.3.7.js"></script>
    <script type="text/javascript" src="resources/libs/line-transport.js"></script>
    <!--    <script type="text/javascript" src="resources/libs/MT.js"></script>-->
</head>
<body></body>
</html>
