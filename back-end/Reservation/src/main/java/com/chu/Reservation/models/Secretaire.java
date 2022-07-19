package com.chu.Reservation.models;

import java.io.Serializable;
import java.util.List;
import java.util.Vector;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
public class Secretaire implements Serializable {
	@Transient
	private static final long serialVersionUID = 1L;
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@OneToMany(mappedBy = "secretaire")
	private List<PreRdv> preRendezVous = new Vector<PreRdv>();
	@OneToOne
	private Compte compte;
	
	public Secretaire() {
	}
	
	public Secretaire(int id, Compte compte) {
		super();
		this.id = id;
		this.compte = compte;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<PreRdv> getPreRendezVous() {
		return preRendezVous;
	}

	public void setPreRendezVous(List<PreRdv> preRendezVous) {
		this.preRendezVous = preRendezVous;
	}

	@Override
	public String toString() {
		return "Secretaire [id=" + id + ", preRendezVous=" + preRendezVous + ", compte=" + compte + "]";
	}
	
}
