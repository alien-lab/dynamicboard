package com.alienlab.dynamicboard.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/2/19.
 */
@Entity
@Table(name = "", schema = "", catalog = "")
public class Manager {
    private Long id;
    private String account;
    private String password;

    public Manager() {
    }

    public Manager(String account, String password) {
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
        return "Manager{" +
                "id=" + id +
                ", account='" + account + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
