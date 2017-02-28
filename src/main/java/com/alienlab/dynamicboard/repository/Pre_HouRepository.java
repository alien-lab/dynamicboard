package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.entity.Pre_Hou;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * Created by Administrator on 2017/2/27.
 */
@Repository
public interface Pre_HouRepository extends JpaRepository<Pre_Hou,Long>{
    @Transactional
    public void deleteByHouse(House house);
}
