package com.sjsu.cloud.travelapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
public class UserEntity {
	@Id
	@Column(name="user_email")
	private String userEmail;
	
	@Column(name="user_fname")
    private String userFirstName;
    
	@Column(name="user_lname")
	private String userLastName;
    
	@Column(name="user_password")
	private String userPassword;

	@Column(name="join_date")
	private LocalDateTime joinDate;

	public UserEntity(String userEmail, String userFirstName, String userLastName, String userPassword, LocalDateTime joinDate) {
		this.userEmail = userEmail;
		this.userFirstName = userFirstName;
		this.userLastName = userLastName;
		this.userPassword = userPassword;
		this.joinDate = joinDate;
	}

	public UserEntity() {
	}

	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserFirstName() {
		return userFirstName;
	}
	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}
	public String getUserLastName() {
		return userLastName;
	}
	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public LocalDateTime getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(LocalDateTime joinDate) {
		this.joinDate = joinDate;
	}
}
