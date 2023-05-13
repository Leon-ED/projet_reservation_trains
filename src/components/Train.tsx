import { Station, Train } from "../utils/types"



export const DisplayTrainInSearch = ({ train }: { train: Train }) => {

    return (
        <div className="train">
            <div className="train__header">
                <div className="train__header__departure">
                    <div className="train__header__departure__time">
                        {train.date_time_departure}
                    </div>
                    <div className="train__header__departure__station">
                        {train.departure_station.name}
                    </div>
                </div>
                <div className="train__header__stops">
                    {train.stopsList.map((stop, index) => {
                        return (
                            <div key={index} className="train__header__stops__stop">
                                {stop.name}
                            </div>
                        )
                    }
                    )}
                </div>
                <div className="train__header__arrival">
                    <div className="train__header__arrival__time">
                        {train.date_time_arrival}
                    </div>
                    <div className="train__header__arrival__station">
                        {train.arrival_station.name}
                    </div>
                </div>
            </div>
            <div className="train__footer">
                <div className="train__footer__operator">
                    {train.operator}
                </div>
                <div className="train__footer__price">
                    {train.price} €
                </div>
            </div>
        </div>
    )

 




}