package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.HouseSaleCtrl;
import com.alienlab.dynamicboard.repository.HouseSaleCtrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by 鸠小浅 on 2017/5/17.
 */
@Service
public class HouseSaleCtrlService {
    @Autowired
    private HouseSaleCtrlRepository houseSaleCtrlRepository;

    //添加一条操作记录
    public HouseSaleCtrl addHouseSaleCtrl(HouseSaleCtrl houseSaleCtrl) {
        try {
            return houseSaleCtrlRepository.save(houseSaleCtrl);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
