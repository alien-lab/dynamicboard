package com.alienlab.dynamicboard.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alienlab.dynamicboard.db.ExecResult;
import com.alienlab.dynamicboard.entity.Premise;
import com.alienlab.dynamicboard.entity.Staff;
import com.alienlab.dynamicboard.service.PremiseService;
import com.alienlab.dynamicboard.service.StaffService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by 鸠小浅 on 2017/5/10.
 */
@RestController
@RequestMapping(value = "/staff")
public class StaffController {
    @Autowired
    private StaffService staffService;
    @Autowired
    private PremiseService premiseService;

    //登录
    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    public String doLogin(HttpServletRequest request) {
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(), "utf-8");
            JSONObject form = JSON.parseObject(jsonBody);
            System.out.println(form);
            String account = form.getString("account");
            String password = form.getString("password");
            Staff loginStaff = new Staff();
            loginStaff.setAccount(account);
            loginStaff.setPassword(password);
            Staff staff = staffService.login(loginStaff);
            if (staff == null) {
                return new ExecResult(false, "登录异常，请核实用户名是否正确").toString();
            } else if (staff == loginStaff) {
                return new ExecResult(false, "密码错误").toString();
            } else {
                System.out.println(staff);
                JSONObject staffJSON = (JSONObject) JSONObject.toJSON(staff);
                request.getSession().setAttribute("staff", staffJSON);//当前用户进入session
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData(staffJSON);
                return er.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ExecResult(false, "登录发生异常").toString();
        }
    }

    //注册
    @RequestMapping(value = "/doRegister", method = RequestMethod.POST)
    public String addUser(HttpServletRequest request) {
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(), "UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            System.out.println(form);
            Staff newStaff = new Staff();
            newStaff.setAccount(form.getString("account"));
            newStaff.setPassword(form.getString("password"));
            newStaff.setStaffStatus("1");
            newStaff.setStaffGarde(2);
            Staff result = staffService.register(newStaff);
            if (result == newStaff) {
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(result));
                return er.toString();
            } else if (result == null) {
                return new ExecResult(false, "注册发生异常").toString();
            } else {
                return new ExecResult(false, "用户名已被注册").toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ExecResult(false, "注册发生异常").toString();
        }
    }

    //个人信息修改
    @RequestMapping(value = "/updateStaffInfo", method = RequestMethod.POST)
    public String updateStaffInfo(HttpServletRequest request) {
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(), "UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            System.out.println(form);
            Long staffId = form.getLong("id");
            Staff staff = staffService.findStaffById(staffId);
            staff.setStaffName(form.getString("staffName"));
            staff.setStaffPhone(form.getString("staffPhone"));
            JSONObject premiseJSON = form.getJSONObject("premise");
            Premise premise = premiseService.getPremiseByPremiseName(premiseJSON.getString("premiseName"));
            staff.setPremise(premise);
            Staff result = staffService.updateStaffInfo(staff);
            if (result == null) {
                return new ExecResult(false, "个人信息修改失败").toString();
            } else {
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(result));
                return er.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ExecResult(false, "个人信息修改发生异常").toString();
        }
    }

    //分页查所有staff
    @RequestMapping(value = "/findStaffPage/{index}-{size}", method = RequestMethod.GET)
    public Page<Staff> findStaffPage(@PathVariable("index") String index, @PathVariable("size") String size) {
        return staffService.findStaffPage(Integer.parseInt(index), Integer.parseInt(size));
    }

    //根据premise分页查staff
    @RequestMapping(value = "findStaffByPremisePage/{premiseName}-{index}-{size}", method = RequestMethod.GET)
    public Page<Staff> findStaffByPremisePage(@PathVariable("premiseName") String premiseName, @PathVariable("index") String index, @PathVariable("size") String size) {
        return staffService.findStaffByPremisePage(premiseName, Integer.parseInt(index), Integer.parseInt(size));
    }

    //根据likeName分页模糊查staff
    @RequestMapping(value = "/findByLikeNamePage/{likeName}-{index}-{size}")
    public Page<Staff> findByLikeNamePage(@PathVariable("likeName") String likeName, @PathVariable("index") String index, @PathVariable("size") String size) {
        return staffService.findByLikeNamePage(likeName, Integer.parseInt(index), Integer.parseInt(size));
    }

    //员工账户启用停用
    @RequestMapping(value = "/updateStaffStatus", method = RequestMethod.POST)
    public String updateStaffStatus(HttpServletRequest request) {
        try {
            String jsonBody = IOUtils.toString(request.getInputStream(), "UTF-8");
            JSONObject form = JSONObject.parseObject(jsonBody);
            System.out.println(form);
            Long staffId = form.getLong("id");
            Staff staff = staffService.findStaffById(staffId);
            staff.setStaffStatus(form.getString("staffStatus"));
            Staff result = staffService.updateStaffInfo(staff);
            if (result == null) {
                return new ExecResult(false, "操作失败").toString();
            } else {
                ExecResult er = new ExecResult();
                er.setResult(true);
                er.setData((JSON) JSON.toJSON(result));
                return er.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ExecResult(false, "操作发生异常").toString();
        }
    }
}
