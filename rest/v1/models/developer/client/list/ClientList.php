<?php
class ClientList
{
    // For data
    public $client_list_aid;
    public $client_list_account_number;
    public $client_list_company_name;
    public $client_list_company_email;
    public $client_list_contact_email;
    public $client_list_company_mobile;
    public $client_list_is_active;
    public $client_list_created_at;
    public $client_list_updated_at;
    // For Search and Loadmore
    public $client_list_start;
    public $client_list_total;
    public $client_list_search;
    // For table
    public $connection;
    public $lastInsertedId;
    public $tblClientList;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblClientList = "crm_training_client_list";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblClientList} ";
            $sql .= "( client_list_account_number, ";
            $sql .= "client_list_company_name, ";
            $sql .= "client_list_company_email, ";
            $sql .= "client_list_contact_email, ";
            $sql .= "client_list_company_mobile, ";
            $sql .= "client_list_is_active, ";
            $sql .= "client_list_created_at, ";
            $sql .= "client_list_updated_at ) values ( ";
            $sql .= ":client_list_account_number, ";
            $sql .= ":client_list_company_name, ";
            $sql .= ":client_list_company_email, ";
            $sql .= ":client_list_contact_email, ";
            $sql .= ":client_list_company_mobile, ";
            $sql .= ":client_list_is_active, ";
            $sql .= ":client_list_created_at, ";
            $sql .= ":client_list_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_list_account_number" => $this->client_list_account_number,
                "client_list_company_name" => $this->client_list_company_name,
                "client_list_company_email" => $this->client_list_company_email,
                "client_list_contact_email" => $this->client_list_contact_email,
                "client_list_company_mobile" => $this->client_list_company_mobile,
                "client_list_is_active" => $this->client_list_is_active,
                "client_list_created_at" => $this->client_list_created_at,
                "client_list_updated_at" => $this->client_list_updated_at,
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
            $sql .= " {$this->tblClientList} ";
            $sql .= "order by client_list_is_active desc, ";
            $sql .= "client_list_account_number asc ";
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
            $sql .= "from {$this->tblClientList} ";
            $sql .= "where ( client_list_account_number like :client_list_account_number_search ";
            $sql .= "or client_list_company_name like :client_list_company_name_search ) ";
            $sql .= "order by client_list_is_active desc, ";
            $sql .= "client_list_account_number asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_list_account_number_search" => "%{$this->client_list_search}%",
                "client_list_company_name_search" => "%{$this->client_list_search}%",
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
            $sql .= " {$this->tblClientList} ";
            $sql .= "order by client_list_is_active desc, ";
            $sql .= "client_list_account_number asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->client_list_start - 1,
                "total" => $this->client_list_total,
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
            $sql = "select * from {$this->tblClientList} ";
            $sql .= "where client_list_aid = :client_list_aid ";
            $sql .= "order by client_list_account_number asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_list_aid" => $this->client_list_aid,
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
            $sql = "update {$this->tblClientList} set ";
            $sql .= "client_list_account_number = :client_list_account_number, ";
            $sql .= "client_list_company_name = :client_list_company_name, ";
            $sql .= "client_list_company_email = :client_list_company_email, ";
            $sql .= "client_list_contact_email = :client_list_contact_email, ";
            $sql .= "client_list_company_mobile = :client_list_company_mobile, ";
            $sql .= "client_list_updated_at = :client_list_updated_at ";
            $sql .= "where client_list_aid = :client_list_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_list_account_number" => $this->client_list_account_number,
                "client_list_company_name" => $this->client_list_company_name,
                "client_list_company_email" => $this->client_list_company_email,
                "client_list_contact_email" => $this->client_list_contact_email,
                "client_list_company_mobile" => $this->client_list_company_mobile,
                "client_list_updated_at" => $this->client_list_updated_at,
                "client_list_aid" => $this->client_list_aid,
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
            $sql = "update {$this->tblClientList} set ";
            $sql .= "client_list_is_active = :client_list_is_active, ";
            $sql .= "client_list_updated_at = :client_list_updated_at ";
            $sql .= "where client_list_aid = :client_list_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_list_is_active" => $this->client_list_is_active,
                "client_list_updated_at" => $this->client_list_updated_at,
                "client_list_aid" => $this->client_list_aid,
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
            $sql = "delete from {$this->tblClientList} ";
            $sql .= "where client_list_aid = :client_list_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_list_aid" => $this->client_list_aid,
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
            $sql = "select client_list_account_number from {$this->tblClientList} ";
            $sql .= "where client_list_account_number = :client_list_account_number ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_list_account_number" => "{$this->client_list_account_number}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
