<?php
class Roles
{
    // For data
    public $info_roles_aid;
    public $info_roles_name;
    public $info_roles_description;
    public $info_id;

    public $info_roles_is_active;
    public $info_roles_created_at;
    public $info_roles_updated_at;
    // For Search and Loadmore
    public $info_roles_start;
    public $info_roles_total;
    public $info_roles_search;
    // For table
    public $connection;
    public $lastInsertedId;
    public $tblInfoRoles;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblInfoRoles = "crmv1_info_roles";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblInfoRoles} ";
            $sql .= "( info_roles_name, ";
            $sql .= "info_roles_description, ";
            $sql .= "info_roles_is_active, ";
            $sql .= "info_roles_created_at, ";
            $sql .= "info_roles_updated_at ) values ( ";
            $sql .= ":info_roles_name, ";
            $sql .= ":info_roles_description, ";
            $sql .= ":info_id, ";
            $sql .= ":info_roles_is_active, ";
            $sql .= ":info_roles_created_at, ";
            $sql .= ":info_roles_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_roles_name" => $this->info_roles_name,
                "info_roles_description" => $this->info_roles_description,
                "info_roles_is_active" => $this->info_roles_is_active,
                "info_roles_created_at" => $this->info_roles_created_at,
                "info_roles_updated_at" => $this->info_roles_updated_at,
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
            $sql .= " {$this->tblInfoRoles} ";
            $sql .= "order by info_roles_is_active desc, ";
            $sql .= "info_roles_name asc ";
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
            $sql .= "from {$this->tblInfoRoles} ";
            $sql .= "where ( info_roles_name like :info_roles_name_search ";
            $sql .= "or info_roles_description like :info_roles_description_search ) ";
            $sql .= "order by info_roles_is_active desc, ";
            $sql .= "info_roles_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_roles_name_search" => "%{$this->info_roles_search}%",
                "info_roles_description_search" => "%{$this->info_roles_search}%",
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
            $sql .= " {$this->tblInfoRoles} ";
            $sql .= "order by info_roles_is_active desc, ";
            $sql .= "info_roles_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->info_roles_start - 1,
                "total" => $this->info_roles_total,
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
            $sql = "select * from {$this->tblInfoRoles} ";
            $sql .= "where info_roles_aid = :info_roles_aid ";
            $sql .= "order by info_roles_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_roles_aid" => $this->info_roles_aid,
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
            $sql = "update {$this->tblInfoRoles} set ";
            $sql .= "info_roles_name = :info_roles_name, ";
            $sql .= "info_roles_description = :info_roles_description, ";
            $sql .= "info_roles_updated_at = :info_roles_updated_at ";
            $sql .= "where info_roles_aid = :info_roles_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_roles_name" => $this->info_roles_name,
                "info_roles_description" => $this->info_roles_description,
                "info_roles_updated_at" => $this->info_roles_updated_at,
                "info_roles_aid" => $this->info_roles_aid,
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
            $sql = "update {$this->tblInfoRoles} set ";
            $sql .= "info_roles_is_active = :info_roles_is_active, ";
            $sql .= "info_roles_updated_at = :info_roles_updated_at ";
            $sql .= "where info_roles_aid = :info_roles_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_roles_is_active" => $this->info_roles_is_active,
                "info_roles_updated_at" => $this->info_roles_updated_at,
                "info_roles_aid" => $this->info_roles_aid,
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
            $sql = "delete from {$this->tblInfoRoles} ";
            $sql .= "where info_roles_aid = :info_roles_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_roles_aid" => $this->info_roles_aid,
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
            $sql = "select info_roles_name from {$this->tblInfoRoles} ";
            $sql .= "where info_roles_name = :info_roles_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_roles_name" => "{$this->info_roles_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
