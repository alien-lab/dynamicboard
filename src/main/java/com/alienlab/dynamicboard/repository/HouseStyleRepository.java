package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.HouseStyle;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/2/23.
 */
@Repository
public interface HouseStyleRepository extends JpaRepository<HouseStyle,Long>{
}
