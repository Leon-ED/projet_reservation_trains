/**
 * Projet: @projet_reservation_trains
 * Fichier: src/components/SeatsChooser.tsx
 * Auteur(s): Léon EDMEE
 * Date: 01/06/2023
 * Description: Le but de ce composant est d'afficher le choix des places pour la réservation d'un train donné avec le nombre de places restantes et le nombre de places que l'utilisateur a réservé
 * Version : 1.0
 * 
 * License: @license MIT
*/
import { useEffect, useState } from "react"
import { TrainConfig } from "../utils/types"
import { MessageComp } from "./MessageComp"

// Composant SeatsChooser qui affiche le choix des places pour la réservation d'un train donné avec le nombre de places restantes et le nombre de places que l'utilisateur a réservé
export const SeatsChooser = ({ trainCfg, numberOfPassengers, reservedSeats }: { trainCfg: TrainConfig, numberOfPassengers: number, reservedSeats: Function }) => {
    const takenSeats = trainCfg.taken_seats
    const totalSeats = trainCfg.total_seats
    const seatsPerCar = trainCfg.seats_per_car
    const numberOfCars = trainCfg.number_of_cars


    const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // Liste des places sélectionnées
    const [finished, setFinished] = useState<boolean>(false);  // true = l'utilisateur a fini de sélectionner ses places, false = l'utilisateur n'a pas fini de sélectionner ses places
    const reserveSeat = (seatNumber: number) => { // Réserver une place
        if (takenSeats.includes(seatNumber)) { // Vérifier que la place n'est pas déjà prise
            return;
        }

        // Vérifier si la place est déjà sélectionnée
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat: number) => seat !== seatNumber))
        } else {
            if (selectedSeats.length >= numberOfPassengers) {
                return;
            }
            setSelectedSeats([...selectedSeats, seatNumber])
        }
    }
    // Mettre à jour le nombre de places que l'utilisateur a réservé et le nombre de places restantes
    useEffect(() => {
        // Mettre à jour le nombre de places que l'utilisateur a réservé et le nombre de places restantes
        reservedSeats(selectedSeats)
        const train: any = JSON.parse(localStorage.getItem("train") || "{}") // Récupérer le train dans le local storage
        if (selectedSeats.length === numberOfPassengers) { // Vérifier si l'utilisateur a fini de sélectionner ses places
            setFinished(true) // L'utilisateur a fini de sélectionner ses places
            // Ajouter les places sélectionnées dans le train object dans le local storage
            train.selected_seats = selectedSeats
            localStorage.setItem("train", JSON.stringify(train))
        } else {
            // L'utilisateur n'a pas fini de sélectionner ses places
            setFinished(false)
            delete train.selected_seats // Supprimer les places sélectionnées du train object dans le local storage
            localStorage.setItem("train", JSON.stringify(train))// Mettre à jour le train dans le local storage          
        }
    }, [selectedSeats])


    // Afficher le choix des places pour la réservation d'un train donné avec le nombre de places restantes et le nombre de places que l'utilisateur a réservé
    return (
        <section className="seatsChooser">
            <h3>Choisissez vos places</h3>
            <div className="seatsChooser__body">
                {!finished && <p>Nombre de places que j'ai réservé : {selectedSeats.length + "/" + numberOfPassengers}</p>}
                {!finished && <p>Nombre de places restantes : {totalSeats - trainCfg.taken_seats.length - selectedSeats.length}/{totalSeats}</p>}
                {finished && <MessageComp titre="Vous avez presque fini" message="Remplissez maintenant vos informations" type="success" redirectText="C'est parti" redirectTo="/reservation/clients" />}
            </div>
            <div className="seatChooser_train">
                {Array.from(Array(numberOfCars).keys()).map((carNumber) => {
                    return (
                        <div className="seatChooser_train__car" key={carNumber}>
                            <p>Voiture n°{carNumber + 1}</p>
                            <div className="seatChooser_train__car__seats">
                                {Array.from(Array(seatsPerCar).keys()).map((seatNumber) => {
                                    const seat = carNumber * seatsPerCar + seatNumber + 1
                                    const isTaken = takenSeats.includes(seat)

                                    let testSeatNumber = seat;
                                    if (testSeatNumber > 48)
                                        testSeatNumber -= 48 * carNumber
                                    let isOnThirdRow: boolean
                                    if ((testSeatNumber >= 25 && testSeatNumber <= 36)) {
                                        isOnThirdRow = true
                                    } else {
                                        isOnThirdRow = false
                                    }
                                    const isSeatSelected = selectedSeats.includes(seat);
                                    return (
                                        <Seat
                                            seatNumber={seat}
                                            isTaken={isTaken}
                                            isOnThirdRow={isOnThirdRow}
                                            isSeatSelected={isSeatSelected}
                                            selectSeat={reserveSeat}
                                            key={seat}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

// Composant Seat qui affiche une place
export const Seat = ({ seatNumber, isTaken, isOnThirdRow, isSeatSelected, selectSeat }: { seatNumber: number, isTaken: boolean, isOnThirdRow: boolean, isSeatSelected: boolean, selectSeat: Function }) => {
    // Définir les classes css
    const classNames: string = "seatChooser_train__car__seats__seat " + (isTaken ? "seatChooser_train__car__seats__seat--taken " : "") + (isOnThirdRow ? "seat_mt " : "") + (isSeatSelected ? "seatChooser_train__car__seats__seat--selected " : "");
    // Afficher une place
    return (
        <div className={classNames} onClick={() => { selectSeat(seatNumber) }} key={seatNumber}>
            <span className="seatId">{seatNumber}</span>
        </div>
    )
}
