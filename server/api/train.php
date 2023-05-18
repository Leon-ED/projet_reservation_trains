<?php

// 
//const response = await fetch(API_URL + "/trains.php?departure_station=" + departure_station._id + "&arrival_station=" + arrival_station._id + "&date_departure=" + date_departure)
include '../includes/base.php';
if(!isset($_GET["id"])){
    return json_encode(array('error' => 'missing parameters'));
}

$idtrain = $_GET["id"];

$trains = $client->projet_reservation_trains->selectCollection('Trains');

$query = array(
    "_id" => new MongoDB\BSON\ObjectId($idtrain)
);
$cursor = $trains->findOne($query);

echo json_encode($cursor);
