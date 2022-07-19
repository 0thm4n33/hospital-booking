package com.chu.Reservation.business;

import java.util.List;
import java.util.stream.Stream;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chu.Reservation.dao.BatimentDAO;
import com.chu.Reservation.dao.ConsultationDAO;
import com.chu.Reservation.dao.HopitalDAO;
import com.chu.Reservation.dao.ServiceDAO;
import com.chu.Reservation.models.Batiment;
import com.chu.Reservation.models.Consultation;
import com.chu.Reservation.models.Hopital;
import com.chu.Reservation.models.Services;

import antlr.collections.impl.Vector;
@Service
@Transactional
public class RendezVousInitDefault implements IRendezVousInit {
	@Autowired
	private HopitalDAO hopitalDAO;
	@Autowired
	private BatimentDAO batimentDAO;
	@Autowired
	private ServiceDAO serviceDAO;
	@Autowired
	private ConsultationDAO consultationDAO;
	private int index;
	public void initHopital() {
		Stream.of("CHU Hassan II").forEach(hopital ->{
			hopitalDAO.save(new Hopital(hopital));
		});
	}
	
	public void initBatiment() {
		index = 0;
		List<Services>services =  serviceDAO.findAll();
		
		hopitalDAO.findAll().forEach(hopital->{
			Stream.of('A','B','C').forEach(label->{
				Batiment b = new Batiment(label,services.subList(index, index+3) ,hopital);
				services.subList(index, index+3).forEach(service ->{
					service.setBatiment(b);
				});
				batimentDAO.save(b);
				index = index + 3;
			});
		});
	}
	
	public void initServices() {
		index = 0;
		Stream.of("NEUROLOGIE","DERMATOLOGIE","RADIOLOGIE","RHYMATOLOGIE","GENETIQUE","UROLOGIE","CARDIOLOGIE",
				"OPHTALAMOLOGIE","PEDIATRIE").forEach(service->{
					serviceDAO.save(new Services(service,index++));
					if(index == 3) {
						index = 0;
					}
				});
		}
	public void initConsultation() {
		List<Services> services = serviceDAO.findAll();
		double prix = 70;
		services.forEach(s->{
			consultationDAO.save(new Consultation("Consultaion "+s.getName(),prix,s));
		});
	}
}
