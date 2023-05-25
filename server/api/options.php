<?php

include '../includes/base.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Invalid request";
    die();
}

//  query MongoDB for all the options
$options = $client->projet_reservation_trains->selectCollection('Options_de_voyage');

$query = array();
$cursor = $options->find($query);

echo json_encode(iterator_to_array($cursor));



?>