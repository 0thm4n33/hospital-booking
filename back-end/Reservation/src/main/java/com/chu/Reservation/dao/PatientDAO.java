package com.chu.Reservation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chu.Reservation.models.Patient;

public interface PatientDAO extends JpaRepository<Patient, Integer>{
	Patient findTopByOrderByIdDesc();
	@Query("SELECT p FROM Patient p WHERE p.ipp IS NOT NULL")
	List<Patient> getPatientConfirmed();
	
	@Query ("SELECT p from Patient p WHERE p.ipp = :ipp")
	Patient findPatientByIPP(@Param("ipp") Integer ipp);
	
	@Query ("SELECT p FROM Patient p WHERE p.cin like %:param%")
	Patient findPatientByCin(@Param("param") String param);
	
	
	@Query ("SELECT p FROM Patient p WHERE p.numeroTelephone like %:param%")
	Patient findPatientByPhone(@Param("param")String param);
	
}
