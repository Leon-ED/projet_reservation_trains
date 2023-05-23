import json, os
from classes.Station import *
from classes.Train import *



if __name__ == "__main__":
    
    StationsGenerator("data/stations.csv").generate().toJSON("out/stations.json")

    STATIONS = loadStations()
    TrainGenerator(STATIONS).generate(train_per_day=3,number_of_days=1).toJSON("out/trains.json")
