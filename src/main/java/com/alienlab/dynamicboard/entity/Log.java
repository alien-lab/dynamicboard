package com.alienlab.dynamicboard.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * 销控日志
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "")
public class Log {
    private Long id;
    private Timestamp logTime;//日志时间
    private String staff;//操作员工
    private String house;//操作房源
    private String housestatus;//状态

    public Log() {
    }

    public Log(Timestamp logTime, String staff, String house, String housestatus) {
        this.logTime = logTime;
        this.staff = staff;
        this.house = house;
        this.housestatus = housestatus;
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
    public Timestamp getLogTime() {
        return logTime;
    }

    public void setLogTime(Timestamp logTime) {
        this.logTime = logTime;
    }
    @Basic
    @Column(name = "")
    public String getStaff() {
        return staff;
    }

    public void setStaff(String staff) {
        this.staff = staff;
    }
    @Basic
    @Column(name = "")
    public String getHouse() {
        return house;
    }

    public void setHouse(String house) {
        this.house = house;
    }
    @Basic
    @Column(name = "")
    public String getHousestatus() {
        return housestatus;
    }

    public void setHousestatus(String housestatus) {
        this.housestatus = housestatus;
    }

    @Override
    public String toString() {
        return "Log{" +
                "id=" + id +
                ", logTime=" + logTime +
                ", staff='" + staff + '\'' +
                ", house='" + house + '\'' +
                ", housestatus='" + housestatus + '\'' +
                '}';
    }
}
