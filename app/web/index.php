<?php

use Initapp\Application;

// On définit une constante contenant le dossier racine du projet*/
/* Distant */
/*define('ROOT', dirname(__DIR__).'/private');*/
define('ROOT', dirname(__DIR__));
// On importe l'autoloader
require_once ROOT.'/Autoloading.php';
Autoloading::register();

// On instancie Application (notre routeur)
$app = new Application();

// On démarre l'application
$app->start();