package com.chu.Reservation.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chu.Reservation.models.Compte;

public interface CompteDAO extends JpaRepository<Compte, Integer> {
	@Query("SELECT c From Compte c WHERE c.login LIKE %:login%")
	Compte findCompte(@Param("login") String login);
}
