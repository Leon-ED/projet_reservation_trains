import json
import uuid

def hashObject(obj):
    return obj.__hash__()


class Station:
    def __init__(self, name, city,region,type):
        self.name = name
        self.city = city
        self.region = region
        self.type = type
        self._id = uuid.uuid4().hex

    def __str__(self):
        return f"{self.name} ({self.city}, {self.region})"
    
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)
    


class StationsGenerator:
    def __init__(self, path):
        self.path = path
        self.stations = []

    def generate(self):
        stations = []
        with open(self.path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    name, city, region, type = line.split(";")
                    stations.append(Station(name, city, region, type))
        stations.sort(key=lambda s: s.name)
        self.stations = stations
        return self

    def toJSON(self, path):
        with open(path, "w", encoding="utf-8") as f:
            json.dump(self.stations, f, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)
        
