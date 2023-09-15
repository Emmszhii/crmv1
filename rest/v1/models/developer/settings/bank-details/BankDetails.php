<?php
class BankDetails
{
    public $bank_details_aid;
    public $bank_details_bank_name;
    public $bank_details_account_name;
    public $bank_details_account_number;
    public $bank_details_location;
    public $bank_details_is_active;
    public $bank_details_created_at;
    public $bank_details_updated_at;

    public $bank_details_start;
    public $bank_details_total;
    public $bank_details_search;

    public $employee_aid;

    public $connection;
    public $lastInsertedId;
    public $tblBankDetails;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblBankDetails = "crm_training_bank_details";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblBankDetails} ";
            $sql .= "( bank_details_bank_name, ";
            $sql .= "bank_details_account_name, ";
            $sql .= "bank_details_account_number, ";
            $sql .= "bank_details_location, ";
            $sql .= "bank_details_is_active, ";
            $sql .= "bank_details_created_at, ";
            $sql .= "bank_details_updated_at ) values ( ";
            $sql .= ":bank_details_bank_name, ";
            $sql .= ":bank_details_account_name, ";
            $sql .= ":bank_details_account_number, ";
            $sql .= ":bank_details_location, ";
            $sql .= ":bank_details_is_active, ";
            $sql .= ":bank_details_created_at, ";
            $sql .= ":bank_details_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "bank_details_bank_name" => $this->bank_details_bank_name,
                "bank_details_account_name" => $this->bank_details_account_name,
                "bank_details_account_number" => $this->bank_details_account_number,
                "bank_details_location" => $this->bank_details_location,
                "bank_details_is_active" => $this->bank_details_is_active,
                "bank_details_created_at" => $this->bank_details_created_at,
                "bank_details_updated_at" => $this->bank_details_updated_at,
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
            $sql .= "from {$this->tblBankDetails} ";
            $sql .= "where bank_details_bank_name like :bank_details_bank_name_search ";
            $sql .= "order by bank_details_is_active desc, ";
            $sql .= "bank_details_bank_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "bank_details_bank_name_search" => "%{$this->bank_details_search}%",
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
            $sql .= "from {$this->tblBankDetails} ";
            $sql .= "order by bank_details_is_active desc, ";
            $sql .= "bank_details_bank_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->bank_details_start - 1,
                "total" => $this->bank_details_total,
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
            $sql .= "from {$this->tblBankDetails} ";
            $sql .= "order by bank_details_is_active desc, ";
            $sql .= "bank_details_bank_name asc ";
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
            $sql = "select * from {$this->tblBankDetails} ";
            $sql .= "where bank_details_aid = :bank_details_aid ";
            $sql .= "order by bank_details_bank_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "bank_details_aid" => $this->bank_details_aid,
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
            $sql = "update {$this->tblBankDetails} set ";
            $sql .= "bank_details_bank_name = :bank_details_bank_name, ";
            $sql .= "bank_details_account_name = :bank_details_account_name, ";
            $sql .= "bank_details_account_number = :bank_details_account_number, ";
            $sql .= "bank_details_location = :bank_details_location, ";
            $sql .= "bank_details_updated_at = :bank_details_updated_at ";
            $sql .= "where bank_details_aid = :bank_details_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "bank_details_bank_name" => $this->bank_details_bank_name,
                "bank_details_account_name" => $this->bank_details_account_name,
                "bank_details_account_number" => $this->bank_details_account_number,
                "bank_details_location" => $this->bank_details_location,
                "bank_details_updated_at" => $this->bank_details_updated_at,
                "bank_details_aid" => $this->bank_details_aid,
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
            $sql = "update {$this->tblBankDetails} set ";
            $sql .= "bank_details_is_active = :bank_details_is_active, ";
            $sql .= "bank_details_updated_at = :bank_details_updated_at ";
            $sql .= "where bank_details_aid = :bank_details_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "bank_details_is_active" => $this->bank_details_is_active,
                "bank_details_updated_at" => $this->bank_details_updated_at,
                "bank_details_aid" => $this->bank_details_aid,
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
            $sql = "delete from {$this->tblBankDetails} ";
            $sql .= "where bank_details_aid = :bank_details_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "bank_details_aid" => $this->bank_details_aid,
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
            $sql = "select bank_details_bank_name from {$this->tblBankDetails} ";
            $sql .= "where bank_details_bank_name = :bank_details_bank_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "bank_details_bank_name" => "{$this->bank_details_bank_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
