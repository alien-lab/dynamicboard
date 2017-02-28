package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.Building;
import com.alienlab.dynamicboard.entity.Pre_Bui;
import com.alienlab.dynamicboard.entity.Premise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * Created by Administrator on 2017/2/27.
 */
@Repository
public interface Pre_BuiRepository extends JpaRepository<Pre_Bui,Long>{
    @Transactional
    public void deleteByBuilding(Building building);
}
