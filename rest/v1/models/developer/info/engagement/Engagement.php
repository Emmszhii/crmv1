<?php
class Engagement
{
    // For data
    public $info_engagement_aid;
    public $info_engagement_name;
    public $info_engagement_description;
    public $info_id;

    public $info_engagement_is_active;
    public $info_engagement_created_at;
    public $info_engagement_updated_at;
    // For Search and Loadmore
    public $info_engagement_start;
    public $info_engagement_total;
    public $info_engagement_search;
    // For table
    public $connection;
    public $lastInsertedId;
    public $tblInfo;
    public $tblInfoEngagement;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblInfo = "crmv1_info";
        $this->tblInfoEngagement = "crmv1_info_engagement";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblInfoEngagement} ";
            $sql .= "( info_engagement_name, ";
            $sql .= "info_engagement_description, ";
            $sql .= "info_id, ";
            $sql .= "info_engagement_is_active, ";
            $sql .= "info_engagement_created_at, ";
            $sql .= "info_engagement_updated_at ) values ( ";
            $sql .= ":info_engagement_name, ";
            $sql .= ":info_engagement_description, ";
            $sql .= ":info_id, ";
            $sql .= ":info_engagement_is_active, ";
            $sql .= ":info_engagement_created_at, ";
            $sql .= ":info_engagement_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_engagement_name" => $this->info_engagement_name,
                "info_engagement_description" => $this->info_engagement_description,
                "info_id" => $this->info_id,
                "info_engagement_is_active" => $this->info_engagement_is_active,
                "info_engagement_created_at" => $this->info_engagement_created_at,
                "info_engagement_updated_at" => $this->info_engagement_updated_at,
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
            $sql .= " {$this->tblInfoEngagement} as engagement, ";
            $sql .= " {$this->tblInfo} as info ";
            $sql .= "where engagement.info_id = info.info_aid ";
            $sql .= "order by info_engagement_is_active desc, ";
            $sql .= "info_engagement_name asc ";
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
            $sql .= " {$this->tblInfoEngagement} as engagement, ";
            $sql .= " {$this->tblInfo} as info ";
            $sql .= "where ( info_engagement_name like :info_engagement_name_search ";
            $sql .= "or info_engagement_description like :info_engagement_description_search "; 
            $sql .= "and  engagement.info_id = info.info_aid ) ";
            $sql .= "order by info_engagement_is_active desc, ";
            $sql .= "info_engagement_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_engagement_name_search" => "%{$this->info_engagement_search}%",
                "info_engagement_description_search" => "%{$this->info_engagement_search}%",
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
            $sql .= " {$this->tblInfoEngagement} as engagement, ";
            $sql .= " {$this->tblInfo} as info ";
            $sql .= "order by info_engagement_is_active desc, ";
            $sql .= "info_engagement_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->info_engagement_start - 1,
                "total" => $this->info_engagement_total,
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
            $sql = "select * from {$this->tblInfoEngagement} ";
            $sql .= "where info_engagement_aid = :info_engagement_aid ";
            $sql .= "order by info_engagement_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_engagement_aid" => $this->info_engagement_aid,
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
            $sql = "update {$this->tblInfoEngagement} set ";
            $sql .= "info_engagement_name = :info_engagement_name, ";
            $sql .= "info_engagement_description = :info_engagement_description, ";
            $sql .= "info_engagement_updated_at = :info_engagement_updated_at ";
            $sql .= "where info_engagement_aid = :info_engagement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_engagement_name" => $this->info_engagement_name,
                "info_engagement_description" => $this->info_engagement_description,
                "info_engagement_updated_at" => $this->info_engagement_updated_at,
                "info_engagement_aid" => $this->info_engagement_aid,
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
            $sql = "update {$this->tblInfoEngagement} set ";
            $sql .= "info_engagement_is_active = :info_engagement_is_active, ";
            $sql .= "info_engagement_updated_at = :info_engagement_updated_at ";
            $sql .= "where info_engagement_aid = :info_engagement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_engagement_is_active" => $this->info_engagement_is_active,
                "info_engagement_updated_at" => $this->info_engagement_updated_at,
                "info_engagement_aid" => $this->info_engagement_aid,
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
            $sql = "delete from {$this->tblInfoEngagement} ";
            $sql .= "where info_engagement_aid = :info_engagement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_engagement_aid" => $this->info_engagement_aid,
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
            $sql = "select info_engagement_name from {$this->tblInfoEngagement} ";
            $sql .= "where info_engagement_name = :info_engagement_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "info_engagement_name" => "{$this->info_engagement_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
