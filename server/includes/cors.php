<?php 
/***
 * Projet : projet_reservation_trains
 * Fichier : server/include cors.php
 * Auteurs : DELMAS Denis
 * Date : 01/06/2023
 * Version : 1.0
 * Description : Permet de gérer les requêtes cross-origin
 * 
 * Licence : Libre - Creative Commons CC-BY-SA
 * 
 */

// Autorise les requêtes cross-origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // Mise en cache de 1 jour
}
?>