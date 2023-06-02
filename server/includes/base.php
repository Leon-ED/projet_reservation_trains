<?php
/***
 * Projet : projet_reservation_trains
 * Fichier : server/includes/base.php
 * Auteurs : DELMAS Denis & EDMEE Léon
 * Date : 01/06/2023
 * Version : 1.0
 * Description : Permet l'accès à la base de données MongoDB
 * 
 * Licence : Libre - Creative Commons CC-BY-SA
 * 
 */

// Charge les extensions composer
require ('../vendor/autoload.php');

// Importe les classes MongoDB
use MongoDB\Client;
use MongoDB\Driver\ServerApi;

// Désactive les erreurs
error_reporting(0);

// URI de la base de données MongoDB, qui contient le nom d'utilisateur et le mot de passe
$uri = 'mongodb+srv://admin:admin@projet-reservation-trai.607c19n.mongodb.net/?retryWrites=true&w=majority';

// Autorise les requêtes CORS venant de n'importe quel domaine
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require '../includes/cors.php';




// Définit la version de l'API du serveur
$apiVersion = new ServerApi(ServerApi::V1);

// Crée un client MongoDB
$client = new MongoDB\Client($uri, [], ['serverApi' => $apiVersion]);


// Vérifie la connexion à la base de données
try {
    // Sélectionne la base de données et envoie une requête ping
    $client->selectDatabase('projet_reservation_trains')->command(['ping' => 1]);
} catch (Exception $e) {
    printf($e->getMessage());
}
