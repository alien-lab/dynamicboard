package com.alienlab.dynamicboard.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.ZonedDateTime;

/**
 * 房源-客户
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "tb_house_customer")
public class HouseCustomer implements Serializable {
    private Long id;
    private House house;//房源号
    private Customer customer;//客户号
    private Timestamp operateTime;//操作时间

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name="house")
    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    @ManyToOne
    @JoinColumn(name="customer")
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Timestamp getOperateTime() {
        return operateTime;
    }

    public void setOperateTime(Timestamp operateTime) {
        this.operateTime = operateTime;
    }
}
