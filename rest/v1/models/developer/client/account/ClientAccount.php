<?php
class ClientAccount
{
    // For data
    public $client_account_aid;
    public $client_account_contact_name;
    public $client_account_contact_email;
    public $client_account_number;
    public $client_account_company_name;
    public $client_account_role;
    public $client_account_is_active;
    public $client_account_created_at;
    public $client_account_update_at;
    // For Search and Loadmore
    public $client_account_start;
    public $client_account_total;
    public $client_account_search;
    // For table
    public $connection;
    public $lastInsertedId;
    public $tblClientAccount;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblClientAccount = "crm_training_client_account";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblClientAccount} ";
            $sql .= "( client_account_contact_name, ";
            $sql .= "client_account_contact_email, ";
            $sql .= "client_account_number, ";
            $sql .= "client_account_company_name, ";
            $sql .= "client_account_role, ";
            $sql .= "client_account_is_active, ";
            $sql .= "client_account_created_at, ";
            $sql .= "client_account_update_at ) values ( ";
            $sql .= ":client_account_contact_name, ";
            $sql .= ":client_account_contact_email, ";
            $sql .= ":client_account_number, ";
            $sql .= ":client_account_company_name, ";
            $sql .= ":client_account_role, ";
            $sql .= ":client_account_is_active, ";
            $sql .= ":client_account_created_at, ";
            $sql .= ":client_account_update_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_account_contact_name" => $this->client_account_contact_name,
                "client_account_contact_email" => $this->client_account_contact_email,
                "client_account_number" => $this->client_account_number,
                "client_account_company_name" => $this->client_account_company_name,
                "client_account_role" => $this->client_account_role,
                "client_account_is_active" => $this->client_account_is_active,
                "client_account_created_at" => $this->client_account_created_at,
                "client_account_update_at" => $this->client_account_update_at,
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
            $sql .= " {$this->tblClientAccount} ";
            $sql .= "order by client_account_is_active desc, ";
            $sql .= "client_account_contact_name asc ";
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
            $sql .= "from {$this->tblClientAccount} ";
            $sql .= "where ( client_account_contact_name like :client_account_contact_name_search ";
            $sql .= "or client_account_contact_email like :client_account_contact_email_search ) ";
            $sql .= "order by client_account_is_active desc, ";
            $sql .= "client_account_contact_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_account_contact_name_search" => "%{$this->client_account_search}%",
                "client_account_contact_email_search" => "%{$this->client_account_search}%",
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
            $sql .= " {$this->tblClientAccount} ";
            $sql .= "order by client_account_is_active desc, ";
            $sql .= "client_account_contact_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->client_account_start - 1,
                "total" => $this->client_account_total,
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
            $sql = "select * from {$this->tblClientAccount} ";
            $sql .= "where client_account_aid = :client_account_aid ";
            $sql .= "order by client_account_contact_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_account_aid" => $this->client_account_aid,
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
            $sql = "update {$this->tblClientAccount} set ";
            $sql .= "client_account_contact_name = :client_account_contact_name, ";
            $sql .= "client_account_contact_email = :client_account_contact_email, ";
            $sql .= "client_account_number = :client_account_number, ";
            $sql .= "client_account_company_name = :client_account_company_name, ";
            $sql .= "client_account_role = :client_account_role, ";
            $sql .= "client_account_update_at = :client_account_update_at ";
            $sql .= "where client_account_aid = :client_account_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_account_contact_name" => $this->client_account_contact_name,
                "client_account_contact_email" => $this->client_account_contact_email,
                "client_account_number" => $this->client_account_number,
                "client_account_company_name" => $this->client_account_company_name,
                "client_account_role" => $this->client_account_role,
                "client_account_update_at" => $this->client_account_update_at,
                "client_account_aid" => $this->client_account_aid,
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
            $sql = "update {$this->tblClientAccount} set ";
            $sql .= "client_account_is_active = :client_account_is_active, ";
            $sql .= "client_account_update_at = :client_account_update_at ";
            $sql .= "where client_account_aid = :client_account_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_account_is_active" => $this->client_account_is_active,
                "client_account_update_at" => $this->client_account_update_at,
                "client_account_aid" => $this->client_account_aid,
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
            $sql = "delete from {$this->tblClientAccount} ";
            $sql .= "where client_account_aid = :client_account_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_account_aid" => $this->client_account_aid,
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
            $sql = "select client_account_contact_name from {$this->tblClientAccount} ";
            $sql .= "where client_account_contact_name = :client_account_contact_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_account_contact_name" => "{$this->client_account_contact_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
