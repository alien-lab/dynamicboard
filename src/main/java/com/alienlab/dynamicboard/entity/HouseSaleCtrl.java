package com.alienlab.dynamicboard.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * 房源销控
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "")
public class HouseSaleCtrl {
    private Long id;
    private String houseNo;//房号
    private String salerStatusStaff;//销售员状态操作员工
    private String salerStatus;//销售员状态
    private Timestamp salerStatusTime;//销售员状态操作时间
    private String salectrlStatusStaff;//后台状态操作员工
    private String salectrlStatus;//后台状态
    private Timestamp salectrlStatusTime;//后台状态操作时间

    public HouseSaleCtrl() {
    }

    public HouseSaleCtrl(String houseNo, String salerStatusStaff, String salerStatus, Timestamp salerStatusTime, String salectrlStatusStaff, String salectrlStatus, Timestamp salectrlStatusTime) {
        this.houseNo = houseNo;
        this.salerStatusStaff = salerStatusStaff;
        this.salerStatus = salerStatus;
        this.salerStatusTime = salerStatusTime;
        this.salectrlStatusStaff = salectrlStatusStaff;
        this.salectrlStatus = salectrlStatus;
        this.salectrlStatusTime = salectrlStatusTime;
    }
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    @Basic
    @Column(name = "houseno")
    public String getHouseNo() {
        return houseNo;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
    }
    @Basic
    @Column(name = "salerstatusstaff")
    public String getSalerStatusStaff() {
        return salerStatusStaff;
    }

    public void setSalerStatusStaff(String salerStatusStaff) {
        this.salerStatusStaff = salerStatusStaff;
    }
    @Basic
    @Column(name = "salerstatus")
    public String getSalerStatus() {
        return salerStatus;
    }

    public void setSalerStatus(String salerStatus) {
        this.salerStatus = salerStatus;
    }
    @Basic
    @Column(name = "salerstatustime")
    public Timestamp getSalerStatusTime() {
        return salerStatusTime;
    }

    public void setSalerStatusTime(Timestamp salerStatusTime) {
        this.salerStatusTime = salerStatusTime;
    }
    @Basic
    @Column(name = "salectrlstatusstaff")
    public String getSalectrlStatusStaff() {
        return salectrlStatusStaff;
    }

    public void setSalectrlStatusStaff(String salectrlStatusStaff) {
        this.salectrlStatusStaff = salectrlStatusStaff;
    }
    @Basic
    @Column(name = "salectrlstatus")
    public String getSalectrlStatus() {
        return salectrlStatus;
    }

    public void setSalectrlStatus(String salectrlStatus) {
        this.salectrlStatus = salectrlStatus;
    }
    @Basic
    @Column(name = "salectrlstatustime")
    public Timestamp getSalectrlStatusTime() {
        return salectrlStatusTime;
    }

    public void setSalectrlStatusTime(Timestamp salectrlStatusTime) {
        this.salectrlStatusTime = salectrlStatusTime;
    }

    @Override
    public String toString() {
        return "HouseSaleCtrl{" +
                "id=" + id +
                ", houseNo='" + houseNo + '\'' +
                ", salerStatusStaff='" + salerStatusStaff + '\'' +
                ", salerStatus='" + salerStatus + '\'' +
                ", salerStatusTime=" + salerStatusTime +
                ", salectrlStatusStaff='" + salectrlStatusStaff + '\'' +
                ", salectrlStatus='" + salectrlStatus + '\'' +
                ", salectrlStatusTime=" + salectrlStatusTime +
                '}';
    }
}
