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

// Récupérer pour chaque train l'objet Station à la place de l'id
$stations = $client->projet_reservation_trains->selectCollection('Stations');
$cursor["departure_station"] = $stations->findOne(array("_id" => $cursor["departure_station"]));
$cursor["arrival_station"] = $stations->findOne(array("_id" => $cursor["arrival_station"]));


// Egalement pour les stations ou le train s'arrête
$stopsList = $cursor["stopsList"];
$cursor["stopsList"] = array();
foreach($stopsList as $stop){
    $cursor["stopsList"][] = $stations->findOne(array("_id" => $stop));
}


echo json_encode($cursor);
