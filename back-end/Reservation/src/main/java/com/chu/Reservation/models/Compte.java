package com.chu.Reservation.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class Compte {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(unique = true)
	private String login;
	private String password;
	@OneToOne(mappedBy = "compte") @JsonProperty(access = Access.READ_ONLY)
	private Patient patient;
	@OneToOne(mappedBy = "compte") 
	private Secretaire secretaire;
	@Column(columnDefinition = "boolean default false")
	private boolean isAdmin;
	
	

	public Compte() {
	}

	public Compte(int id, String login, String password, boolean isAdmin) {
		super();
		this.id = id;
		this.login = login;
		this.password = password;
		this.isAdmin = isAdmin;
	}
	
	public Compte(int id, String login, String password) {
		super();
		this.id = id;
		this.login = login;
		this.password = password;
	}
	
	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	
	public Secretaire getSecretaire() {
		return secretaire;
	}
	
	public void setSecretaire(Secretaire secretaire) {
		this.secretaire = secretaire;
	}
	
	@Override
	public String toString() {
		return "Compte [id=" + id + ", login=" + login + ", password=" + password + ", patient=" + patient + "]";
	}
	
	
}
