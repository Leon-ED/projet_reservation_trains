<?php

include '../includes/base.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Invalid request";
    die();
}

//         const response = await fetch(API_URL + "reservation.php?action=add&id_card=" + id_card + "&selected_seats=" + selected_seats + "&selectedOptions=" + selectedOptions + "&passengersInfo=" + passengersInfo + "&price=" + price + "&ooid_train=" + ooid_train)

if (!isset($_GET['action'])) {
    echo "Invalid request";
    die();
}

if ($_GET['action'] == 'add') {
    add($client);
    
}

function add($client) {
    if (!isset($_GET['id_card']) || !isset($_GET['selected_seats']) || !isset($_GET['selectedOptions']) || !isset($_GET['passengersInfo']) || !isset($_GET['price']) || !isset($_GET['ooid_train'])) {
        echo "Invalid request";
        die();
    }

    $reservation = $client->projet_reservation_trains->selectCollection('Reservations');

    $query = array('id_card' => $_GET['id_card'], 'selected_seats' => $_GET['selected_seats'], 'selectedOptions' => $_GET['selectedOptions'], 'passengersInfo' => $_GET['passengersInfo'], 'price' => $_GET['price'], 'ooid_train' => $_GET['ooid_train']);
    $cursor = $reservation->insertOne($query);

    echo json_encode($cursor);
}

?>