<?php
/***
 * Projet : projet_reservation_trains
 * Fichier : server/api/promo.php
 * Auteurs : DELMAS Denis 
 * Date : 01/06/2023
 * Version : 1.0
 * Description : Permet de vérifier si un code promo est valide lors de la réservation
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

// On vérifie que le code promo est bien défini, sinon on renvoie une erreur et on arrête le script
if (!isset($_GET['code'])) {
    echo "Invalid request";
    die();
}

//  On récupère la collection "Promo_Codes"
$promo = $client->projet_reservation_trains->selectCollection('Promo_Codes');

// On récupère le code promo
$query = array('code' => $_GET['code']);
$cursor = $promo->findOne($query);

// On renvoie le code promo au format JSON
echo json_encode($cursor);

?>