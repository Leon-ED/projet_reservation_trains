import json, os
from classes.Station import *



if __name__ == "__main__":
    #print currentpath
    print(os.getcwd())
    
    generator = StationsGenerator("data/stations.csv")

    stations = generator.generate().toJSON("out/stations.json")