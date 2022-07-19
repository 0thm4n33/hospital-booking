package com.chu.Reservation.models;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class RendezVous {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	
	private LocalDateTime dateRendezVous;
	
	@OneToOne @JsonProperty(access = Access.WRITE_ONLY)
	private PreRdv preRendezVous;
	
	@ManyToOne @JsonProperty(access = Access.READ_WRITE)
	private Consultation consultations;
	
	
	public RendezVous() {
	}
	
	
	public RendezVous(int id, LocalDateTime dateRendezVous, PreRdv preRendezVous, Consultation consultations) {
		super();
		this.id = id;
		this.dateRendezVous = dateRendezVous;
		this.preRendezVous = preRendezVous;
		this.consultations = consultations;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	

	public LocalDateTime getDateRendezVous() {
		return dateRendezVous;
	}


	public void setDateRendezVous(LocalDateTime dateRendezVous) {
		this.dateRendezVous = dateRendezVous;
	}


	public PreRdv getPreRendezVous() {
		return preRendezVous;
	}
	
	public void setPreRendezVous(PreRdv preRendezVous) {
		this.preRendezVous = preRendezVous;
	}
	

	public Consultation getConsultations() {
		return consultations;
	}


	public void setConsultations(Consultation consultations) {
		this.consultations = consultations;
	}


	@Override
	public String toString() {
		return "RendezVous [id=" + id + ", dateRendezVous=" + dateRendezVous + ", preRendezVous=" + preRendezVous
				+ ", consultations=" + consultations + "]";
	}
	
}
