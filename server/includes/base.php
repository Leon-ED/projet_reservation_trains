<?php
require ('../vendor/autoload.php');
use MongoDB\Client;
use MongoDB\Driver\ServerApi;

// Replace the placeholder with your Atlas connection string
$uri = 'mongodb+srv://admin:admin@projet-reservation-trai.607c19n.mongodb.net/?retryWrites=true&w=majority';

// cors 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require '../includes/cors.php';




// Specify Stable API version 1
$apiVersion = new ServerApi(ServerApi::V1);

// Create a new client and connect to the server
$client = new MongoDB\Client($uri, [], ['serverApi' => $apiVersion]);

try {
    // Send a ping to confirm a successful connection
    $client->selectDatabase('projet_reservation_trains')->command(['ping' => 1]);
} catch (Exception $e) {
    printf($e->getMessage());
}
