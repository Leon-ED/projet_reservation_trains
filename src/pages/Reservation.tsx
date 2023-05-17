import { useParams } from "react-router-dom"
import { MessageComp } from "../components/MessageComp";
import { getTrainConfigFromId, getTrainFromId } from "../utils/functions";
import { useEffect, useState } from "react";
import { SearchType, Train, TrainConfig } from "../utils/types";
import { DisplayTrainInSearch, TrainRecap } from "../components/Train";
import { SeatsChooser } from "../components/SeatsChooser";


export const ReservationPage = () => {
    const { idTrain } = useParams();
    const [train, setTrain] = useState<Train>();
    const [trainConfig, setTrainConfig] = useState<TrainConfig>()
    const [search, setSearch] = useState<SearchType>();

    useEffect(() => {
        if (!idTrain)
            return
        const main = async () => {
            const trainTest: Train = await getTrainFromId(idTrain)
            if (!trainTest)
                return
            setTrain(trainTest)
            const trainConfigTest: TrainConfig = await getTrainConfigFromId(idTrain)
            if (!trainConfigTest)
                return
            setTrainConfig(trainConfigTest)
            const searchTest: SearchType = JSON.parse(localStorage.getItem("search") || "{}")
            if (!searchTest)
                return
            setSearch(searchTest)
            

        }
        main()
    }, [])




    return (
        <>
            <section>
                <h2>Réservation de votre ticket</h2>
            </section>
            {console.log(train)}
            {train ? <TrainRecap train={train} /> : <MessageComp titre="Erreur" message="Le train demandé n'existe pas" type="error" redirectTo="/" redirectText="Retour à l'accueil" />}
            {(trainConfig && search?.number_of_passengers) ? <SeatsChooser trainCfg={trainConfig} numberOfPassengers={search?.number_of_passengers} /> : <MessageComp titre="Erreur" message="Le train demandé n'existe pas" type="error" redirectTo="/" redirectText="Retour à l'accueil" />}
            </>





    )
}