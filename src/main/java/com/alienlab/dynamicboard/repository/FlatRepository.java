package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.Flat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/2/19.
 */
@Repository
public interface FlatRepository extends JpaRepository<Flat,Long>{
}
