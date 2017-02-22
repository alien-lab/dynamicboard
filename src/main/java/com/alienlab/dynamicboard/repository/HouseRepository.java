package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/2/22.
 */
@Repository
public interface HouseRepository extends JpaRepository<House,Long>{
}
