package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.entity.HouseSaleCtrl;
import com.alienlab.dynamicboard.entity.Premise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Administrator on 2017/2/23.
 */
@Repository
public interface HouseSaleCtrlRepository extends JpaRepository<HouseSaleCtrl, Long> {
    public List<HouseSaleCtrl> findByHouse(House house);

    public List<HouseSaleCtrl> findByHouseOrderByIdDesc(House house);
}
