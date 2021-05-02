<?php

namespace Models;

use Initapp\Database;

class Model extends Database
{
    // Table de la base de données
    protected $table;

    // Instance de Database
    private $database;

    /**
     * Retourne tous les enregistrements
     *
     * @param integer $limit
     * @return result
     */
    public function findAll()
    {
        $query = $this->requete('SELECT * FROM ' . $this->table);
        return $query->fetchAll();
    }
    
    /**
     * Retourne les $limit enregistrements
     *
     * @param integer $limit
     * @return result
     */
    public function findTop(int $limit = 0)
    {
        $sqlLimit = "";
        if($limit > 0){
            $sqlLimit = ' LIMIT '.$limit;
        }
        $query = $this->requete('SELECT * FROM ' . $this->table. $sqlLimit);
        return $query->fetchAll();
    }

    /**
     * création des enregistrements
     *
     * @param integer $limit
     * @return result
     */
    public function create()
    {
        $champs = [];
        $inter = [];
        $valeurs = [];

        // On boucle pour éclater le tableau
        foreach ($this as $champ => $valeur) {
            // INSERT INTO temps (temps, date_partie) VALUES ( ?, ?)
            if ($valeur !== null && $champ != 'db' && $champ != 'table') {
                $champs[] = $champ;
                $inter[] = "?";
                $valeurs[] = $valeur;
            }
        }

        // On transforme le tableau "champs" en une chaine de caractères
        $liste_champs = implode(', ', $champs);
        $liste_inter = implode(', ', $inter);

        // On exécute la requête
        return $this->requete('INSERT INTO ' . $this->table . ' (' . $liste_champs . ')VALUES(' . $liste_inter . ')', $valeurs);
    }


    /**
     * Mise à jour des enregistrements : totalement inutile sur ce projet
     *
     * @return $this;
     */
    public function update()
    {
        $champs = [];
        $valeurs = [];

        // On boucle pour éclater le tableau
        foreach ($this as $champ => $valeur) {
            // UPDATE annonces SET temps = ?, date_partie = ? WHERE id= ?
            if ($valeur !== null && $champ != 'db' && $champ != 'table') {
                $champs[] = "$champ = ?";
                $valeurs[] = $valeur;
            }
        }
        $valeurs[] = $this->id;

        // On transforme le tableau "champs" en une chaine de caractères
        $liste_champs = implode(', ', $champs);

        // On exécute la requête
        return $this->requete('UPDATE ' . $this->table . ' SET ' . $liste_champs . ' WHERE id = ?', $valeurs);
    }
    /**
     * Suppression des enregistrements : totalement inutile sur ce projet
     *
     * @return $this;
     */
    public function delete(int $id)
    {
        return $this->requete("DELETE FROM {$this->table} WHERE id = ?", [$id]);
    }
    /**
     * Préparation de la requête.
     * 
     * retourne le résultat de l'ex&cution
     */

    public function requete(string $sql, array $attributs = null)
    {
        // On récupère l'instance de v
        $this->database = Database::getInstance();

        // On vérifie si on a des attributs
        if ($attributs !== null) {
            // Requête préparée
            $query = $this->database->prepare($sql);
            $query->execute($attributs);
            return $query;
        } else {
            // Requête simple
            return $this->database->query($sql);
        }
    }
}