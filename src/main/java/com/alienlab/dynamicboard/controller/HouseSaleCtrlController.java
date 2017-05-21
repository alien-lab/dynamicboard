package com.alienlab.dynamicboard.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alienlab.dynamicboard.db.ExecResult;
import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.entity.HouseSaleCtrl;
import com.alienlab.dynamicboard.entity.Staff;
import com.alienlab.dynamicboard.service.HouseSaleCtrlService;
import com.alienlab.dynamicboard.service.HouseService;
import com.alienlab.dynamicboard.service.StaffService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.Date;

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

    @RequestMapping(value = "/addHouseSaleCtrl", method = RequestMethod.POST)
    public String addHouseSaleCtrl(HttpServletRequest request) {
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(), "UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            System.out.println(form.getJSONObject("house"));
            System.out.println(form.getJSONObject("salerStatusStaff"));
            System.out.println(form.getString("salerStatus"));
            System.out.println(form.getJSONObject("salectrlStatusStaff"));
            System.out.println(form.getString("salectrlStatus"));
            HouseSaleCtrl houseSaleCtrl = new HouseSaleCtrl();
            if (form.getJSONObject("house") != null) {
                JSONObject houseJSON = form.getJSONObject("house");
                House house = houseService.getHouseById(houseJSON.getLong("id"));
                houseSaleCtrl.setHouse(house);//房源
            } else {
                houseSaleCtrl.setHouse(null);
            }
            if (form.getJSONObject("salerStatusStaff") != null) {
                JSONObject salerStatusStaffJSON = form.getJSONObject("salerStatusStaff");
                Staff staffSaler = staffService.findStaffById(salerStatusStaffJSON.getLong("id"));
                System.out.println(staffSaler);
                houseSaleCtrl.setSalerStatusStaff(staffSaler);//销售员
                houseSaleCtrl.setSalerStatusTime(new Timestamp(new Date().getTime()));//时间
            } else {
                houseSaleCtrl.setSalerStatusStaff(null);
                houseSaleCtrl.setSalerStatusTime(null);
            }
            if (form.getString("salerStatus") != null) {
                String salerStatus = form.getString("salerStatus");
                houseSaleCtrl.setSalerStatus(salerStatus);//状态
            } else {
                houseSaleCtrl.setSalerStatus(null);
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
//            if (form.getString("salectrlStatus") != null) {
//                String saleCtrlStatus = form.getString("salectrlStatus");
//                houseSaleCtrl.setSalectrlStatus(saleCtrlStatus);//状态
//            } else {
//                houseSaleCtrl.setSalectrlStatus(null);
//            }
            HouseSaleCtrl result = houseSaleCtrlService.addHouseSaleCtrl(houseSaleCtrl);
            if (result == null) {
                System.out.println("11111");
                return new ExecResult(false, "记录添加失败").toString();
            } else {
                System.out.println("22222");
                System.out.println(result);
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(result));
                return er.toString();
            }
        } catch (Exception e) {
            System.out.println("33333");
            e.printStackTrace();
            return new ExecResult(false, "记录添加异常").toString();
        }
    }
}
