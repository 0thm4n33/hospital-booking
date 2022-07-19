package com.chu.Reservation.dao;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.chu.Reservation.models.RendezVous;
public interface RendezVousDAO extends JpaRepository<RendezVous, Integer> {
	List<RendezVous>findAllBydateRendezVousBetween(LocalDateTime dateRendezVousStart,LocalDateTime dateRendezVousEnd);

}
