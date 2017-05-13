package com.alienlab.dynamicboard.repository;

import com.alienlab.dynamicboard.entity.Premise;
import com.alienlab.dynamicboard.entity.Staff;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Administrator on 2017/2/23.
 */
@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    public Staff findStaffByAccount(String account);

    public Page<Staff> findStaffByPremise(Premise premise, Pageable pageable);

    public Page<Staff> findByStaffNameContaining(String likeName, Pageable pageable);
}
