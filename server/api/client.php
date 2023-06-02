<?php
/***
 * Projet : projet_reservation_trains
 * Fichier : server/api/client.php
 * Auteurs : DELMAS Denis
 * Date : 01/06/2023
 * Version : 1.0
 * Description : Permet d'ajouter un client à la base de données ou de récupérer les informations d'un client
 * METHODE : GET
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
if (!isset($_GET["action"])) {
    echo "Missing action";
    die();
}

// Si l'action est "get", on récupère le client de la base de données
if ($_GET["action"] === "get") {
    get($client);

// Si l'action est "add", on ajoute le client à la base de données
} else if ($_GET["action"] === "add") {
    add($client);

// Sinon, on renvoie une erreur et on arrête le script
} else {
    echo "Invalid action";
    die();
}

/**
 * Permet d'ajouter un client à la base de données
 * 
 * @param $client : la connexion à la base de données
 */
function add($client) {

    // On vérifie que tous les argueemnts sont bien définis, sinon on renvoie une erreur et on arrête le script
    if(!isset($_GET["name"]) && !isset($_GET["surname"]) && !isset($_GET["birthDate"]) && !isset($_GET["email"]) && !isset($_GET["phone"]) && !isset($_GET["address"]) && !isset($_GET["card"]) ){
        echo "Missing parameters";
        die();
    }
    
    // On récupère les arguments
    $name = $_GET["name"];
    $surname = $_GET["surname"];
    $birthDate = $_GET["birthDate"];
    $email = $_GET["email"];
    $phone = $_GET["phone"];
    $address = $_GET["address"];
    $card = $_GET["card"];
    // On définit la collection Clients
    $clients = $client->projet_reservation_trains->selectCollection('Clients');
    
    // On définit la requête
    $query = array(
        "name" => $name,
        "surname" => $surname,
        "birthDate" => $birthDate,
        "email" => $email,
        "phone" => $phone,
        "address" => $address,
        "card" => $card
    );
    // On ajoute le client à la base de données
    $cursor = $clients->insertOne($query);
    // On renvoie le résultat
    echo json_encode($cursor);
}

/**
 * Permet de récupérer les informations d'un client
 * 
 * @param $client : la connexion à la base de données
 */
function get($client) {
    // On vérifie que l'id est bien défini, sinon on renvoie une erreur et on arrête le script
    if (!isset($_GET["id_card"])) {
        echo "Missing parameters";
        die();
    }
    // On récupère l'id
    $id_card = $_GET["id_card"];

    // On définit la collection Clients
    $clients = $client->projet_reservation_trains->selectCollection('Clients');

    // On définit la requête
    $query = array(
        "card" => $id_card
    );
    // On récupère le client
    $cursor = $clients->findOne($query);

    // On renvoie le résultat
    echo json_encode($cursor);
}

