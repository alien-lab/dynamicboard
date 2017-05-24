package com.alienlab.dynamicboard.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * 房源销控
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "tb_house_salectrl")
public class HouseSaleCtrl {
    private Long id;
    private House house;//房号
    private String salerStatusStaff;//销售员状态操作员工
    private String salerStatus;//销售员状态
    private Timestamp salerStatusTime;//销售员状态操作时间
    private String salectrlStatusStaff;//后台状态操作员工
    private String salectrlStatus;//后台状态
    private Timestamp salectrlStatusTime;//后台状态操作时间

    public HouseSaleCtrl() {
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "house")
    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
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
    @Column(name = "salectrlstatusstaff")
    public String getSalectrlStatusStaff() {
        return salectrlStatusStaff;
    }

    public void setSalectrlStatusStaff(String salectrlStatusStaff) {
        this.salectrlStatusStaff = salectrlStatusStaff;
    }
    //    @ManyToOne
//    @JoinColumn(name = "salerstatusstaff")
//    public Staff getSalerStatusStaff() {
//        return salerStatusStaff;
//    }
//
//    public void setSalerStatusStaff(Staff salerStatusStaff) {
//        this.salerStatusStaff = salerStatusStaff;
//    }

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

//    @ManyToOne
//    @JoinColumn(name = "salectrlstatusstaff")
//    public Staff getSalectrlStatusStaff() {
//        return salectrlStatusStaff;
//    }
//
//    public void setSalectrlStatusStaff(Staff salectrlStatusStaff) {
//        this.salectrlStatusStaff = salectrlStatusStaff;
//    }

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
                ", house=" + house +
                ", salerStatusStaff='" + salerStatusStaff + '\'' +
                ", salerStatus='" + salerStatus + '\'' +
                ", salerStatusTime=" + salerStatusTime +
                ", salectrlStatusStaff='" + salectrlStatusStaff + '\'' +
                ", salectrlStatus='" + salectrlStatus + '\'' +
                ", salectrlStatusTime=" + salectrlStatusTime +
                '}';
    }
}
