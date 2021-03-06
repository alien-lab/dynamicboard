package com.alienlab.dynamicboard.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alienlab.dynamicboard.db.ExecResult;
import com.alienlab.dynamicboard.entity.Building;
import com.alienlab.dynamicboard.entity.Premise;
import com.alienlab.dynamicboard.service.BuildingService;
import com.alienlab.dynamicboard.service.PremiseService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
@RequestMapping("/building")
public class BuildingController {
    @Autowired
    private PremiseService premiseService;
    @Autowired
    private BuildingService buildingService;
    //添加楼栋
    @RequestMapping(value = "/addBuilding",method = RequestMethod.POST)
    public String addBuilding(HttpServletRequest request){
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(),"UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            Building building = new Building();
            building.setBuildingName(form.getString("buildingName"));
            building.setBuildingNo(form.getString("buildingNo"));
            building.setFloorNu(form.getInteger("floorNu"));
            building.setUnitNu(form.getInteger("unitNu"));
            building.setUnitHouseNu(form.getInteger("unitHouseNu"));
            building.setBuildingStatus(form.getString("buildingStatus"));
            JSONObject premiseJSON = form.getJSONObject("premise");
            String premiseName = premiseJSON.getString("premiseName");
            Premise premise = premiseService.getPremiseByPremiseName(premiseName);
            building.setPremise(premise);
            Building result = buildingService.addBuilding(building);
            if (result == null){
                return new ExecResult(false,"楼栋添加失败").toString();
            }else {
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(building));
                return er.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ExecResult(false,"楼栋添加异常").toString();
        }
    }
    //删除楼栋
    @RequestMapping(value = "/deleteBuilding/{id}",method = RequestMethod.DELETE)
    public String deleteBuilding(@PathVariable("id") Long id){
        try{
            if (buildingService.deleteBuilding(id)){
                return new ExecResult(true,"楼栋删除成功").toString();
            }else {
                return new ExecResult(false,"楼栋删除失败").toString();
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ExecResult(false,"楼栋删除异常").toString();
        }
    }
    //新修改楼栋信息
    @RequestMapping(value = "/newUpdateBuilding",method = RequestMethod.POST)
    public String newUpdateBuilding(HttpServletRequest request){
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(),"UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            Long buildingId = form.getLong("id");
            Building building = buildingService.getBuildingById(buildingId);
            building.setBuildingName(form.getString("buildingName"));
            building.setBuildingNo(form.getString("buildingNo"));
            building.setFloorNu(form.getInteger("floorNu"));
            building.setUnitNu(form.getInteger("unitNu"));
            building.setUnitHouseNu(form.getInteger("unitHouseNu"));
            building.setBuildingStatus(form.getString("buildingStatus"));
            JSONObject premiseJSON = form.getJSONObject("premise");
            System.out.println(premiseJSON);
            String premiseName = premiseJSON.getString("premiseName");
            Premise premise = premiseService.getPremiseByPremiseName(premiseName);
            building.setPremise(premise);
            Building result = buildingService.newUpdateBuilding(building);
            if (result == null){
                return new ExecResult(false,"楼栋修改失败").toString();
            }else {
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(result));
                return er.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ExecResult(false,"楼栋修改异常").toString();
        }
    }
    //旧修改楼栋信息
    @RequestMapping(value = "/oldUpdateBuilding",method = RequestMethod.POST)
    public String oldUpdateBuilding(HttpServletRequest request){
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(),"UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            Long buildingId = form.getLong("id");
            Building building = buildingService.getBuildingById(buildingId);
            building.setBuildingName(form.getString("buildingName"));
            building.setBuildingNo(form.getString("buildingNo"));
            building.setFloorNu(form.getInteger("floorNu"));
            building.setUnitNu(form.getInteger("unitNu"));
            building.setUnitHouseNu(form.getInteger("unitHouseNu"));
            building.setBuildingStatus(form.getString("buildingStatus"));
            JSONObject premiseJSON = form.getJSONObject("premise");
            System.out.println(premiseJSON);
            String premiseName = premiseJSON.getString("premiseName");
            Premise premise = premiseService.getPremiseByPremiseName(premiseName);
            building.setPremise(premise);
            Building result = buildingService.oldUpdateBuilding(building);
            if (result == null){
                return new ExecResult(false,"楼栋修改失败").toString();
            }else {
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(building));
                return er.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ExecResult(false,"楼栋修改异常").toString();
        }
    }
    //查询所有楼栋
    @RequestMapping(value = "/getAll",method = RequestMethod.GET)
    public String getAll(){
        List<Building> buildings = buildingService.getAll();
        ExecResult er = new ExecResult();
        er.setResult(true);
        er.setData((JSON) JSON.toJSON(buildings));
        return er.toString();
    }
    //根据buildingName查询楼栋
    @RequestMapping(value = "/getByBuildingName/{buildingName}",method = RequestMethod.GET)
    public String getBuildingByBuildingName(@PathVariable("buildingName") String buildingName){
        Building building = buildingService.getBuildingByBuildingName(buildingName);
        return JSON.toJSONString(building);
    }
    //根据premise查询楼栋
    @RequestMapping(value = "/getByPremise/{premiseName}",method = RequestMethod.GET)
    public String getBuildingByPremise(@PathVariable("premiseName") String premiseName){
        List<Building> buildings = buildingService.getBuildingByPremise(premiseName);
        return JSON.toJSONString(buildings);
    }
    //分页查询
    @RequestMapping(value = "/getBuildingPage/{index}-{size}",method = RequestMethod.GET)
    public Page<Building> getBuildingPage(@PathVariable("index") String index, @PathVariable("size") String size){
        return buildingService.getBuildingPage(Integer.parseInt(index),Integer.parseInt(size));
    }
    //根据premise分页查询
    @RequestMapping(value = "/getBuildingByPremisePage/{premiseName}-{index}-{size}",method = RequestMethod.GET)
    public Page<Building> getBuildingByPremisePage(@PathVariable("premiseName") String premiseName, @PathVariable("index") String index, @PathVariable("size") String size){
        return buildingService.getBuildingByPremisePage(premiseName,Integer.parseInt(index),Integer.parseInt(size));
    }
}
