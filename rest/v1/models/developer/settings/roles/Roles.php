<?php
class Roles
{
    public $roles_aid;
    public $roles_name;
    public $roles_description;
    public $roles_is_active;
    public $roles_created_at;
    public $roles_updated_at;

    public $connection;
    public $lastInsertedId;
    public $tblRoles;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblRoles = "crm_training_roles";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblRoles} ";
            $sql .= "( roles_name, ";
            $sql .= "roles_description, ";
            $sql .= "roles_is_active, ";
            $sql .= "roles_created_at, ";
            $sql .= "roles_updated_at ) values ( ";
            $sql .= ":roles_name, ";
            $sql .= ":roles_description, ";
            $sql .= ":roles_is_active, ";
            $sql .= ":roles_created_at, ";
            $sql .= ":roles_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "roles_name" => $this->roles_name,
                "roles_description" => $this->roles_description,
                "roles_is_active" => $this->roles_is_active,
                "roles_created_at" => $this->roles_created_at,
                "roles_updated_at" => $this->roles_updated_at,
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
            $sql .= " {$this->tblRoles} ";
            $sql .= "order by roles_is_active desc, ";
            $sql .= "roles_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read by id
    public function readById()
    {
        try {
            $sql = "select * from {$this->tblRoles} ";
            $sql .= "where roles_aid = :roles_aid ";
            $sql .= "order by roles_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "roles_aid" => $this->roles_aid,
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
            $sql = "update {$this->tblRoles} set ";
            $sql .= "roles_name = :roles_name, ";
            $sql .= "roles_updated_at = :roles_updated_at ";
            $sql .= "where roles_aid = :roles_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "roles_name" => $this->roles_name,
                "roles_updated_at" => $this->roles_updated_at,
                "roles_aid" => $this->roles_aid,
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
            $sql = "update {$this->tblRoles} set ";
            $sql .= "roles_is_active = :roles_is_active, ";
            $sql .= "roles_updated_at = :roles_updated_at ";
            $sql .= "where roles_aid = :roles_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "roles_is_active" => $this->roles_is_active,
                "roles_updated_at" => $this->roles_updated_at,
                "roles_aid" => $this->roles_aid,
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
            $sql = "delete from {$this->tblRoles} ";
            $sql .= "where roles_aid = :roles_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "roles_aid" => $this->roles_aid,
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
            $sql = "select roles_name from {$this->tblRoles} ";
            $sql .= "where roles_name = :roles_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "roles_name" => "{$this->roles_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
