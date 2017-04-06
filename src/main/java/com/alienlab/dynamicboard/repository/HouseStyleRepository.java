package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.HouseStyle;
import com.alienlab.dynamicboard.entity.Premise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Created by Administrator on 2017/2/23.
 */
@Repository
public interface HouseStyleRepository extends JpaRepository<HouseStyle,Long>{
    public List<HouseStyle> findByPremise(Premise premise);
    public HouseStyle findByHsName(String hsName);
    public Page<HouseStyle> findHouseStyleByPremise(Premise premise, Pageable pageable);
}
