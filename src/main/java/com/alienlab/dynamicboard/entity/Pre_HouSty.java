package com.alienlab.dynamicboard.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/2/27.
 */
@Entity
@Table(name = "tb_pre_housty")
public class Pre_HouSty {
    private Long id;
    private Premise premise;
    private HouseStyle houseStyle;

    public Pre_HouSty() {
    }

    public Pre_HouSty(Premise premise, HouseStyle houseStyle) {
        this.premise = premise;
        this.houseStyle = houseStyle;
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
    @ManyToOne
    @JoinColumn(name = "premise")
    public Premise getPremise() {
        return premise;
    }

    public void setPremise(Premise premise) {
        this.premise = premise;
    }
    @OneToOne
    @JoinColumn(name = "housestyle")
    public HouseStyle getHouseStyle() {
        return houseStyle;
    }

    public void setHouseStyle(HouseStyle houseStyle) {
        this.houseStyle = houseStyle;
    }

    @Override
    public String toString() {
        return "Pre_HouSty{" +
                "id=" + id +
                ", premise=" + premise +
                ", houseStyle=" + houseStyle +
                '}';
    }
}
