package com.swd6.swd_tablereservation.repository;

import com.swd6.swd_tablereservation.entity.Reservation;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    @Query(value = "SELECT * FROM Reservation r WHERE r.username = ?1", nativeQuery = true)
    @Transactional
    public List<Reservation> getReservationByUsername(String username);

    @Query(value = "SELECT * FROM Reservation r WHERE r.reservation_id = ?1", nativeQuery = true)
    public Reservation getReservationByReservationId(int id);

    /*
     * status:
     * done - đã diễn ra xong
     * reserved - đã đặt thành công, chờ diễn ra
     * pending process - đã được ghi nhận, chờ xử lý
     * pending deposit - đã được xử lý, chờ đặt cọc
     * cancelled - đã hủy
     */
    @Query(value = "SELECT * FROM Reservation r WHERE r.status = ?1", nativeQuery = true)
    @Transactional
    public List<Reservation> getReservationByStatus(String status);

    @Query(value = "SELECT * FROM Reservation", nativeQuery = true)
    @Transactional
    public List<Reservation> getAllReservations();

    @Query(value = "UPDATE Reservation SET status = ?1 WHERE reservation_id = ?2", nativeQuery = true)
    @Modifying
    public int updateReservationStatus(String status, int reservation_id);
}
