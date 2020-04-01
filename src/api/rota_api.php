<?php

//test_api.php

include('Api.php');

$api_object = new API();

if($_GET["action"] == 'getList'){
 $data = $api_object->getList();
}


if($_GET["action"] == 'delete'){
    
    if(!isset($_GET['id'])){
        $mensagem = "O id não foi definido";
        echo $mensagem;
        die();
    }

$id_do_registro = $_GET["id"];

$data = $api_object->delete($id_do_registro);
}

echo json_encode($data);

?>
