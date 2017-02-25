package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.Building;
import com.alienlab.dynamicboard.entity.Premise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Administrator on 2017/2/22.
 */
@Repository
public interface BuildingRepository extends JpaRepository<Building,Long>{
    public List<Building> findByPremise(Premise premise);
}
