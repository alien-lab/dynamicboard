package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.Building;
import com.alienlab.dynamicboard.entity.Premise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/2/23.
 */
@Repository
public interface PremiseRepository extends JpaRepository<Premise,Long>{
    public Premise findByPremiseName(String premiseName);
}
