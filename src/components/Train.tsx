import { useNavigate } from "react-router-dom"
import { stationFullName } from "../utils/functions"
import { Station, Train } from "../utils/types"



export const DisplayTrainInSearch = ({ train }: { train: Train }) => {

    const duration = (train: Train): string => {
        const timeDeparture = train.time_departure.split(":")
        const timeArrival = train.time_arrival.split(":")

        let hours = parseInt(timeArrival[0]) - parseInt(timeDeparture[0])
        let minutes = parseInt(timeArrival[1]) - parseInt(timeDeparture[1])
        console.log(hours, minutes)
    
    
        return `${hours}h${minutes}`

        




    }

    let arrets = ""
    if (train.stopsList.length === 2) {
        arrets = "Train direct"
    } else {
        arrets = train.stopsList.length - 2 + " arrêt(s)"
    }
    const navigate = useNavigate()


    return (
        <div className="train" onClick={handleTrainClick}>
            <div className="train__header">
                <h3>{train.train_type} n° {train.train_number}</h3>
                <p><span className="train__hour">{train.time_departure}</span>{train.departure_station.name}</p>
                <p><span className="train__hour">{train.time_arrival}</span>{train.arrival_station.name}</p>
            </div>
            <div className="train__body">
                <p><strong>Billet à partir de <span className="train__price">{train.price}</span>EUR </strong></p>
            </div>
            <div className="train__footer">
                <p>Durée du trajet : {duration(train)} </p>
                <p><i>{arrets}</i></p>
            </div>
            <p>Opéré par <span className="train__operator">{train.operator}</span></p>
        </div>
    )


    function handleTrainClick() {
        navigate("/reservation/" + train.id)
    }




}