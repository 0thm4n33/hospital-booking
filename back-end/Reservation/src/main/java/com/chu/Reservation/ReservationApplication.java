package com.chu.Reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.chu.Reservation.business.IRendezVousInit;
import com.chu.Reservation.business.RendezVousInitDefault;

@SpringBootApplication
public class ReservationApplication {
	/*
	@Autowired
	private IRendezVousInit init;*/
	public static void main(String[] args) {
		SpringApplication.run(ReservationApplication.class, args);
	}

	/*
	public void run(String... args) throws Exception {
		init.initHopital();
		init.initServices();
		init.initBatiment();	
	}*/
}
