package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.Building;
import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.entity.HouseStyle;
import com.alienlab.dynamicboard.entity.Premise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Administrator on 2017/2/22.
 */
@Repository
public interface HouseRepository extends JpaRepository<House,Long>{
    public List<House> findByPremise(Premise premise);
    public List<House> findByBuilding(Building building);
    public List<House> findByHouseStyle(HouseStyle houseStyle);
}
