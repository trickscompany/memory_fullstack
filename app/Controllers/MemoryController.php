<?php
namespace Controllers;

use Models\MemoryModel;

class MemoryController extends Controller
{
    /**
     * Cette méthode va renvoyer une sélection des 5 plus mauvais temps de la base de données
     * @return void
     */
    public function index()
    {
        // On instancie le modèle correspondant à la table 'temps'
        $memoryModel = new MemoryModel;
        
        // On va chercher les 5 derniers temps juste pour s'amuser
        $_memory = $memoryModel->findLast(5);
        $memory = $this->convertirDateResultat($_memory);
        // On génère la vue
        $this->render('memory/index', compact('memory'));
    }
    
    /**
     * Affiche $nombre temps
     * @param int $nombre de temps
     * @return void
     */
    public function lire(int $nombre = 5)
    {
        // On instancie le modèle
        $memoryModel = new MemoryModel;
        
        // On va chercher les $nombre premiers
        $_memory = $memoryModel->findTop($nombre);
        
        $memory = $this->convertirDateResultat($_memory);
        
        // On envoie à la vue
        $this->render('memory/lire', compact('memory'));
    }
    
    /**
     * converti la date dans un format acceptable
     * @param array $result
     * @return $memory
     */
    public function convertirDateResultat($result)
    {
        $memory = array_map(function($number) {
            $_date = new \DateTime($number->date_partie);
            $number->date_partie = $_date->format('d/m/Y H:i:s');
            return $number;
        }, $result);
        return $memory;
    }

    /**
     * Ajouter un temps
     * @return void
     */
    public function ajouter()
    {
               if(isset($_POST['temps']))
               {  
                    $temps = filter_var(strip_tags($_POST['temps']), FILTER_SANITIZE_NUMBER_INT);
                    $_date = new \DateTime('NOW');
                    $date = $_date->format('Y-m-d H:i:s');
                    // a transformer
                    // On instancie notre modèle
                    $memory = new MemoryModel;
                    
                    // On prépare
                    $memory->setTemps($temps)
                    ->setDate($date);
                    
                    // On enregistre
                    $memory->create();
                    
                    //prévoir un retour ?
                    $this->render('memory/ajouter', compact('memory'));
               } 
               //sinon, on ignore. Ca passe pour un POC, non ?
    }
}