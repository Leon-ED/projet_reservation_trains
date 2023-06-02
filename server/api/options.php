<?php
/***
 * Projet : projet_reservation_trains
 * Fichier : server/api/options.php
 * Auteurs : DELMAS Denis 
 * Date : 01/06/2023
 * Version : 1.0
 * Description : Renvoie la liste des options de voyage disponibles
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

//  On récupère la collection "Options_de_voyage"
$options = $client->projet_reservation_trains->selectCollection('Options_de_voyage');

// On récupère toutes les options de voyage
$query = array();
$cursor = $options->find($query);

// On renvoie les options de voyage au format JSON, après les avoir converties en tableau
echo json_encode(iterator_to_array($cursor));



?>