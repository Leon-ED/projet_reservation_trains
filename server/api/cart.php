<?php

include '../includes/base.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Invalid request";
    die();
}

// check if all the parameters are set id_card: string, selected_seats: any, selectedOptions: any, passengersInfo: any, price: number
if (!isset($_GET["id_card"]) && !isset($_GET["selected_seats"]) && !isset($_GET["selectedOptions"]) && !isset($_GET["passengersInfo"]) && !isset($_GET["price"])) {
    //  echo the missing parameters
    echo "Missing parameters";
    die();
}

$id_card = $_GET["id_card"];
$selected_seats = $_GET["selected_seats"];
$selectedOptions = $_GET["selectedOptions"];
$passengersInfo = $_GET["passengersInfo"];
$price = $_GET["price"];

$cart = $client->projet_reservation_trains->selectCollection('Cart');

$query = array(
    "id_card" => $id_card,
    "selected_seats" => $selected_seats,
    "selectedOptions" => $selectedOptions,
    "passengersInfo" => $passengersInfo,
    "price" => $price
);
$cursor = $cart->insertOne($query);
echo json_encode($cursor);

?>