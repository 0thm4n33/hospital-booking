package com.chu.Reservation.business;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.chu.Reservation.models.Compte;
import com.chu.Reservation.models.Consultation;
import com.chu.Reservation.models.Hopital;
import com.chu.Reservation.models.Patient;
import com.chu.Reservation.models.PreRdv;
import com.chu.Reservation.models.RendezVous;
import com.chu.Reservation.models.Services;

public interface RendezVousManager {
	public Patient createAccountPatient(Compte compte,Patient patient);
	public List<RendezVous> listeRendezVous(int id);
	public List<PreRdv> listePreRdv(int id);
	public Compte chercherCompte(Compte compte);
	public List<PreRdv> listAllPreRdv();
	public Patient chercherPatientIPP(Integer ipp);
	public List<Hopital> getHopitaux();
	public List<Services> getServices(int id);
	public PreRdv effectuerPrdv(PreRdv prdv);
	public String savePhoto(byte[] image,String name);
	public byte[] getImage(int id,String type);
	public RendezVous addRdv(RendezVous rendezVous);
	public List<Consultation> getConsultations(int idService);
	public Patient findPatientById(int id);
	public Patient addIPP(int id,Integer ipp);
	public Patient getLastPatient();
	public List<Patient> getAllPatientConfirmed();
	public List<Services> getServicesHopital(int idService);
	public Hopital getHopitalByService(int idService);
	public boolean isExist(String type,String param);
	public List<RendezVous>getAllRdvs();
	public Patient getPatientByRdv(int idRdv);
	public PreRdv supprimerPreRdv(int idPrdv);
	public int getGeneratedIPP();
	public PreRdv validatePreRdv(int idPrdv);
	public PreRdv setMotifRefus(int idPreRdv,String motif);
	public List<RendezVous> getRdvBetween(LocalDate start, LocalDate end);
}
