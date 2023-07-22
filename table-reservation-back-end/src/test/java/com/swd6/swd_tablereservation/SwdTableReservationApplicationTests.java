 package com.swd6.swd_tablereservation;

 import com.fasterxml.jackson.core.JsonProcessingException;
 import com.fasterxml.jackson.databind.JsonMappingException;
 import com.fasterxml.jackson.databind.ObjectMapper;
 import com.swd6.swd_tablereservation.controller.AccountController;
 import com.swd6.swd_tablereservation.entity.Dish;
 import com.swd6.swd_tablereservation.entity.Reservation;
 import org.junit.jupiter.api.Assertions;
 import org.junit.jupiter.api.Test;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.boot.json.JsonParseException;
 import org.springframework.boot.test.context.SpringBootTest;
 import org.springframework.http.MediaType;
 import org.springframework.test.web.servlet.MockMvc;

 import com.swd6.swd_tablereservation.entity.Account;
 import org.springframework.test.web.servlet.MvcResult;
 import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
 import org.springframework.test.web.servlet.setup.MockMvcBuilders;
 import org.springframework.web.context.WebApplicationContext;

 import java.io.IOException;
 import java.sql.Date;
 import java.sql.Time;
 import java.util.ArrayList;
 import java.util.List;

 @SpringBootTest
 class SwdTableReservationApplicationTests {


   @Autowired
   private AccountController accountController;
     protected MockMvc mvc;
     @Autowired
     WebApplicationContext webApplicationContext;

     protected void setUp() {
         mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
     }
    protected String mapToJson(Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }
     protected <T> T mapFromJson(String json, Class<T> clazz)
             throws JsonParseException, JsonMappingException, IOException {

         ObjectMapper objectMapper = new ObjectMapper();
         return objectMapper.readValue(json, clazz);
     }
//--------------------------------test Login successfully----------------------------------------------------------------
     @Test
     public void testLoginSuccessfully() throws Exception {
         setUp();
         String[] usernames = {"staff", "customer1","staff_manager"};
         String[] passwords = {"12345", "12345", "12345"};      //right password
         for (int i = 0; i<3; i++) {
             Account account = new Account(usernames[i], passwords[i]);
             String uri = "/login" ;
             MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
                     .contentType(MediaType.APPLICATION_JSON_VALUE).content(mapToJson(account))).andReturn();
             int status = mvcResult.getResponse().getStatus();
             Assertions.assertEquals(200, status);      // expected: 200: OK
             if (status == 200) {
                 String content = mvcResult.getResponse().getContentAsString();
                 Account result = mapFromJson(content, Account.class);
                 Assertions.assertEquals(result.getUsername(), usernames[i]);
             }
         }
     }
     //--------------------------------test Login Failed----------------------------------------------------------------
     @Test
     public void testLoginFail() throws Exception {
         setUp();
         String[] usernames = {"staff", "customer1","staff_manager"};
         String[] passwords = {"wrong password", "wrong password", "wrong password"};      //wrong password
         for (int i = 0; i<3; i++) {
             Account account = new Account(usernames[i], passwords[i]);
             String uri = "/login" ;
             MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
                     .contentType(MediaType.APPLICATION_JSON_VALUE).content(mapToJson(account))).andReturn();
             int status = mvcResult.getResponse().getStatus();
             Assertions.assertEquals(401, status);// expected: 401: UnAuthorized
         }
     }
//-------------------------------Get account data--------------------------------------------------
     @Test
     public void testStatusAccountStaff() throws Exception {
         setUp();
         String[] usernames = {"staff", "Customer1","staff_manager"};
         for (String user: usernames) {
             String uri = "/account/" + user;
             MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                     .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

             int status = mvcResult.getResponse().getStatus();
             Assertions.assertEquals(200, status);
             String content = mvcResult.getResponse().getContentAsString();
             Account account = mapFromJson(content, Account.class);
             Assertions.assertEquals(account.getUsername(), user);
         }
     }
//-----------------------------Test Reservation--------------------------------------------------------------------
     List<Reservation> reservations = new ArrayList<>();
     @Test
     public void testAddReservation() throws Exception {
         setUp();
         Reservation reservation = new Reservation();
        reservation.setUsername("customer11");
        reservation.setStatus("reserved");
        reservation.setNumberOfGuest(15);
        reservation.setCapacityMasterDataId(3);
        reservation.setCreateDate(new Date(2023-06-03));
        reservation.setCheckinDate(new Date(2023-06-10));
        reservation.setCheckinTime(new Time(16,00,00));
         String uri = "/create-reservation";
             MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
                     .contentType(MediaType.APPLICATION_JSON_VALUE).content(mapToJson(reservation))).andReturn();

             int status = mvcResult.getResponse().getStatus();
             Assertions.assertEquals(200, status);
             if (status == 200) {
                 String content = mvcResult.getResponse().getContentAsString();
                 Reservation returnReservation = mapFromJson(content, Reservation.class);
                 if (returnReservation != null && returnReservation.getReservationId() != 0){
                     Assertions.assertEquals("returnReservation","returnReservation");
                 } else Assertions.assertEquals("returnReservation", "null");
                 reservations.add(returnReservation);
                 testDeleteReservation();
             }

     }
//-------------------------------Test Cancel Reservation-----------------------------------------------------------------------------
     @Test
     public void testDeleteReservation() throws Exception {
         String uri = "/";
         for (Reservation reservation :
                 reservations) {
             MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri + reservation.getReservationId() +"/cancel")
                     ).andReturn();
             System.out.println(reservation);
             int status = mvcResult.getResponse().getStatus();
             Assertions.assertEquals(200, status);
         }

     }
 //-------------------------------Test Confirm Reservation-----------------------------------------------------------------------------
     @Test
     public void testConfirmReservation() throws Exception {
         String uri = "/";
         for (Reservation reservation :
                 reservations) {
             MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri + reservation.getReservationId() +"/approve")
             ).andReturn();
             System.out.println(reservation);
             int status = mvcResult.getResponse().getStatus();
             Assertions.assertEquals(200, status);
         }

     }
//--------------------------------get Capacity base on reservation----------------------------------------------------------------------
    @Test
    public void testGetCapacity() throws Exception {
        String uri = "/get-capacity-from-reservation?";
        for (Reservation reservation :
                reservations) {
            uri += "checkinDate=" + reservation.getCheckinDate() + "&checkinTime=" 
            + reservation.getCheckinTime() + "&capacityMasterDataId=" + reservation.getCapacityMasterDataId();        
            MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
            ).andReturn();
            System.out.println(reservation);
            int status = mvcResult.getResponse().getStatus();
            Assertions.assertEquals(200, status);
        }

    }
// -------------------------------------------------------------------------------------------------------------------------------------
     @Test
     public void testViewDishes() throws Exception {
         setUp();
             String uri = "/dishes";
             MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                     .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

             int status = mvcResult.getResponse().getStatus();
             Assertions.assertEquals(200, status);
     }
// -------------------------------------------------------------------------------------------------------------------------------------
     @Test
     public void testViewDServices() throws Exception {
         setUp();
         String uri = "/services";
         MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                 .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

         int status = mvcResult.getResponse().getStatus();
         Assertions.assertEquals(200, status);
     }

 }
