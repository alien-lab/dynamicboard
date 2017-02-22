package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.HouseCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/2/22.
 */
@Repository
public interface HouseCustomerRepository extends JpaRepository<HouseCustomer,Long>{
}
