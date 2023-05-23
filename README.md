# projet_reservation_trains

Pour installer : 

<code>git@github.com:Leon-ED/projet_reservation_trains.git</code>

Se mettre dans le dossier créé avec :
<code> cd projet_reservation_trains/</code>

### Installer les dépendances node avec
<code>npm install</code>

### Installer MongoDB sur php :

Copier le fichier php_mongodb.dll dans le dossier et le coller dans le dossier /ext où est intallé php

Attention : La version de php et de celle du .dll de mongo db doit etre compatible



### Installer les dépendances php avec
<code>cd server/</code>

<code>composer install</code>


### Renommer les tous le fichier .env en .env.local et y mettre vos variables d'environnement



### Lancer le projet avec 

<code>npm run dev</code> depuis le fichier racine

Ne pas oublier de lancer le serveur php (API) avec <code>php -S localhost:80</code> depuis le dossier server/