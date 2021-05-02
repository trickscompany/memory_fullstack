<?php
namespace Controllers;

abstract class Controller
{
    public function render(string $fichier, array $donnees = [], string $template = 'default')
    {
        // On extrait le contenu de $donnees
        //json encode ici ? à revoir ou évoluer
        extract($donnees);

        // On démarre le buffer de sortie
        // A partir de ce point toute sortie est conservée en mémoire
        //si on a besoin de temporiser des données, par exemple insérer un sous template (du html quoi), la combinaison ob_start/ob_get_clean va faire le job
        if($template != 'default')
        {
            ob_start();
        }

        // On crée le chemin vers la vue
        require_once ROOT.'/Views/'.$fichier.'.php';
        //si on retourn du json, par exemple, on va s'arrêter là.
        
        if($template != 'default')
        {
            // Transfère le buffer dans $contenu
            $contenu = ob_get_clean();
    
            // Template de page
            require_once ROOT.'/Views/'.$template.'.php';
        }
    }
}