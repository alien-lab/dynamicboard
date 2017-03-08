package com.alienlab.dynamicboard.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alienlab.dynamicboard.db.ExecResult;
import com.alienlab.dynamicboard.entity.Building;
import com.alienlab.dynamicboard.entity.House;
import com.alienlab.dynamicboard.entity.HouseStyle;
import com.alienlab.dynamicboard.entity.Premise;
import com.alienlab.dynamicboard.service.BuildingService;
import com.alienlab.dynamicboard.service.HouseService;
import com.alienlab.dynamicboard.service.HouseStyleService;
import com.alienlab.dynamicboard.service.PremiseService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

/**
 * Created by Administrator on 2017/2/25.
 */
@RestController
@RequestMapping("/house")
public class HouseController {
    @Autowired
    private PremiseService premiseService;
    @Autowired
    private BuildingService buildingService;
    @Autowired
    private HouseStyleService houseStyleService;
    @Autowired
    private HouseService houseService;
    //添加房源
    @RequestMapping(value = "/addHouse",method = RequestMethod.POST)
    public String addHouse(HttpServletRequest request){
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(),"UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            House house = new House();
            house.setHouseNo(form.getString("houseNo"));
            house.setHouseSquare(form.getFloatValue("houseSquare"));
            String hsName = form.getString("houseStyle");
            HouseStyle houseStyle = houseStyleService.getHouseStyleByHsName(hsName);
            house.setHouseStyle(houseStyle);
            house.setUnitPrice(form.getDoubleValue("unitPrice"));
            house.setTotalPrice(form.getDoubleValue("totalPrice"));
            house.setHouseStatus(form.getString("houseStatus"));
            String buildingName = form.getString("building");
            Building building = buildingService.getBuildingByBuildingName(buildingName);
            house.setBuilding(building);
            house.setUnitNo(form.getString("unitNo"));
            house.setFloorNo(form.getString("floorNo"));
            String premiseName = form.getString("premise");
            Premise premise = premiseService.getPremiseByPremiseName(premiseName);
            house.setPremise(premise);
            House result = houseService.addHouse(house);
            if (result == null){
                return new ExecResult(false,"房源添加失败").toString();
            }else {
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(house));
                return er.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ExecResult(false,"房源添加异常").toString();
        }
    }
    //删除房源
    @RequestMapping(value = "/deleteHouse/{id}",method = RequestMethod.DELETE)
    public String deleteHouse(@PathVariable("id") Long id){
        try{
            if (houseService.deleteHouse(id)){
                return new ExecResult(true,"房源删除成功").toString();
            }else {
                return new ExecResult(false,"房源删除失败").toString();
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ExecResult(false,"房源删除异常").toString();
        }
    }
    //修改房源信息
    @RequestMapping(value = "/updateHouse",method = RequestMethod.POST)
    public String updateHouse(HttpServletRequest request){
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(),"UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            Long houseId = form.getLong("id");
            House house = houseService.getHouseById(houseId);
            house.setHouseNo(form.getString("houseNo"));
            house.setHouseSquare(form.getFloatValue("houseSquare"));
            String hsName = form.getString("houseStyle");
            HouseStyle houseStyle = houseStyleService.getHouseStyleByHsName(hsName);
            house.setHouseStyle(houseStyle);
            house.setUnitPrice(form.getDoubleValue("unitPrice"));
            house.setTotalPrice(form.getDoubleValue("totalPrice"));
            house.setHouseStatus(form.getString("houseStatus"));
            String buildingName = form.getString("building");
            Building building = buildingService.getBuildingByBuildingName(buildingName);
            house.setBuilding(building);
            house.setUnitNo(form.getString("unitNo"));
            house.setFloorNo(form.getString("floorNo"));
            String premiseName = form.getString("premise");
            Premise premise = premiseService.getPremiseByPremiseName(premiseName);
            house.setPremise(premise);
            House result = houseService.updateHouse(house);
            if (result == null){
                return new ExecResult(false,"房源添加失败").toString();
            }else {
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(house));
                return er.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ExecResult(false,"房源添加异常").toString();
        }
    }
    //查询所有房源
    @RequestMapping(value = "/getAll",method = RequestMethod.GET)
    public String getAll(){
        List<House> houses = houseService.getAll();
        ExecResult er = new ExecResult();
        er.setResult(true);
        er.setData((JSON) JSON.toJSON(houses));
        return er.toString();
    }
}
