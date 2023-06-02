/**
 * Projet: @projet_reservation_trains
 * Fichier: src/components/Navbar.tsx
 * Auteur(s): léon EDMEE
 * Date: 01/06/2023
 * Description: Affichage de la barre de navigation
 * Version : 1.0
 * 
 * License: @license MIT
*/
import { Link } from "react-router-dom"

// Composant Navbar qui affiche la barre de navigation
export const Navbar = () => {
    return (
        <nav>
            <div className="left">
                <img src="/imgs/ratp.png" height="50px" />
                <h2>Régie Autonome du Tran Parisien</h2>
            </div>
            <div className="middle">
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><a href="/cgv">A propos</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
            <div className="right">
                <input id="search" type="text" placeholder="Recherche" />
                <ul>
                    <li><a href="/login">Connexion</a></li>
                    <li><a href="/reservations">Mes réservations</a></li>
                    <li><a href="/cart">Panier</a></li>
                </ul>
            </div>
        </nav>
    )
}

