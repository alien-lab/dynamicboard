package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.Building;
import com.alienlab.dynamicboard.entity.Premise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Administrator on 2017/2/22.
 */
@Repository
public interface BuildingRepository extends PagingAndSortingRepository<Building, Long>, JpaRepository<Building, Long> {
    public List<Building> findByPremise(Premise premise);

    public Building findByBuildingName(String buildingName);

    public Page<Building> findBuildingByPremise(Premise premise, Pageable Pageable);
}
