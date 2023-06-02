<?php
/***
 * Projet : projet_reservation_trains
 * Fichier : server/api/trainsList.php
 * Auteurs : DELMAS Denis & EDMEE Léon
 * Date : 01/06/2023
 * Version : 1.0
 * Description : Renvoie la liste des trains disponibles pour un trajet donné et une date donnée
 * METHODE : GET, POST
 * 
 * Licence : Libre - Creative Commons CC-BY-SA
 * 
 */

// 

// Charge le script de connexion à la base de données
include '../includes/base.php';

// On vérifie que les paramètres sont bien définis, sinon on renvoie une erreur et on arrête le script
if (isset($_GET['departure_station']) && isset($_GET['arrival_station']) && isset($_GET['date_departure'])) {
    // On récupère les paramètres
    $departureStationId = $_GET['departure_station'];
    $arrivalStationId = $_GET['arrival_station'];
    $date_departure = $_GET['date_departure'];
    
    $date = date('d/m/Y', strtotime($date_departure));
    
} else {
    return json_encode(array('error' => 'missing parameters'));
}

// On récupère la collection "Trains"
$trains = $client->projet_reservation_trains->selectCollection('Trains');


// On crée la requête pour récupérer les trains
$query = array(
    "departure_station" => $departureStationId,
    "arrival_station" => $arrivalStationId,
    "date_departure" => $date
);
// On récupère les trains
$cursor = $trains->find($query);

// On crée un tableau pour stocker les trains
$trainsArray = array();

// Pour chaque train, on l'ajoute au tableau
foreach ($cursor as $train) {
    // id is an object, we need to convert it to string
    $train->_id = (string)$train->_id;
    array_push($trainsArray, $train);
}

// On renvoie le tableau au format JSON
echo json_encode($trainsArray);
