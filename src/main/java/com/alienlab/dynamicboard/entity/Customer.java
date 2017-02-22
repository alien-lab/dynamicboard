package com.alienlab.dynamicboard.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * 客户
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "")
public class Customer {
    private Long id;
    private String customerName;//客户姓名
    private String customerPhone;//联系方式
    private String customerSex;//性别
    private Long openid;
    private String nickname;
    private String icon;
    private Timestamp bindTime;//绑定时间

    public Customer() {
    }

    public Customer(String customerName, String customerPhone, String customerSex, Long openid, String nickname, String icon, Timestamp bindTime) {
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.customerSex = customerSex;
        this.openid = openid;
        this.nickname = nickname;
        this.icon = icon;
        this.bindTime = bindTime;
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
    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    @Basic
    @Column(name = "")
    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }
    @Basic
    @Column(name = "")
    public String getCustomerSex() {
        return customerSex;
    }

    public void setCustomerSex(String customerSex) {
        this.customerSex = customerSex;
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
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
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
    public Timestamp getBindTime() {
        return bindTime;
    }

    public void setBindTime(Timestamp bindTime) {
        this.bindTime = bindTime;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", customerName='" + customerName + '\'' +
                ", customerPhone='" + customerPhone + '\'' +
                ", customerSex='" + customerSex + '\'' +
                ", openid=" + openid +
                ", nickname='" + nickname + '\'' +
                ", icon='" + icon + '\'' +
                ", bindTime=" + bindTime +
                '}';
    }
}
