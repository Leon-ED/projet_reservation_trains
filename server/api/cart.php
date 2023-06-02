<?php
/***
 * Projet : projet_reservation_trains
 * Fichier : server/api/cart.php
 * Auteurs : DELMAS Denis
 * Date : 01/06/2023
 * Version : 1.0
 * Description : Permet l'ajout d'un panier à la base de données, la récupération d'un panier ou la suppression d'un panier
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

// On récupère l'action
$action = $_GET["action"];


// Si l'action est "add", on ajoute le panier à la base de données
if ($action == "add") {
    add($client);
}

// Si l'action est "get", on récupère le panier de la base de données
elseif ($action == "get") {
    get($client);
}

// Si l'action est "delete", on supprime le panier de la base de données
elseif ($action == "delete") {
    delete($client);
}

// Sinon, on renvoie une erreur et on arrête le script
else {
    echo "Invalid action";
    die();
}


/**
 * Ajoute un panier à la base de données
 * 
 * @param $client : le client MongoDB
 */
function add($client){
    // Vérifie que les paramètres sont bien définis, sinon renvoie une erreur et arrête le script
    if (!isset($_GET["id_card"]) && !isset($_GET["selected_seats"]) && !isset($_GET["selectedOptions"]) && !isset($_GET["passengersInfo"]) && !isset($_GET["price"]) && !isset($_GET["ooid_train"])) {
        //  echo the missing parameters
        echo "Missing parameters";
        die();
    }

    // Récupère les paramètres
    $id_card = $_GET["id_card"];
    $selected_seats = $_GET["selected_seats"];
    $selectedOptions = $_GET["selectedOptions"];
    $passengersInfo = $_GET["passengersInfo"];
    $price = $_GET["price"];
    $ooid_train = $_GET["ooid_train"];

    // Sélectionne la collection Cart
    $cart = $client->projet_reservation_trains->selectCollection('Cart');

    // Crée la requête
    $query = array(
        "id_card" => $id_card,
        "selected_seats" => $selected_seats,
        "selectedOptions" => $selectedOptions,
        "passengersInfo" => $passengersInfo,
        "price" => $price,
        "ooid_train" => $ooid_train
    );
    // Insère la requête dans la base de données et récupère le résultat de l'insertion et l'affiche
    $cursor = $cart->insertOne($query);
    echo json_encode($cursor);
}


/**
 * Récupère un panier de la base de données
 * 
 * @param $client : le client MongoDB
 */
function get($client) {
    // Vérifie que les paramètres sont bien définis, sinon renvoie une erreur et arrête le script
    if (!isset($_GET["id_card"])) {
        echo "Missing parameters";
        die();
    }
    // Récupère les paramètres
    $id_card = $_GET["id_card"];

    // Sélectionne la collection Cart
    $cart = $client->projet_reservation_trains->selectCollection('Cart');

    // Crée la requête
    $query = array(
        "id_card" => $id_card
    );

    // Récupère le résultat de la requête
    $cursor = $cart->find($query);

    // Crée un tableau de résultats
    $results = array();
    foreach ($cursor as $document) {
        $results[] = $document;
    }

    // Affiche le tableau de résultats
    echo json_encode($results);
}

/**
 * Supprime un panier de la base de données
 * 
 * @param $client : le client MongoDB
 */
function delete($client) {
    // Vérifie que les paramètres sont bien définis, sinon renvoie une erreur et arrête le script
    if (!isset($_GET["ooid_cart"])) {
        echo "Missing parameters";
        die();
    }

    // Récupère les paramètres
    $ooid_cart = $_GET["ooid_cart"];


    // Sélectionne la collection Cart
    $cart = $client->projet_reservation_trains->selectCollection('Cart');

    // Crée la requête
    $query = array(
        "_id" => new MongoDB\BSON\ObjectId($ooid_cart)
    );

    // Supprime le panier de la base de données et récupère le résultat de la suppression et l'affiche
    $cursor = $cart->deleteOne($query);

    // Affiche le résultat de la suppression
    echo json_encode($cursor);

}


?>