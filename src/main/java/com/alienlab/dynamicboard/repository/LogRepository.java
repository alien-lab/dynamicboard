package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/2/23.
 */
@Repository
public interface LogRepository extends JpaRepository<Log,Long>{
}
