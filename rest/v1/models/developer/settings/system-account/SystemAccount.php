<?php
class SystemAccount
{
    public $system_account_aid;
    public $system_account_name;
    public $system_account_email;
    public $system_account_role;
    public $system_account_is_active;
    public $system_account_created_at;
    public $system_account_updated_at;

    public $system_account_start;
    public $system_account_total;
    public $system_account_search;

    public $connection;
    public $lastInsertedId;
    public $tblSystemAccount;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSystemAccount = "crm_training_system_account";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSystemAccount} ";
            $sql .= "( system_account_name, ";
            $sql .= "system_account_email, ";
            $sql .= "system_account_role, ";
            $sql .= "system_account_is_active, ";
            $sql .= "system_account_created_at, ";
            $sql .= "system_account_updated_at ) values ( ";
            $sql .= ":system_account_name, ";
            $sql .= ":system_account_email, ";
            $sql .= ":system_account_role, ";
            $sql .= ":system_account_is_active, ";
            $sql .= ":system_account_created_at, ";
            $sql .= ":system_account_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_account_name" => $this->system_account_name,
                "system_account_email" => $this->system_account_email,
                "system_account_role" => $this->system_account_role,
                "system_account_is_active" => $this->system_account_is_active,
                "system_account_created_at" => $this->system_account_created_at,
                "system_account_updated_at" => $this->system_account_updated_at,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
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
            $sql .= "from {$this->tblSystemAccount} ";
            $sql .= "where system_account_name like :system_account_name_search ";
            $sql .= "order by system_account_is_active desc, ";
            $sql .= "system_account_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_account_name_search" => "%{$this->system_account_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read limit
    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblSystemAccount} ";
            $sql .= "order by system_account_is_active desc, ";
            $sql .= "system_account_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->system_account_start - 1,
                "total" => $this->system_account_total,
            ]);
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
            $sql .= "from {$this->tblSystemAccount} ";
            $sql .= "order by system_account_is_active desc, ";
            $sql .= "system_account_name asc ";
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
            $sql = "select * from {$this->tblSystemAccount} ";
            $sql .= "where system_account_aid = :system_account_aid ";
            $sql .= "order by system_account_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_account_aid" => $this->system_account_aid,
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
            $sql = "update {$this->tblSystemAccount} set ";
            $sql .= "system_account_name = :system_account_name, ";
            $sql .= "system_account_email = :system_account_email, ";
            $sql .= "system_account_role = :system_account_role, ";
            $sql .= "system_account_updated_at = :system_account_updated_at ";
            $sql .= "where system_account_aid = :system_account_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_account_name" => $this->system_account_name,
                "system_account_email" => $this->system_account_email,
                "system_account_role" => $this->system_account_role,
                "system_account_updated_at" => $this->system_account_updated_at,
                "system_account_aid" => $this->system_account_aid,
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
            $sql = "update {$this->tblSystemAccount} set ";
            $sql .= "system_account_is_active = :system_account_is_active, ";
            $sql .= "system_account_updated_at = :system_account_updated_at ";
            $sql .= "where system_account_aid = :system_account_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_account_is_active" => $this->system_account_is_active,
                "system_account_updated_at" => $this->system_account_updated_at,
                "system_account_aid" => $this->system_account_aid,
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
            $sql = "delete from {$this->tblSystemAccount} ";
            $sql .= "where system_account_aid = :system_account_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_account_aid" => $this->system_account_aid,
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
            $sql = "select system_account_name from {$this->tblSystemAccount} ";
            $sql .= "where system_account_name = :system_account_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_account_name" => "{$this->system_account_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // check Email

    public function checkEmail()
    {
        try {
            $sql = "select system_account_email from {$this->tblSystemAccount} ";
            $sql .= "where system_account_email = :system_account_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_account_email" => "{$this->system_account_email}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
