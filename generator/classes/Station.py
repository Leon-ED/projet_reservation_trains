'''
 * Projet : projet_reservation_trains
 * Fichier : generator/classes/Station.py
 * Auteurs :  EDMEE Léon
 * Date : 01/06/2023
 * Version : 1.0
 * Description : Génère des stations de train depuis un fichier 
 * Licence : Libre - Creative Commons CC-BY-SA
 *
'''

import json
import uuid



# Hash un objet
def hashObject(obj):
    return obj.__hash__()


# Classe représentant une station de train
class Station:
    # Constructeur
    def __init__(self, name, city,region,type):
        # Paramètres obligatoires
        self.name = name
        self.city = city
        self.region = region
        self.type = type
        self._id = uuid.uuid4().hex

    # Affiche la station en texte
    def __str__(self):
        return f"{self.name} ({self.city}, {self.region})"
    
    # Convertit la station en JSON
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)
    


# Classe permettant de générer des stations de train
class StationsGenerator:
    def __init__(self, path):
        self.path = path
        self.stations = []

    # Génère les stations de train
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

    # Sauvegarde les stations de train dans un fichier JSON
    def toJSON(self, path):
        with open(path, "w", encoding="utf-8") as f:
            json.dump(self.stations, f, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)
        
