package com.alienlab.dynamicboard.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * 房源-客户
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "housecustomer")
public class HouseCustomer {
    private Long id;
    private String houseNo;//房源号
    private String customerNo;//客户号
    private Timestamp operateTime;//操作时间

    public HouseCustomer() {
    }

    public HouseCustomer(String houseNo, String customerNo, Timestamp operateTime) {
        this.houseNo = houseNo;
        this.customerNo = customerNo;
        this.operateTime = operateTime;
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
    @Column(name = "customerno")
    public String getCustomerNo() {
        return customerNo;
    }

    public void setCustomerNo(String customerNo) {
        this.customerNo = customerNo;
    }
    @Basic
    @Column(name = "operatetime")
    public Timestamp getOperateTime() {
        return operateTime;
    }

    public void setOperateTime(Timestamp operateTime) {
        this.operateTime = operateTime;
    }

    @Override
    public String toString() {
        return "HouseCustomer{" +
                "id=" + id +
                ", houseNo='" + houseNo + '\'' +
                ", customerNo='" + customerNo + '\'' +
                ", operateTime=" + operateTime +
                '}';
    }
}
