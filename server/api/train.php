<?php
/***
 * Projet : projet_reservation_trains
 * Fichier : server/api/trains.php
 * Auteurs : DELMAS Denis & EDMEE Léon
 * Date : 01/06/2023
 * Version : 1.0
 * Description : Renvoie toutes les informations disponible sur un train (id, date, places, gares de départ et d'arrivée, prix, etc.)
 * METHODE : GET, POST
 * 
 * Licence : Libre - Creative Commons CC-BY-SA
 * 
 */
// 

// Charge le script de connexion à la base de données
include '../includes/base.php';

// Vérifie que l'id du train est bien défini, sinon renvoie une erreur et arrête le script
if(!isset($_GET["id"])){
    return json_encode(array('error' => 'missing parameters'));
}

// Récupère l'id du train
$idtrain = $_GET["id"];

// Récupère la collection "Trains"
$trains = $client->projet_reservation_trains->selectCollection('Trains');

// Récupère le train
$query = array(
    "_id" => new MongoDB\BSON\ObjectId($idtrain)
);
$cursor = $trains->findOne($query);

// Récupérer pour chaque train l'objet Station à la place de l'id
$stations = $client->projet_reservation_trains->selectCollection('Stations');
$cursor["departure_station"] = $stations->findOne(array("_id" => $cursor["departure_station"]));
$cursor["arrival_station"] = $stations->findOne(array("_id" => $cursor["arrival_station"]));


// Egalement pour les stations où le train s'arrête
$stopsList = $cursor["stopsList"];
$cursor["stopsList"] = array();
foreach($stopsList as $stop){
    $cursor["stopsList"][] = $stations->findOne(array("_id" => $stop));
}


echo json_encode($cursor);
