package com.alienlab.dynamicboard.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/2/19.
 */
@Entity
@Table(name = "", schema = "", catalog = "")
public class Director {
    private Long id;
    private String account;
    private String password;

    public Director() {
    }

    public Director(String account, String password) {
        this.account = account;
        this.password = password;
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
    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }
    @Basic
    @Column(name = "")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Director{" +
                "id=" + id +
                ", account='" + account + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
