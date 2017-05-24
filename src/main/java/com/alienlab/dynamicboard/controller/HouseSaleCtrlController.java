package com.alienlab.dynamicboard.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alienlab.dynamicboard.db.ExecResult;
import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.entity.HouseSaleCtrl;
import com.alienlab.dynamicboard.entity.Premise;
import com.alienlab.dynamicboard.entity.Staff;
import com.alienlab.dynamicboard.service.HouseSaleCtrlService;
import com.alienlab.dynamicboard.service.HouseService;
import com.alienlab.dynamicboard.service.PremiseService;
import com.alienlab.dynamicboard.service.StaffService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by 鸠小浅 on 2017/5/17.
 */
@RestController
@RequestMapping("/houseSaleCtrl")
public class HouseSaleCtrlController {
    @Autowired
    private HouseSaleCtrlService houseSaleCtrlService;
    @Autowired
    private StaffService staffService;
    @Autowired
    private HouseService houseService;
    @Autowired
    private PremiseService premiseService;

    //添加一条记录
    @RequestMapping(value = "/addHouseSaleCtrl", method = RequestMethod.POST)
    public String addHouseSaleCtrl(HttpServletRequest request) {
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(), "UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            System.out.println(form.getJSONObject("house"));
            System.out.println(form.getString("salerStatusStaff"));
            System.out.println(form.getString("salerStatus"));
            System.out.println(form.getString("saleCtrlStatusStaff"));
            System.out.println(form.getString("saleCtrlStatus"));
            HouseSaleCtrl houseSaleCtrl = new HouseSaleCtrl();
            if (form.getJSONObject("house") != null) {
                JSONObject houseJSON = form.getJSONObject("house");
                House house = houseService.getHouseById(houseJSON.getLong("id"));
                houseSaleCtrl.setHouse(house);//房源
                if (form.getString("salerStatusStaff") != null) {//申请操作
                    house.setHouseStatus("申请中");
                } else if (form.getString("saleCtrlStatusStaff") != null) {
                    house.setHouseStatus(form.getString("saleCtrlStatus"));
                }
            } else {
                houseSaleCtrl.setHouse(null);
            }
            if (form.getString("salerStatusStaff") != null) {
                houseSaleCtrl.setSalerStatusStaff(form.getString("salerStatusStaff"));//销售员
                houseSaleCtrl.setSalerStatusTime(new Timestamp(new Date().getTime()));//时间
            } else {
                houseSaleCtrl.setSalerStatusStaff(null);
                houseSaleCtrl.setSalerStatusTime(null);
            }
//            if (form.getJSONObject("salerStatusStaff") != null) {
//                JSONObject salerStatusStaffJSON = form.getJSONObject("salerStatusStaff");
//                Staff staffSaler = staffService.findStaffById(salerStatusStaffJSON.getLong("id"));
//                System.out.println(staffSaler);
//                houseSaleCtrl.setSalerStatusStaff(staffSaler);//销售员
//                houseSaleCtrl.setSalerStatusTime(new Timestamp(new Date().getTime()));//时间
//            } else {
//                houseSaleCtrl.setSalerStatusStaff(null);
//                houseSaleCtrl.setSalerStatusTime(null);
//            }
            if (form.getString("salerStatus") != null) {
                String salerStatus = form.getString("salerStatus");
                houseSaleCtrl.setSalerStatus(salerStatus);//状态
            } else {
                houseSaleCtrl.setSalerStatus(null);
            }
            if (form.getString("saleCtrlStatusStaff") != null) {
                houseSaleCtrl.setSalectrlStatusStaff(form.getString("saleCtrlStatusStaff"));//销控员
                houseSaleCtrl.setSalectrlStatusTime(new Timestamp(new Date().getTime()));//时间
            } else {
                houseSaleCtrl.setSalectrlStatusStaff(null);
                houseSaleCtrl.setSalectrlStatusTime(null);
            }
//            if (form.getJSONObject("salectrlStatusStaff") != null) {
//                JSONObject salectrlStatusStaffJSON = form.getJSONObject("salectrlStatusStaff");
//                Staff staffSaleCtrl = staffService.findStaffById(salectrlStatusStaffJSON.getLong("id"));
//                houseSaleCtrl.setSalectrlStatusStaff(staffSaleCtrl);//销控员
//                houseSaleCtrl.setSalectrlStatusTime(new Timestamp(new Date().getTime()));//时间
//            } else {
//                houseSaleCtrl.setSalectrlStatusStaff(null);
//                houseSaleCtrl.setSalectrlStatusTime(null);
//            }
            if (form.getString("saleCtrlStatus") != null) {
                String saleCtrlStatus = form.getString("saleCtrlStatus");
                houseSaleCtrl.setSalectrlStatus(saleCtrlStatus);//状态
            } else {
                houseSaleCtrl.setSalectrlStatus(null);
            }
            HouseSaleCtrl result = houseSaleCtrlService.addHouseSaleCtrl(houseSaleCtrl);
            if (result == null) {
                return new ExecResult(false, "记录添加失败").toString();
            } else {
                System.out.println(result);
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(result));
                return er.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ExecResult(false, "记录添加异常").toString();
        }
    }

    //获取房源最新申请记录
    @RequestMapping(value = "/findLastHouseSaleCtrlByHouse/{houseId}", method = RequestMethod.GET)
    public String findLastHouseSaleCtrlByHouse(@PathVariable("houseId") Long houseId) {
        House house = houseService.getHouseById(houseId);
        return JSON.toJSONString(houseSaleCtrlService.findLast1ByHouse(house));
    }

    //获取所有记录（管理员用）
    @RequestMapping(value = "/findAllHouseSaleCtrl", method = RequestMethod.GET)
    public String findAllHouseSaleCtrl() {
        return JSON.toJSONString(houseSaleCtrlService.findAll());
    }

    //获取该楼盘所有操作记录
    @RequestMapping(value = "/findHouseSaleCtrlByPremise/{premiseName}", method = RequestMethod.GET)
    public String findHouseSaleCtrlByPremise(@PathVariable("premiseName") String premiseName) {
        System.out.println(premiseName);
        Premise premise = premiseService.getPremiseByPremiseName(premiseName);
//        DateFormat format = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
//        List<HouseSaleCtrl> houseSaleCtrls = houseSaleCtrlService.findByPremise(premise);
//        for (HouseSaleCtrl houseSaleCtrl : houseSaleCtrls) {
//            if (houseSaleCtrl.getSalerStatusStaff() != null) {
//                houseSaleCtrl.getSalerStatusTime()
//            } else if (houseSaleCtrl.getSalectrlStatusStaff() != null) {
//
//            }
//        }
        return JSON.toJSONString(houseSaleCtrlService.findByPremise(premise));
    }
}
