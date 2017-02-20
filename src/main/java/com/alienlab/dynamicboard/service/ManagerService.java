package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.Manager;
import com.alienlab.dynamicboard.entity.Salectrl;
import com.alienlab.dynamicboard.entity.Saler;
import com.alienlab.dynamicboard.repository.ManagerRepository;
import com.alienlab.dynamicboard.repository.SalectrlRepository;
import com.alienlab.dynamicboard.repository.SalerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2017/2/19.
 */
@Service
public class ManagerService {
    @Autowired
    private ManagerRepository managerRepository;
    @Autowired
    private SalerRepository salerRepository;
    @Autowired
    private SalectrlRepository salectrlRepository;
    //登录
    public Manager login(String account){
        return managerRepository.findByAccount(account);
    }
    //添加销售员
    public Saler addSaler(Saler saler){
        return salerRepository.save(saler);
    }
    //删除销售员
    public boolean deleteSaler(Long id){
        try{
            salerRepository.delete(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    //添加销控员
    public Salectrl addSalectrl(Salectrl salectrl){
        return salectrlRepository.save(salectrl);
    }
    //删除销控员
    public boolean deleteSalectrl(Long id){
        try{
            salectrlRepository.delete(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
