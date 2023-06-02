/**
 * Projet: @projet_reservation_trains
 * Fichier: src/pages/Reservations.tsx
 * Auteur(s): Denis DELMAS
 * Date: 01/06/2023
 * Description: Page qui affiche les réservations de l'utilisateur
 * Version : 1.0
 * 
 * License: @license MIT
*/
import { useState, useEffect } from "react";
import { getReservations } from "../utils/functions";
import jsPDF from 'jspdf';
import QRCode from 'qrcode';



// Page qui affiche les réservations de l'utilisateur
export const Reservations = () => {
    const client = JSON.parse(localStorage.getItem("client") || "{}"); // Récupérer les informations du client dans le local storage
    const id_card = client.card;
 
    const [reservations, setReservations] = useState<any | null>(undefined); // Liste des réservations de l'utilisateur

    useEffect(() => { // Récupérer les réservations de l'utilisateur
        if (id_card === undefined) { // Vérifier si le client est connecté
            alert("Veuillez vous connecter pour accéder à vos réservations"); // Afficher un message d'erreur
            // Rediriger vers la page de connexion
            window.location.href = "/login";
        } else {
            // Récupérer les réservations de l'utilisateur
            getReservations(id_card)
                .then((reservationsData) => {
                    // On met à jour la liste des réservations de l'utilisateur
                    for (let i = 0; i < reservationsData.length; i++) {
                        reservationsData[i].selectedOptions = JSON.parse(reservationsData[i].selectedOptions)
                        reservationsData[i].selectedOptions = JSON.parse(reservationsData[i].selectedOptions)
                        reservationsData[i].passengersInfo = JSON.parse(reservationsData[i].passengersInfo)
                        reservationsData[i].passengersInfo = JSON.parse(reservationsData[i].passengersInfo)
                        reservationsData[i].selected_seats = JSON.parse(reservationsData[i].selected_seats)

                    }
                    // On met à jour la liste des réservations de l'utilisateur
                    setReservations(reservationsData);
                })
                .catch((error) => {
                    console.error("Error fetching reservations:", error);
                });
        }
    }, [id_card]);

    // Afficher les réservations de l'utilisateur
    return (
        <>
            <section>
                <h2>Mes Réservations</h2>
                <div>
                    {reservations ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Train</th>
                                    <th>Provenance</th>
                                    <th>Destination</th>
                                    <th>Arrêts</th>
                                    <th>Prix</th>
                                    <th>Nombre de passagers</th>
                                    <th>Options</th>
                                    <th>Total</th>
                                    <th>Imprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation: any) => (
                                    <tr key={reservation._id}>
                                        <td>{reservation.train.train_type + " n°" + reservation.train.train_number}</td>
                                        <td>{reservation.train.departure_station.name}</td>
                                        <td>{reservation.train.arrival_station.name}</td>
                                        <td>
                                            <ul>
                                                {reservation.train.stopsList.map((stop) => (
                                                    <li key={stop._id}>{stop.name}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>{reservation.price} €</td>
                                        <td>{Object.keys(reservation.passengersInfo).length}</td>
                                        <td>
                                            <ul>
                                                {reservation.selectedOptions.map((option) => (
                                                    <li>{option}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>{reservation.price} €</td>
                                        <td><button onClick={() => { showPrintBillet(reservation) }}>🖨️</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Aucune réservation trouvée.</p>
                    )}
                </div>
            </section>
        </>
    );
};

// Fonction qui permet d'afficher le billet au format PDF
function showPrintBillet(reservation: any) {
    // Appeler la fonction pour générer le billet au format PDF
    generateEbilletPDF(reservation);
}

// Fonction qui permet de générer le billet au format PDF
function generateEbilletPDF(reservation: any) {
    // Récupérer les informations nécessaires du JSON de réservation
    const trainType = reservation.train.train_type;
    const trainNumber = reservation.train.train_number;
    const departureStation = reservation.train.departure_station.name;
    const arrivalStation = reservation.train.arrival_station.name;
    const stopsList = reservation.train.stopsList.map((stop: any) => stop.name).join(", ");
    const price = reservation.price;
    const passengersInfo = reservation.passengersInfo;
    const selectedOptions = reservation.selectedOptions;
  
    // Générer les données pour le QR code
    const qrData = JSON.stringify(reservation._id);
  
    // Créer un nouveau document PDF
    const doc = new jsPDF();
  
    // Définir la taille et les positions du QR code et du texte
    const qrCodeSize = 80;
    const qrCodeX = (doc.internal.pageSize.getWidth() - qrCodeSize) / 2;
    const qrCodeY = 20;
    const textX = 20;
    const textY = qrCodeY + qrCodeSize + 20;
  
    // Générer le QR code
    QRCode.toDataURL(qrData)
      .then((qrCodeDataUrl) => {
        // Insérer le QR code dans le document PDF
        doc.addImage(qrCodeDataUrl, 'PNG', qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);
  
        // Ajouter le texte du billet
        doc.setFontSize(12);
        doc.text(`Train: ${trainType} n°${trainNumber}`, textX, textY);
        doc.text(`Provenance: ${departureStation}`, textX, textY + 10);
        doc.text(`Destination: ${arrivalStation}`, textX, textY + 20);
        doc.text(`Arrêts: ${stopsList}`, textX, textY + 30);
        doc.text(`Prix: ${price} €`, textX, textY + 40);
        doc.text(`Nombre de passagers: ${Object.keys(passengersInfo).length}`, textX, textY + 50);
        doc.text(`Options: ${selectedOptions.join(", ")}`, textX, textY + 60);
  
        // Enregistrer le fichier PDF
        doc.save('billet.pdf');
      })
      .catch((error) => {
        console.error('Error generating QR code:', error);
      });
  }
  