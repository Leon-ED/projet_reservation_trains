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

if ($_GET["action"] === "get") {
    get($client);
} else if ($_GET["action"] === "add") {
    add($client);
} else {
    echo "Invalid action";
    die();
}

function add($client) {

    if(!isset($_GET["name"]) && !isset($_GET["surname"]) && !isset($_GET["birthDate"]) && !isset($_GET["email"]) && !isset($_GET["phone"]) && !isset($_GET["address"]) && !isset($_GET["card"]) ){
        //  echo the missing parameters
        echo "Missing parameters";
        die();
    }
    
    
    $name = $_GET["name"];
    $surname = $_GET["surname"];
    $birthDate = $_GET["birthDate"];
    $email = $_GET["email"];
    $phone = $_GET["phone"];
    $address = $_GET["address"];
    $card = $_GET["card"];
    $clients = $client->projet_reservation_trains->selectCollection('Clients');
    
    $query = array(
        "name" => $name,
        "surname" => $surname,
        "birthDate" => $birthDate,
        "email" => $email,
        "phone" => $phone,
        "address" => $address,
        "card" => $card
    );
    $cursor = $clients->insertOne($query);
    echo json_encode($cursor);
}

function get($client) {
    if (!isset($_GET["id_card"])) {
        echo "Missing parameters";
        die();
    }
    $id_card = $_GET["id_card"];

    $clients = $client->projet_reservation_trains->selectCollection('Clients');

    $query = array(
        "card" => $id_card
    );
    $cursor = $clients->findOne($query);

    echo json_encode($cursor);
}

