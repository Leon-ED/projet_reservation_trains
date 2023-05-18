<?php

// 
//const response = await fetch(API_URL + "/trains.php?departure_station=" + departure_station._id + "&arrival_station=" + arrival_station._id + "&date_departure=" + date_departure)
include '../includes/base.php';

if (isset($_GET['departure_station']) && isset($_GET['arrival_station']) && isset($_GET['date_departure'])) {
    $departureStationId = $_GET['departure_station'];
    $arrivalStationId = $_GET['arrival_station'];
    $date_departure = $_GET['date_departure'];
    
    $date = date('d/m/Y', strtotime($date_departure));
    
} else {
    return json_encode(array('error' => 'missing parameters'));
}

$trains = $client->projet_reservation_trains->selectCollection('Trains');
// $date = "18/05/2023";
// $departureStationId = "79be237b7dc0438dad17d1c2a140d91d";
// $arrivalStationId = "cb17d95c2a184cd79c823a7995076c03";


// find the trains that departs from the departure station or stops at the departure station and arrives at the arrival station or stops at the arrival station
$query = array(
    "departure_station._id" => $departureStationId,
    "arrival_station._id" => $arrivalStationId,
    "date_departure" => $date
);
// var_dump(json_encode($query));
$cursor = $trains->find($query);

// create an array of trains
$trainsArray = array();

// for each train
foreach ($cursor as $train) {
    // id is an object, we need to convert it to string
    $train->_id = (string)$train->_id;
    array_push($trainsArray, $train);
}

// return the array as a json
echo json_encode($trainsArray);
