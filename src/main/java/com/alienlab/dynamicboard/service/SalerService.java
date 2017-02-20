package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.Flat;
import com.alienlab.dynamicboard.entity.Saler;
import com.alienlab.dynamicboard.repository.FlatRepository;
import com.alienlab.dynamicboard.repository.SalerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2017/2/19.
 */
@Service
public class SalerService {
    @Autowired
    private SalerRepository salerRepository;
    @Autowired
    private FlatRepository flatRepository;
    //普通登录
    public Saler login(String account){
        return salerRepository.findByAccount(account);
    }
    //修改状态
    public Flat updateFlat(Flat flat){
        try{
            return flatRepository.save(flat);
        }catch (Exception e){
            return null;
        }
    }
}
