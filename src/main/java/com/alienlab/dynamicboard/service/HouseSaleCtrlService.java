package com.alienlab.dynamicboard.service;

import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.entity.HouseSaleCtrl;
import com.alienlab.dynamicboard.entity.Premise;
import com.alienlab.dynamicboard.repository.HouseRepository;
import com.alienlab.dynamicboard.repository.HouseSaleCtrlRepository;
import jdk.management.resource.internal.inst.FileOutputStreamRMHooks;
import org.apache.poi.util.SystemOutLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.Expression;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 鸠小浅 on 2017/5/17.
 */
@Service
public class HouseSaleCtrlService {
    @Autowired
    private HouseSaleCtrlRepository houseSaleCtrlRepository;
    @Autowired
    private HouseRepository houseRepository;

    //添加一条操作记录
    public HouseSaleCtrl addHouseSaleCtrl(HouseSaleCtrl houseSaleCtrl) {
        try {
            return houseSaleCtrlRepository.save(houseSaleCtrl);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //获取房源最新申请记录
    public HouseSaleCtrl findLast1ByHouse(House house) {
        try {
            List<HouseSaleCtrl> houseSaleCtrls = houseSaleCtrlRepository.findByHouse(house);
            if (houseSaleCtrls.size() > 0) {
                HouseSaleCtrl houseSaleCtrl = houseSaleCtrls.get(houseSaleCtrls.size() - 1);
                return houseSaleCtrl;
            } else {
                return null;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //获取所有操作记录
    public List<HouseSaleCtrl> findAll() {
        try {
            List<HouseSaleCtrl> houseSaleCtrls = houseSaleCtrlRepository.findAll();
            List<HouseSaleCtrl> result = new ArrayList<>();
            for (HouseSaleCtrl houseSaleCtrl : houseSaleCtrls) {
                result.add(houseSaleCtrl);
            }
            return result;
        } catch (Exception e) {
            return null;
        }
    }

    //获取该楼盘所有操作记录
    public List<HouseSaleCtrl> findByPremise(Premise premise) {
        try {
            List<House> houses = houseRepository.findByPremise(premise);
            List<HouseSaleCtrl> result = new ArrayList<>();
            for (House house : houses) {
                List<HouseSaleCtrl> houseSaleCtrls = houseSaleCtrlRepository.findByHouseOrderByIdDesc(house);
                for (HouseSaleCtrl houseSaleCtrl : houseSaleCtrls) {
                    result.add(houseSaleCtrl);
                }
            }

//            for (HouseSaleCtrl houseSaleCtrl : houseSaleCtrls) {
//                if (houseSaleCtrl.getHouse().getPremise().equals(premise))
//                    result.add(houseSaleCtrl);
//            }
            return result;
        } catch (Exception e) {
            return null;
        }
    }
}
