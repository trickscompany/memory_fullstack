<?php
class Autoloading
{
    static function register()
    {
        spl_autoload_register([
            __CLASS__,
            'autoload'
        ]);
    }

    static function autoload($class)
    {
        // On récupère dans $class la totalité du namespace de la classe concernée (xxxxx\Xxxxdata\Xxxxxxlire)
        //à revoir serveur de prod récalcitrant
        //$class = str_replace('Memory\\', '\\', $class);
        // On remplace les \ par des /
        $class = str_replace('\\', '/', $class);
        $fichier = __DIR__ . '/' . $class . '.php';
        // On vérifie si le fichier existe
        if(file_exists($fichier)){
            require_once $fichier;
        }
    }
}