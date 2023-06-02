<?php
/***
 * Projet : projet_reservation_trains
 * Fichier : server/api/reservation.php
 * Auteurs : DELMAS Denis
 * Date : 01/06/2023
 * Version : 1.0
 * Description : Permet d'ajouter une réservation à la base de données ou de récupérer les réservations d'un utilisateur
 * METHODE : GET
 * 
 * 
 * Licence : Libre - Creative Commons CC-BY-SA
 * 
 */

// Charge le script de connexion à la base de données
include '../includes/base.php';

// Définit les entêtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");


// On vérifie que la requête est bien de type GET, sinon on renvoie une erreur et on arrête le script
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Invalid request";
    die();
}

// On vérifie que l'action est bien définie, sinon on renvoie une erreur et on arrête le script
if (!isset($_GET['action'])) {
    echo "Invalid request";
    die();
}

// On vérifie que l'action est bien "add" ou "get", sinon on renvoie une erreur et on arrête le script
if ($_GET['action'] == 'add') {
    add($client);
}
elseif ($_GET['action'] == 'get') {
    get($client);
}
/*
 Ajoute une réservation à la base de données
*
* @param $client : la connexion à la base de données
*/
function add($client) {

    // On vérifie que tous les argueemnts sont bien définis, sinon on renvoie une erreur et on arrête le script
    if (!isset($_GET['id_card']) || !isset($_GET['selected_seats']) || !isset($_GET['selectedOptions']) || !isset($_GET['passengersInfo']) || !isset($_GET['price']) || !isset($_GET['ooid_train'])) {
        echo "Invalid request";
        die();
    }
    // On récupère la collection "Reservations"
    $reservation = $client->projet_reservation_trains->selectCollection('Reservations');

    // On ajoute la réservation à la base de données
    $query = array('id_card' => $_GET['id_card'], 'selected_seats' => $_GET['selected_seats'], 'selectedOptions' => $_GET['selectedOptions'], 'passengersInfo' => $_GET['passengersInfo'], 'price' => $_GET['price'], 'ooid_train' => $_GET['ooid_train']);
    $cursor = $reservation->insertOne($query);
    // On renvoie la réservation au format JSON
    echo json_encode($cursor);
}

/**
 * Récupère les réservations d'un utilisateur
 * 
 * @param $client : la connexion à la base de données
 */
function get($client) {
    // On vérifie que l'id_card est bien défini, sinon on renvoie une erreur et on arrête le script
    if (!isset($_GET['id_card'])) {
        echo "Invalid request";
        die();
    }
    // On récupère la collection "Reservations"
    $reservation = $client->projet_reservation_trains->selectCollection('Reservations');
    
    // On récupère les réservations de l'utilisateur
    $query = array('id_card' => $_GET['id_card']);
    $cursor = $reservation->find($query);

    // On renvoie les réservations au format JSON, après les avoir converties en tableau
    $array = array();
    foreach ($cursor as $document) {
        array_push($array, $document);
    }

    echo json_encode($array);
}

?>