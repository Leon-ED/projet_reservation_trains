import json, os
from classes.Station import *
from classes.Train import *



if __name__ == "__main__":
    
    generator = StationsGenerator("data/stations.csv").generate().toJSON("out/stations.json")

    TERMINUS_STATIONS,PASSING_STATIONS = loadStations()
    TrainGenerator(TERMINUS_STATIONS,PASSING_STATIONS).generate(train_per_day=80,number_of_days=40).toJSON("out/trains.json")
