/**
 * Projet: @projet_reservation_trains
 * Fichier: src/pages/Reservation.tsx
 * Auteur(s): Léon EDMEE
 * Date: 01/06/2023
 * Description: Page de réservation
 * Version : 1.0
 * 
 * License: @license MIT
*/
import { useParams } from "react-router-dom"
import { MessageComp } from "../components/MessageComp";
import { getTrainFromId } from "../utils/functions";
import { useEffect, useState } from "react";
import { SearchType, Train, TrainConfig } from "../utils/types";
import { TrainRecap } from "../components/Train";
import { SeatsChooser } from "../components/SeatsChooser";
import { PeopleChooser } from "../components/PeopleChooser";
import { RecapViewer } from "../components/RecapViewer";

// Page de réservation
export const ReservationPage = () => {
    const { idTrain } = useParams(); // Récupérer l'id du train dans l'url
    const [train, setTrain] = useState<Train>(); // Train
    const [trainConfig, setTrainConfig] = useState<TrainConfig>() // Train config 
    const [search, setSearch] = useState<SearchType>(); // Recherche
    const [seats, setSeats] = useState<number[]>([]); // Liste des places sélectionnées
    const [showPeopleChooser, setShowPeopleChooser] = useState<boolean>(false); // true = afficher le composant PeopleChooser, false = ne pas afficher le composant PeopleChooser
    const [showRecap, setShowRecap] = useState<boolean>(false); // true = afficher le composant RecapViewer, false = ne pas afficher le composant RecapViewer

    // Afficher le composant PeopleChooser si l'url contient "reservation/clients"
    useEffect(() => {
        if (!idTrain)
            return

        if (idTrain === "recap") {
            setShowRecap(true) // Afficher le composant RecapViewer
            return
        }
        else if (idTrain === "clients") {
            setShowPeopleChooser(true) // Afficher le composant PeopleChooser
            return
        }

        setShowRecap(false) // Ne pas afficher le composant RecapViewer
        setShowPeopleChooser(false) // Ne pas afficher le composant PeopleChooser

        // Récupérer le train
        const main = async () => {
            const trainTest: any = await getTrainFromId(idTrain) // Récupérer le train
            const trainCfg: TrainConfig = { // Train config
                _id: trainTest.id,
                train_number: trainTest.train_number,
                seats_per_car: 48,
                number_of_cars: trainTest.number_of_cars,
                total_seats: trainTest.total_seats,
                taken_seats: trainTest.taken_seats
            }
            setTrainConfig(trainCfg) // Mettre à jour le train config

            // Mettre à jour le train
            if (!trainTest)
                return
            setTrain(trainTest)

            // Sauvegarder le train et la recherche dans le local storage
            localStorage.setItem("train", JSON.stringify(trainTest))

            // Récupérer la recherche
            const searchTest: SearchType = JSON.parse(localStorage.getItem("search") || "{}")
            if (!searchTest)
                return
            setSearch(searchTest)


        }
        main()
    }, [])
    // Mettre à jour les places sélectionnées
    useEffect(() => {
    }, [seats])

    // Afficher le composant PeopleChooser si l'url contient "reservation/clients"
    useEffect(() => {
        const url = window.location.href // Récupérer l'url
        if (url.includes("reservation/clients")) { // Vérifier si l'url contient "reservation/clients"
            setShowPeopleChooser(true)
            return
        } else {
            setShowPeopleChooser(false)
        }
    }, [window.location.href])


    // Afficher le composant RecapViewer si l'url contient "reservation/recap"
    return (
        <>
            <section>
                <h2>Réservation de votre ticket</h2>
            </section>

            {train && !showPeopleChooser ? <TrainRecap train={train} /> : <></>}
            {!train && !showPeopleChooser && !showRecap ? <MessageComp titre="Erreur" message="Le train demandé n'existe pas" type="error" redirectTo="/" redirectText="Retour à l'accueil" /> : <></>}
            {trainConfig && !showPeopleChooser && search?.number_of_passengers ? <SeatsChooser trainCfg={trainConfig} numberOfPassengers={search?.number_of_passengers} reservedSeats={(seats: number[]) => { setSeats(seats) }} /> : <></>}
            {!trainConfig && !showPeopleChooser && search?.number_of_passengers ? <MessageComp titre="Erreur" message="Le train demandé n'existe pas" type="error" redirectTo="/" redirectText="Retour à l'accueil" /> : <></>}
            {showPeopleChooser && <PeopleChooser numberOfPassengers={search?.number_of_passengers || 0} reservedSeats={seats} />}
            {showRecap && <RecapViewer />}
        </>
    )
}