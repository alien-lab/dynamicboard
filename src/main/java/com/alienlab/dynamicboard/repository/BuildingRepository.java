package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/2/22.
 */
@Repository
public interface BuildingRepository extends JpaRepository<Building,Long>{
}
