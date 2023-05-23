import random, time
import json

SEATS_PER_CAR = 48
MAX_CARS = 10
MIN_CARS = 1

MAX_STOPS = 10
MIN_STOPS = 1
TRAIN_TYPES = ["TGV", "TER", "Intercités", "Eurostar", "Thalys", "TGV Lyria", "Ouigo"]
OPERATORS = ["SNCF", "Eurostar", "Thalys", "TGV Lyria", "Ouigo","Véolia","Véolia EAU","DB","Tran", "SBB","Trenitalia"]


def loadStations():
    stations_list = []
    with open("out/stations.json", "r", encoding="utf-8") as f:
        stations = json.load(f)
        for station in stations:
            stations_list.append(station['_id'])
    
    return stations_list


class Train:
    def __init__(self, number, type,base_price,operator):
        self.train_number = number
        self.train_type = type
        self.stopsList = []
        self.operator = operator
        self.price = base_price
        self.taken_seats= []
        
    def set_dates(self, date_depart, date_arrivee):
        self.date_departure = date_depart
        self.date_arrival = date_arrivee
    
    def set_times(self, time_depart, time_arrivee):
        self.time_departure = time_depart
        self.time_arrival = time_arrivee
    
    def add_station(self, station):
        self.stopsList.append(station)
    
    def add_stations(self, stations):
        self.stopsList.extend(stations)

    def set_config(self,number_of_cars):
        self.number_of_cars = number_of_cars
        self.total_seats = number_of_cars * SEATS_PER_CAR
    def set_random_taken_seats(self):
        self.taken_seats = random.sample(range(1, self.total_seats), self.total_seats//2)

    def set_start_station(self,start_station):
        self.departure_station = start_station

    def set_end_station(self,end_station):
        self.arrival_station = end_station
    
    def set_stops(self,start_station, end_station, STATIONS):
        new_STATIONS = STATIONS[::]
        new_STATIONS.remove(start_station)
        new_STATIONS.remove(end_station)

        number_of_stops = random.randint(MIN_STOPS,MAX_STOPS)

        for i in range(number_of_stops):
            station = new_STATIONS.pop(random.randint(0,len(new_STATIONS)-1))
            self.stopsList.append(station)


class TrainGenerator:

    def __init__(self,STATIONS):
        self.STATIONS = STATIONS

    def generate(self, train_per_day, number_of_days):
        trains = []
        count = 0
        for start_station in self.STATIONS:
            for i in range(number_of_days):
                for j in range(train_per_day):
                    for end_station in self.STATIONS:
                        if start_station == end_station:
                            continue
                        
                        # On génère j trajets pendant i jours pour chaque station de départ start_station jusqu'a end_station
                        train = Train(count,random.choice(TRAIN_TYPES),random.randint(10,100),random.choice(OPERATORS))
                        
                        day = time.strftime("%d/%m/%Y", time.localtime(time.time()+i*24*60*60))
                        train.set_dates(day,day)
                        train.set_times(f"{random.randint(1,19)}:{random.randint(0,59)}",f"{random.randint(21,23)}:{random.randint(0,59)}")
                        train.set_start_station(start_station)
                        train.set_end_station(end_station)
                        train.set_stops(start_station, end_station, self.STATIONS)
                        train.set_config(random.randint(MIN_CARS,MAX_CARS))
                        train.set_random_taken_seats()
                        trains.append(train)
                        
                        count+=1
        self.trains = trains
        return self


    def toJSON(self,path):
        with open(path, "w", encoding="utf-8") as f:
            json.dump(self.trains, f, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)



if __name__ == "__main__":
    generator = TrainGenerator().generate(1,1).toJSON("out/trains.json")