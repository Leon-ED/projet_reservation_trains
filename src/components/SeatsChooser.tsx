import { useState } from "react"
import {  TrainConfig } from "../utils/types"
import { MessageComp } from "./MessageComp"

export const SeatsChooser = ({ trainCfg, numberOfPassengers }: { trainCfg: TrainConfig, numberOfPassengers: number }) => {
    const takenSeats = trainCfg.taken_seats
    const totalSeats = trainCfg.total_seats
    const seatsPerCar = trainCfg.seats_per_car
    const numberOfCars = trainCfg.number_of_cars

    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [finished, setFinished] = useState<boolean>(false);
    const reserveSeat = (seatNumber: number) => {
        if (takenSeats.includes(seatNumber)) {
            return;
        }

        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat: number) => seat !== seatNumber))
        } else {
            if (selectedSeats.length >= numberOfPassengers) {
                return; 
            }
            setSelectedSeats([...selectedSeats, seatNumber])
        }
        if (selectedSeats.length === numberOfPassengers) {
            setFinished(true)
        }
    }

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


export const Seat = ({ seatNumber, isTaken, isOnThirdRow, isSeatSelected, selectSeat }: { seatNumber: number, isTaken: boolean, isOnThirdRow: boolean, isSeatSelected: boolean, selectSeat: Function }) => {
    const classNames: string = "seatChooser_train__car__seats__seat " + (isTaken ? "seatChooser_train__car__seats__seat--taken " : "") + (isOnThirdRow ? "seat_mt " : "") + (isSeatSelected ? "seatChooser_train__car__seats__seat--selected " : "");

    return (
        <div className={classNames} onClick={() => { selectSeat(seatNumber) }} key={seatNumber}>
            <span className="seatId">{seatNumber}</span>
        </div>
    )
}
