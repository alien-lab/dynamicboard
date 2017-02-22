package com.alienlab.dynamicboard.entity;

import javax.persistence.*;

/**
 * 员工账户
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "")
public class StaffInfo {
    private Long id;
    private String staffName;//姓名
    private String staffPhone;//号码
    private Integer staffGarde;//权限等级
    private String staffStatus;//账户状态
    private Long openid;
    private String nickName;
    private String icon;
    private Premise premise;//所属楼盘

    public StaffInfo() {
    }

    public StaffInfo(String staffName, String staffPhone, Integer staffGarde, String staffStatus, Long openid, String nickName, String icon, Premise premise) {
        this.staffName = staffName;
        this.staffPhone = staffPhone;
        this.staffGarde = staffGarde;
        this.staffStatus = staffStatus;
        this.openid = openid;
        this.nickName = nickName;
        this.icon = icon;
        this.premise = premise;
    }
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    @Basic
    @Column(name = "")
    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }
    @Basic
    @Column(name = "")
    public String getStaffPhone() {
        return staffPhone;
    }

    public void setStaffPhone(String staffPhone) {
        this.staffPhone = staffPhone;
    }
    @Basic
    @Column(name = "")
    public Integer getStaffGarde() {
        return staffGarde;
    }

    public void setStaffGarde(Integer staffGarde) {
        this.staffGarde = staffGarde;
    }
    @Basic
    @Column(name = "")
    public String getStaffStatus() {
        return staffStatus;
    }

    public void setStaffStatus(String staffStatus) {
        this.staffStatus = staffStatus;
    }
    @Basic
    @Column(name = "")
    public Long getOpenid() {
        return openid;
    }

    public void setOpenid(Long openid) {
        this.openid = openid;
    }
    @Basic
    @Column(name = "")
    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
    @Basic
    @Column(name = "")
    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
    @Basic
    @Column(name = "")
    public Premise getPremise() {
        return premise;
    }

    public void setPremise(Premise premise) {
        this.premise = premise;
    }

    @Override
    public String toString() {
        return "StaffInfo{" +
                "id=" + id +
                ", staffName='" + staffName + '\'' +
                ", staffPhone='" + staffPhone + '\'' +
                ", staffGarde=" + staffGarde +
                ", staffStatus='" + staffStatus + '\'' +
                ", openid=" + openid +
                ", nickName='" + nickName + '\'' +
                ", icon='" + icon + '\'' +
                ", premise='" + premise + '\'' +
                '}';
    }
}
