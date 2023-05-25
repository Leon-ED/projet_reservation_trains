<?php

include '../includes/base.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Invalid request";
    die();
}

if (!isset($_GET['code'])) {
    echo "Invalid request";
    die();
}

//  check if the coupon code is valid
$promo = $client->projet_reservation_trains->selectCollection('Promo_Codes');

$query = array('code' => $_GET['code']);
$cursor = $promo->findOne($query);

echo json_encode($cursor);

?>