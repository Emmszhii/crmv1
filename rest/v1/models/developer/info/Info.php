<?php
class Info
{
    // For data
    public $info_aid;
    public $info_name;
    public $info_description;
    public $info_roles_id;
    public $info_engagement_id;
    public $info_is_active;
    public $info_created_at;
    public $info_updated_at;
    // For Search and Loadmore
    public $info_start;
    public $info_total;
    public $info_search;
    // For table
    public $connection;
    public $lastInsertedId;
    public $tblInfo;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblInfo = "crmv1_info";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblInfo} ";
            $sql .= "( info_name, ";
            $sql .= "info_description, ";
            $sql .= "info_roles_id, ";
            $sql .= "info_engagement_id, ";
            $sql .= "info_is_active, ";
            $sql .= "info_created_at, ";
            $sql .= "info_updated_at ) values ( ";
            $sql .= ":info_name, ";
            $sql .= ":info_description, ";
            $sql .= ":info_roles_id, ";
            $sql .= ":info_engagement_id, ";
            $sql .= ":info_is_active, ";
            $sql .= ":info_created_at, ";
            $sql .= ":info_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_name" => $this->info_name,
                "info_description" => $this->info_description,
                "info_roles_id" => $this->info_roles_id,
                "info_engagement_id" => $this->info_engagement_id,
                "info_is_active" => $this->info_is_active,
                "info_created_at" => $this->info_created_at,
                "info_updated_at" => $this->info_updated_at,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from ";
            $sql .= " {$this->tblInfo} ";
            $sql .= "order by info_is_active desc, ";
            $sql .= "info_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // search 
    public function search()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblInfo} ";
            $sql .= "where ( info_name like :info_name_search ";
            $sql .= "or info_description like :info_description_search ) ";
            $sql .= "order by info_is_active desc, ";
            $sql .= "info_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_name_search" => "%{$this->info_search}%",
                "info_description_search" => "%{$this->info_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // for Load more
    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from ";
            $sql .= " {$this->tblInfo} ";
            $sql .= "order by info_is_active desc, ";
            $sql .= "info_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->info_start - 1,
                "total" => $this->info_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function readById()
    {
        try {
            $sql = "select * from {$this->tblInfo} ";
            $sql .= "where info_aid = :info_aid ";
            $sql .= "order by info_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_aid" => $this->info_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblInfo} set ";
            $sql .= "info_name = :info_name, ";
            $sql .= "info_description = :info_description, ";
            $sql .= "info_roles_id = :info_roles_id, ";
            $sql .= "info_engagement_id = :info_engagement_id, ";
            $sql .= "info_updated_at = :info_updated_at ";
            $sql .= "where info_aid = :info_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_name" => $this->info_name,
                "info_description" => $this->info_description,
                "info_roles_id" => $this->info_roles_id,
                "info_engagement_id" => $this->info_engagement_id,
                "info_updated_at" => $this->info_updated_at,
                "info_aid" => $this->info_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblInfo} set ";
            $sql .= "info_is_active = :info_is_active, ";
            $sql .= "info_updated_at = :info_updated_at ";
            $sql .= "where info_aid = :info_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_is_active" => $this->info_is_active,
                "info_updated_at" => $this->info_updated_at,
                "info_aid" => $this->info_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblInfo} ";
            $sql .= "where info_aid = :info_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_aid" => $this->info_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkName()
    {
        try {
            $sql = "select info_name from {$this->tblInfo} ";
            $sql .= "where info_name = :info_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_name" => "{$this->info_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
