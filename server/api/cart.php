<?php

include '../includes/base.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Invalid request";
    die();
}

if (!isset($_GET["action"])) {
    echo "Missing action";
    die();
}

$action = $_GET["action"];

if ($action == "add") {
    add($client);
}
elseif ($action == "get") {
    get($client);
}
elseif ($action == "delete") {
    delete($client);
}
else {
    echo "Invalid action";
    die();
}

function add($client){
    // check if all the parameters are set id_card: string, selected_seats: any, selectedOptions: any, passengersInfo: any, price: number
    if (!isset($_GET["id_card"]) && !isset($_GET["selected_seats"]) && !isset($_GET["selectedOptions"]) && !isset($_GET["passengersInfo"]) && !isset($_GET["price"]) && !isset($_GET["ooid_train"])) {
        //  echo the missing parameters
        echo "Missing parameters";
        die();
    }

    $id_card = $_GET["id_card"];
    $selected_seats = $_GET["selected_seats"];
    $selectedOptions = $_GET["selectedOptions"];
    $passengersInfo = $_GET["passengersInfo"];
    $price = $_GET["price"];
    $ooid_train = $_GET["ooid_train"];

    $cart = $client->projet_reservation_trains->selectCollection('Cart');

    $query = array(
        "id_card" => $id_card,
        "selected_seats" => $selected_seats,
        "selectedOptions" => $selectedOptions,
        "passengersInfo" => $passengersInfo,
        "price" => $price,
        "ooid_train" => $ooid_train
    );
    $cursor = $cart->insertOne($query);
    echo json_encode($cursor);
}

function get($client) {
    if (!isset($_GET["id_card"])) {
        echo "Missing parameters";
        die();
    }

    $id_card = $_GET["id_card"];

    $cart = $client->projet_reservation_trains->selectCollection('Cart');

    $query = array(
        "id_card" => $id_card
    );
    $cursor = $cart->find($query);

    $results = array();
    foreach ($cursor as $document) {
        $results[] = $document;
    }

    echo json_encode($results);
}

function delete($client) {
    if (!isset($_GET["ooid_cart"])) {
        echo "Missing parameters";
        die();
    }

    $ooid_cart = $_GET["ooid_cart"];

    $cart = $client->projet_reservation_trains->selectCollection('Cart');

    // ooid_cart is a mongo object id
    $query = array(
        "_id" => new MongoDB\BSON\ObjectId($ooid_cart)
    );

    $cursor = $cart->deleteOne($query);

    echo json_encode($cursor);

}


?>