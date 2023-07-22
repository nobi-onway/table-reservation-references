package com.swd6.swd_tablereservation;

public final class RESERVATION_STATUS {
    public static final String DONE = "done";
    public static final String RESERVED = "reserved";
    public static final String PENDING_PROCESS = "pending process";
    public static final String PENDING_DEPOSIT = "pending deposit";
    public static final String CANCELLED = "cancelled";
}
/*
 * status:
 * done - đã diễn ra xong
 * reserved - đã đặt thành công, chờ diễn ra
 * pending process - đã được ghi nhận, chờ xử lý
 * pending deposit - đã được xử lý, chờ đặt cọc
 * cancelled - đã hủy
 */