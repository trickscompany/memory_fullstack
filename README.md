# Test Ecole O'Clock - Memory

Vous connaissez tous le jeu du memory.
Il s'agit de retrouver toutes les paires de cartes, en enretournant 2 à chaques fois, et tenter de reconstiuer les paires.
Une démo est diponilbe : [https://wisuel.com/index.html](https://wisuel.com/index.html)

Il y avait plein d'options possibles, et faire des choix il a fallu.
<br>

#### Environnement de développement : Docker.

Mise en place d'une pile :

* Apache - Nginx : servir le jeu partie Front( HTML/JS/CSS) et Back (PHP)
* PHP : langage utilisé pour le backoffice
* Mysql : Base de donnée pour la persistence des résultats
* NodeJs : compilation Sass en CSS via Gulp en gestionnaire de taches qui permet d'automatiser des process

<br>
Pré-requis : avoir une machine sur laquelle docker est installé, avec docker-compose, le port 80 doit être libre. Sinon, il faut changer le port dans docker-compose.yml partie web/nginx:

> web:
>
> ........
>
> port: 80:80
>
> .......

Mise en place :

> docker-compose build

> docker-compose up -d

Une base de donnée sera crée. On peut vérifier avec phpmyadmin sur localhost:5626
L'identifiant et le mot de passe sont disponible dans le fichier .env
Une base par défaut sera créée aussi lors du build du container.
Ma curiosité pour une fonction que je ne connaissais pas m'a poussé à utliser la possiblité de créer une seconde base, et d'injecter directement le structure via le docker-compose.

Le jeu sera disponible sur localhost/index.html

Compilation des SASS :

depuis le répertoire app/, on peut lancer la commande

`docker-compose exec nodejs npm run dev`

qui compilera les CSS

Dans certains cas, il faudra, la première fois, installer les dépendances:

`docker-compose exec nodejs npm install`

Nota: il était prévu de mettre en place un watcher, mais ce dernier s'est obstiné à ne pas vouloir fonctionner.

Ca doit me crever les yeux, mais le temps passant vite, il a fallu se résigner ....

Pour mettre en place sur un serveur distant, sans docker, sur une pile LAMP :

Il suffit de copier le **contenu** du répertoire app/ **sauf le dossier web/** dans un dossier accessible au dessus du dossier public (ou web) de votre espace.

Par exemple, sur un de mes serveurs :
<br>

> -/
>
> --log/
>
> --private/ => copie des dossier ici (**sauf web/**)
>
> --tmp/
>
> --web/ => copie du **contenu** du dossier web/
>

Il suffit que private soit accessible dans votre path.

Il faut modifier index.php dans le dossier web pour qu'il prenne en compte le dossier private/

> define('ROOT', dirname(\_\_DIR\_\_).'/private');

Et modifier Initapp/Database.php pour y mettre les données de connection correctes

> private const DBHOST = 'localhost';
>
> private const DBUSER = 'xxxxx';
>
> private const DBPASS = 'xxxx';
>
> private const DBNAME = 'xxxx';

La base et les tables peuvent être créées avec le script /etc/initdb/init.sql 
Adaptez le user avec vos credentials.

Perspectives d'évolutions et améliorations :

* régler le pb de watcher (arghhhhhh),
* améliorer la gestion des variables d'environnements, notamment pour la mise en prod,
* ajouter la possiblité de saisir son prénom lors de l'enregistrement du score,
* optimiser le code du backoffice,
* se passer de jQuery,
* créer un mode multi-joueurs,
* ajouter des notions d'authentification, via oAuth par exemple,
* ...

Dans le cadre d'un projet servant de support de cours, on peut parfaitement imaginer reprendre chaque partie de cette réalisation et approfondir toutes les notions en partant du synopsis fourni pour ce test.
Chaque technologie utilise amène son lot de complexité croissante mais également de possibilité d'apprentissages de connaissances transverses menant à l'autonomie progressive de l'apprenant.

Ce test a été une belle occasion de me rendre compte du plaisr pris à rechercher les informations nécessaires à mener à bien le projet.
En espérant pouvoir transmettre ce plaisir aux futures candidates développeuses et aux futurs candidats développeurs.
