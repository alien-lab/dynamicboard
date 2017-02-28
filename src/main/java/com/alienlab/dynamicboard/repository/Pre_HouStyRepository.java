package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.HouseStyle;
import com.alienlab.dynamicboard.entity.Pre_HouSty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * Created by Administrator on 2017/2/27.
 */
@Repository
public interface Pre_HouStyRepository extends JpaRepository<Pre_HouSty,Long>{
    @Transactional
    public void deleteByHouseStyle(HouseStyle houseStyle);
}
