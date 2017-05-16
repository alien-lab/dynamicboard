package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.Premise;
import com.alienlab.dynamicboard.entity.Staff;
import com.alienlab.dynamicboard.repository.PremiseRepository;
import com.alienlab.dynamicboard.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 鸠小浅 on 2017/5/10.
 */
@Service
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private PremiseRepository premiseRepository;

    //销控员以上级别PC登录
    public Staff login(Staff staff) {
        try {
            Staff realStaff = staffRepository.findStaffByAccount(staff.getAccount());
            if (realStaff != null && realStaff.getStaffStatus().equals("1")) {
                if (realStaff.getPassword().equals(staff.getPassword())) {
                    System.out.println("密码正确");
                    return realStaff;
                } else {
                    System.out.println("密码不正确");
                    return staff;
                }
            } else {
                System.out.println("帐号不存在或者已被停用");
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //销控员注册
    public Staff register(Staff staff) {
        try {
            Staff realStaff = staffRepository.findStaffByAccount(staff.getAccount());
            if (realStaff == null) {
                System.out.println("注册成功");
                return staffRepository.save(staff);
            } else {
                System.out.println("账号已被注册");
                return realStaff;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //staff个人信息修改
    public Staff updateStaffInfo(Staff staff) {
        try {
            return staffRepository.save(staff);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //根据id查staff
    public Staff findStaffById(Long id) {
        try {
            return staffRepository.getOne(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //分页查staff
    public Page<Staff> findStaffPage(Integer index, Integer size) {
        try {
            return staffRepository.findAll(new PageRequest(index, size));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //根据premise分页查staff
    public Page<Staff> findStaffByPremisePage(String premiseName, Integer index, Integer size) {
        try {
            Premise premise = premiseRepository.findByPremiseName(premiseName);
            return staffRepository.findStaffByPremise(premise, new PageRequest(index, size));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //根据staffName分页模糊查
    public Page<Staff> findByLikeNamePage(String likeName, Integer index, Integer size) {
        try {
            return staffRepository.findByStaffNameContaining("%" + likeName + "%", new PageRequest(index, size));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //根据staffName和premise分页模糊查
    public Page<Staff> findByLikeNameAndPremisePage(String likeName, String premiseName, Integer index, Integer size) {
        try {
            Premise premise = premiseRepository.findByPremiseName(premiseName);
            return staffRepository.findByStaffNameContainingAndPremise("%" + likeName + "%", premise, new PageRequest(index, size));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}