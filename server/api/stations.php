<?php
/***
 * Projet : projet_reservation_trains
 * Fichier : server/api/stations.php
 * Auteurs : DELMAS Denis & EDMEE Léon
 * Date : 01/06/2023
 * Version : 1.0
 * Description : Renvoie toutes les informations disponible sur une station en particulier si un nom est donné, sinon renvoie toutes les stations de la base de données
 * METHODE : GET, POST
 * 
 * Licence : Libre - Creative Commons CC-BY-SA
 * 
 */

// Charge le script de connexion à la base de données
include '../includes/base.php';


// Définit les entêtes CORS
$stations = $client->projet_reservation_trains->selectCollection('Stations');

// Récupère le nom de la station
if (isset($_GET['name']))
    $name = $_GET['name'];
else
    $name = '';

// Si le nom est défini, on récupère les informations de la station
if ($name != '') {
    $cursor = $stations->find(['name' => new MongoDB\BSON\Regex($name, 'i')]);
} else {
    // Sinon, on récupère toutes les stations
    $cursor = $stations->find();
}

// Crée un tableau vide
$stationsArray = array();

// Pour chaque station, on l'ajoute au tableau
foreach ($cursor as $station) {
    // id est un objet, on le convertit en string
    $station->_id = (string)$station->_id;
    array_push($stationsArray, $station);
}

// Envoie le tableau au format JSON
echo json_encode($stationsArray);

?>