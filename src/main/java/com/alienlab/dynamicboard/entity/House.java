package com.alienlab.dynamicboard.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/2/22.
 */
@Entity
@Table(name = "tb_house")
public class House {
    private Long id;
    private String houseNo;//房号
    private float houseSquare;//面积
    private HouseStyle houseStyle;//户型
    private double unitPrice;//单价
    private double totalPrice;//总价
    private String houseStatus;//状态
    private Building building;//所属楼栋
    private Integer unitNo;//单元号
    private Integer floorNo;//楼层号
    private Premise premise;//所属楼盘

    public House() {
    }

    public House(String houseNo, HouseStyle houseStyle, float houseSquare, double unitPrice, String houseStatus, Building building, Integer unitNo, Integer floorNo, Premise premise) {
        this.houseNo = houseNo;
        this.houseStyle = houseStyle;
        this.houseSquare = houseSquare;
        this.unitPrice = unitPrice;
        this.totalPrice = this.unitPrice * this.houseSquare;
        this.houseStatus = houseStatus;
        this.building = building;
        this.unitNo = unitNo;
        this.floorNo = floorNo;
        this.premise = premise;
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

    @Basic
    @Column(name = "houseno")
    public String getHouseNo() {
        return houseNo;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
    }

    @Basic
    @Column(name = "housesquare")
    public float getHouseSquare() {
        return houseSquare;
    }

    public void setHouseSquare(float houseSquare) {
        this.houseSquare = houseSquare;
    }

    @ManyToOne
    @JoinColumn(name = "housestyle")
    public HouseStyle getHouseStyle() {
        return houseStyle;
    }

    public void setHouseStyle(HouseStyle houseStyle) {
        this.houseStyle = houseStyle;
    }

    @Basic
    @Column(name = "unitprice")
    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    @Basic
    @Column(name = "totalprice")
    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Basic
    @Column(name = "housestatus")
    public String getHouseStatus() {
        return houseStatus;
    }

    public void setHouseStatus(String houseStatus) {
        this.houseStatus = houseStatus;
    }

    @ManyToOne
    @JoinColumn(name = "building")
    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    @Basic
    @Column(name = "unitno")
    public Integer getUnitNo() {
        return unitNo;
    }

    public void setUnitNo(Integer unitNo) {
        this.unitNo = unitNo;
    }

    @Basic
    @Column(name = "floorno")
    public Integer getFloorNo() {
        return floorNo;
    }

    public void setFloorNo(Integer floorNo) {
        this.floorNo = floorNo;
    }

    @ManyToOne
    @JoinColumn(name = "premise")
    public Premise getPremise() {
        return premise;
    }

    public void setPremise(Premise premise) {
        this.premise = premise;
    }

    @Override
    public String toString() {
        return "House{" +
                "id=" + id +
                ", houseNo='" + houseNo + '\'' +
                ", houseSquare=" + houseSquare +
                ", houseStyle=" + houseStyle +
                ", unitPrice=" + unitPrice +
                ", totalPrice=" + totalPrice +
                ", houseStatus='" + houseStatus + '\'' +
                ", building=" + building +
                ", unitNo=" + unitNo +
                ", floorNo=" + floorNo +
                ", premise=" + premise +
                '}';
    }
}
