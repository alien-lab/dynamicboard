package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.Salectrl;
import com.alienlab.dynamicboard.repository.FlatRepository;
import com.alienlab.dynamicboard.repository.SalectrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2017/2/19.
 */
@Service
public class SalectrlService {
    @Autowired
    private SalectrlRepository salectrlRepository;
    @Autowired
    private FlatRepository flatRepository;
    //登录
    public Salectrl login(String account){
        return salectrlRepository.findByAccount(account);
    }
}
