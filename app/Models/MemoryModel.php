<?php
namespace Models;

class MemoryModel extends Model
{   
    protected $id;
    protected $temps;
    protected $date_partie;
    protected $limit;

    public function __construct()
    {
        $this->table = 'temps';
    }

    /**
     * surcharge méthode findTop
     *
     * @param integer $limit
     * @return result
     */
    public function findTop(int $limit = 1)
    {
        $query = $this->requete('SELECT * FROM ' . $this->table . ' ORDER BY temps ASC LIMIT '.$limit);
        return $query->fetchAll();
    }
    /**
     *  méthode findLast
     *
     * @param integer $limit
     * @return result
     */
    
    public function findLast(int $limit = 1)
    {
        $query = $this->requete('SELECT * FROM ' . $this->table . ' ORDER BY temps DESC LIMIT '.$limit);
        return $query->fetchAll();
    }

    /**
     * Getter pour récupérer la valeur du champ id (inutile ici...)
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Getter pour la valeur Temps (inutile ici...)
     */ 
    public function getTemps()
    {
        return $this->temps;
    }

    /**
     * Setter pour la valeur  Temps
     *
     * @return  self
     */ 
    public function setTemps($temps)
    {
        $this->temps = $temps;
        return $this;
    }

    /**
     * Getter pour la valeur Date (inutile ici...)
     */ 
    public function getDate()
    {
        return $this->date_partie;
    }

    /**
     * Getter pour la valeur Date
     *
     * @return  self
     */ 
    public function setDate($date)
    {
        $this->date_partie = $date;
        return $this;
    }
}