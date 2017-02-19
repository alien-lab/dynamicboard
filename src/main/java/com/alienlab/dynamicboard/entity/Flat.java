package com.alienlab.dynamicboard.entity;

import org.hibernate.annotations.BatchSize;

import javax.lang.model.element.NestingKind;
import javax.persistence.*;

/**
 * Created by Administrator on 2017/2/19.
 */
@Entity
@Table(name = "", schema = "", catalog = "")
public class Flat {
    private Long id;
    private String number;//房号
    private float square;//面积
    private String type;//户型
    private float unitPrice;//单价
    private float totalPrice;//总价
    private String statue;//状态

    public Flat() {
    }
    public Flat(String number, float square, String type, float unitPrice, float totalPrice, String statue) {
        this.number = number;
        this.square = square;
        this.type = type;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
        this.statue = statue;
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
    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
    @Basic
    @Column(name = "")
    public float getSquare() {
        return square;
    }

    public void setSquare(float square) {
        this.square = square;
    }
    @Basic
    @Column(name = "")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    @Basic
    @Column(name = "")
    public float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(float unitPrice) {
        this.unitPrice = unitPrice;
    }
    @Basic
    @Column(name = "")
    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }
    @Basic
    @Column(name = "")
    public String getStatue() {
        return statue;
    }

    public void setStatue(String statue) {
        this.statue = statue;
    }

    @Override
    public String toString() {
        return "Flat{" +
                "id=" + id +
                ", number='" + number + '\'' +
                ", square=" + square +
                ", type='" + type + '\'' +
                ", unitPrice=" + unitPrice +
                ", totalPrice=" + totalPrice +
                ", statue='" + statue + '\'' +
                '}';
    }
}
