<?php

//Api.php

class API
{
 private $connect = '';

 function __construct()
 {
  $this->database_connection();
 }

 function database_connection()
 {
  $this->connect = new PDO("mysql:host=localhost;dbname=gep", "root", "");
 }

function getList()
{
    $query = "SELECT * FROM gep.processos ORDER BY id";
    $statement = $this->connect->prepare($query);
    if($statement->execute())
    {
    while($row = $statement->fetch(PDO::FETCH_ASSOC))
    {
    $data[] = $row;
    }
    return $data;
}
}

function delete($id)
{
    $query = "DELETE FROM gep.processos where ID = $id";
    $statement = $this->connect->prepare($query);
    $statement->execute();
    echo "Elemento excluido com sucesso !";
}

}

?>
