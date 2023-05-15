<?php

include '../includes/base.php';

// this file is an API that return a json of stations from the database
// if the request contain a name, the API will return the stations that contain the name

// set the collection Stations

// Allow CORS


$stations = $client->projet_reservation_trains->selectCollection('Stations');

// get the name from the request
if (isset($_GET['name']))
    $name = $_GET['name'];
else
    $name = '';

// if the name is not empty
if ($name != '') {
    // find the stations that contain the name
    $cursor = $stations->find(['name' => new MongoDB\BSON\Regex($name, 'i')]);
} else {
    // find all the stations
    $cursor = $stations->find();
}

// create an array of stations
$stationsArray = array();

// for each station
foreach ($cursor as $station) {
    // add the station to the array
    array_push($stationsArray, $station);
}

// return the array as a json
echo json_encode($stationsArray);

?>