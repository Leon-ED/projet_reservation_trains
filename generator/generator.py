'''
 * Projet : projet_reservation_trains
 * Fichier : generator/classes/generator.py
 * Auteurs :  EDMEE Léon
 * Date : 01/06/2023
 * Version : 1.0
 * Description : Génère des stations de train depuis un fichier 
 * Licence : Libre - Creative Commons CC-BY-SA
 *
'''
import json, os
from classes.Station import *
from classes.Train import *



if __name__ == "__main__":
    # Génère les stations
    StationsGenerator("data/stations.csv").generate().toJSON("out/stations.json")
    # Génère les trains
    STATIONS = loadStations()
    TrainGenerator(STATIONS).generate(train_per_day=3,number_of_days=1).toJSON("out/trains.json")
