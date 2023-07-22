DROP DATABASE IF EXISTS TblReservationMgt
CREATE DATABASE TblReservationMgt
GO

USE TblReservationMgt
GO


DROP TABLE IF EXISTS [Account]
CREATE TABLE [Account]
(
	[username] VARCHAR(20) NOT NULL,
	[password] VARCHAR(50) NOT NULL,
	[full_name] NVARCHAR(50),
	[phone] VARCHAR(15),
	[email] VARCHAR(100),
	[role] NVARCHAR(20),
	CONSTRAINT PK_Profile PRIMARY KEY ([username]),
	CONSTRAINT CK_Profile_email CHECK([email] LIKE '%[A-Za-z0-9]@[A-Za-z0-9]%.[A-Za-z0-9]%'),
	CONSTRAINT CK_Profile_phone CHECK([phone] LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' 
			OR phone LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
)
GO

DROP TABLE IF EXISTS [Service]
CREATE TABLE [Service]
(
	[service_id] INT IDENTITY,
	[name] NVARCHAR(250),
	[price] DEC(10,3),
	CONSTRAINT PK_Service PRIMARY KEY ([service_id])
)
GO

DROP TABLE IF EXISTS [Dish]
CREATE TABLE [Dish]
(
	[dish_id] INT IDENTITY,
	[name] NVARCHAR(250),
	[price] DEC(10,3),
	CONSTRAINT PK_Dish PRIMARY KEY ([dish_id])
)
GO

DROP TABLE IF EXISTS [CapacityMasterData]
CREATE TABLE [CapacityMasterData](
	[capacity_master_data_id] INT IDENTITY,
	[venue] nvarchar(50),
	[category] NVARCHAR(50),
	[capacity] INT,
	[image_url] varchar(255),
	CONSTRAINT PK_CapacityMasterData PRIMARY KEY ([capacity_master_data_id])
)
GO

DROP TABLE IF EXISTS [Capacity]
CREATE TABLE [Capacity](
	[capacity_id] BIGINT IDENTITY,
	[capacity_master_data_id] INT,
	[date] DATE,
	[point_of_time] TIME,
	[reserved_capacity] INT,
	CONSTRAINT PK_Capacity PRIMARY KEY ([capacity_id]),
	CONSTRAINT FK_Capacity_CapacityMasterData FOREIGN KEY ([capacity_master_data_id]) REFERENCES [CapacityMasterData]([capacity_master_data_id])
)
GO


DROP TABLE IF EXISTS [Reservation]
CREATE TABLE [Reservation]
(
	[reservation_id] BIGINT IDENTITY,
	[username] VARCHAR(50),
	[capacity_master_data_id] INT,
	[status] NVARCHAR(50),
	[create_date] DATE,
	[checkin_date] DATE,
	[checkin_time] TIME,
	[number_of_guest] INT,
	[service_amount] DECIMAL(10,3) CONSTRAINT DF_Reservation_service_amount DEFAULT 0,
	[dish_amount] DECIMAL(10,3) CONSTRAINT DF_Reservation_dish_amount DEFAULT 0,
	[deposit_amount] DECIMAL(10,3) CONSTRAINT DF_Reservation_deposit_amount DEFAULT 0
	CONSTRAINT PK_Reservation PRIMARY KEY ([reservation_id]),
	CONSTRAINT FK_Reservation_CapacityMasterData FOREIGN KEY ([capacity_master_data_id]) REFERENCES [CapacityMasterData]([capacity_master_data_id])
)
GO

DROP TABLE IF EXISTS [ServiceOrder]
CREATE TABLE [ServiceOrder]
(
	[service_order_id] INT IDENTITY,
	[service_id] INT,
	[reservation_id] BIGINT,
	CONSTRAINT PK_ServiceOrder PRIMARY KEY ([service_order_id]),
	CONSTRAINT FK_ServiceOrder_Service FOREIGN KEY ([service_id]) REFERENCES [Service]([service_id]),
	CONSTRAINT FK_ServiceOrder_Reservation FOREIGN KEY ([reservation_id]) REFERENCES [Reservation]([reservation_id])
)
GO

DROP TABLE IF EXISTS [DishOrder]
CREATE TABLE [DishOrder]
(
	[dish_order_id] INT IDENTITY,
	[dish_id] INT,
	[reservation_id] BIGINT,
	[quantity] INT,
	CONSTRAINT PK_DishOrder PRIMARY KEY ([dish_order_id]),
	CONSTRAINT FK_DishOrder_Dish FOREIGN KEY ([dish_id]) REFERENCES [Dish]([dish_id]),
	CONSTRAINT FK_DishOrder_Reservation FOREIGN KEY ([reservation_id]) REFERENCES [Reservation]([reservation_id])
)
GO

DROP TABLE IF EXISTS ReservationAgent
CREATE TABLE [ReservationAgent]
(
	[reservation_agent_id] BIGINT IDENTITY,
	[username] VARCHAR(20),
	[reservation_id] BIGINT,
	CONSTRAINT PK_ReservationAgent PRIMARY KEY ([reservation_agent_id]),
	CONSTRAINT FK_ReservationAgent_Account FOREIGN KEY ([username]) REFERENCES [Account]([username]),
	CONSTRAINT FK_ReservationAgent_Reservation FOREIGN KEY ([reservation_id]) REFERENCES [Reservation]([reservation_id])
)
GO


INSERT INTO [Account]([username], [password], [role], [full_name], [phone], [email])
VALUES
	('staff_manager', '12345', 'staff', 'Steve Harvey', '0909495353', 'stevehv@gmail.com'),
	('staff', '12345', 'staff', 'Harry Potter', '0914647489', 'harryptr@hotmail.com'), 	
	('customer1', '12345', 'customer', 'Michael Huynh', '0911324578', 'mihuy@fpt.edu'), 
	('customer2', '12345', 'customer','John Smith', '0964784561', 'johns@yahoo.com'),
	('customer3', '12345', 'customer','Steven Cao', '0978654987', 'caosteve@gmail.com'), 
	('customer4', '12345', 'customer','Binz Da Poet', '0909478152', 'binzbinz@gmail.com'),
	('customer5', '12345', 'customer','Mike Tyson', '0912365478', 'miketyson@fpt.edu'), 
	('customer6', '12345', 'customer','Tony Stark', '0947561302', 'ironman@yahoo.com'),
	('customer7', '12345', 'customer','Quang Dang', '0147864123', 'leaderswd@gmail.com'), 
	('customer8', '12345', 'customer','Bruce Lee', '0314789451', 'brucewayne@hotmai.us'),
	('customer9', '12345', 'customer','Steve Job', '0364587495', 'apple@gmail.com'), 
	('customer10', '12345', 'customer','Bill Gates', '0936456123', 'microsoft@yahoo.com')
GO

INSERT INTO [Service]([name], [price])
VALUES
	('Live music', 150),
	('Magic show', 100),
	('Comedy', 120),
	('Ceremony decoration', 40)
GO

INSERT INTO [CapacityMasterData]([venue], [category], [capacity], [image_url])
VALUES
	('Orchid Hall', 'Indoor',80, 'https://www.azcentral.com/gcdn/presto/2018/08/13/PPHX/3e976c76-dde2-4c37-b7c7-a9c0a9c476c6-Unknown-3.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp'),
	('Lotus Hall', 'Indoor',90, 'https://media-cdn.tripadvisor.com/media/photo-s/05/21/04/b1/different-pointe-of-view.jpg'),
	('Cloudy Area', 'Outdoor',50, 'https://img-aws.ehowcdn.com/700x/www.onlyinyourstate.com/wp-content/uploads/2019/01/pointe5.png'),
	('Golden Park Hall', 'Outdoor',45, 'https://lh3.googleusercontent.com/up0JmN3XiJJfBZznUwjFZsc5G1equEKUQ2WusVzHM6-RS7fDKteRCdYTcQc3FCpyVUXuvPeiId73A2X63in-baB7lnC5XNw-j0OoTvM=h450')
GO

INSERT INTO [Capacity]([capacity_master_data_id], [date], [point_of_time], [reserved_capacity])
VALUES
	(1, '2023-06-10', '15:30:00', 30),
	(3, '2023-06-10', '16:00:00', 10),
	(4, '2023-06-11', '11:00:00', 0),
	(2, '2023-06-11', '11:00:00', 8),
	(3, '2023-06-11', '15:30:00', 15),
	(4, '2023-06-12', '16:30:00', 4),
	(1, '2023-06-12', '17:00:00', 22),
	(2, '2023-06-12', '18:30:00', 13)
GO

INSERT INTO [Reservation]([username], [capacity_master_data_id], [status], [number_of_guest], [create_date], [checkin_date], [checkin_time], [service_amount], [dish_amount], [deposit_amount])
VALUES
	('customer1', 1, 'done', 10, '2023-06-03', '2023-06-10', '15:30:00', 150, 0, 0),
	('customer2', 1, 'pending deposit', 20, '2023-06-05', '2023-06-10', '15:30:00', 250, 0, 145),
	('customer3', 3, 'pending processing', 10, '2023-06-03', '2023-06-10', ' 10:30:00', 120, 390.82, 151.082),
	('customer4', 4, 'cancelled', 6, '2023-06-03', '2023-06-11', ' 11:00:00', 0, 0, 0),
	('customer5', 2, 'reserved', 8, '2023-06-03', '2023-06-11', ' 19:30:00', 0, 0, 0),
	('customer6', 3, 'reserved', 15, '2023-06-05', '2023-06-11', ' 15:30:00', 250, 847.05, 259.705),
	('customer7', 4, 'reserved', 4, '2023-06-01', '2023-06-12', ' 16:30:00', 0, 0, 0),
	('customer8', 1, 'pending deposit', 22, '2023-06-03', '2023-06-12', ' 17:00:00', 0, 958.56, 315.856),
	('customer9', 2, 'pending process', 13, '2023-06-02', '2023-06-12', ' 18:30:00', 0, 688.05, 198.805)
GO
	
INSERT INTO [ReservationAgent]([reservation_id], [username])
VALUES
	(1, 'staff_manager'),
	(2, 'staff'),
	(3, 'staff'),
	(6, 'staff_manager'),
	(8, 'staff_manager'),
	(9, 'staff')
GO

INSERT INTO [Dish]([name], [price])
VALUES
	('Mushroom Burger', 10.99),
	('Crispy Fried Chicken', 8.99),
	('Macaroni Soup', 12.00),
	('French Fries', 4.50),
	('Calamari', 10.00),
	('Beef Taco', 10.50),
	('Spaghetti & Meatballs', 16.59),
	('Hotdog Sandwich', 8.99),
	('Chicken Wings', 14.99),
	('Guacamole', 21.99),
	('Golden Shrimp', 20.99),
	('Stuffed Chicken Breast', 14.50),
	('Shrimp Cocktail', 7.98),
	('Pan Fried Salmon', 25.99),
	('Corn Chowder', 12.50),
	('Cream of Broccoli', 13.99),
	('Mashed Potatoes', 8.99),
	('Steamed Rice', 22.99)
GO

INSERT INTO [ServiceOrder]([reservation_id], [service_id])
VALUES
	(1, 1),
	(2, 1),
	(2, 2),
	(3, 3),
	(6, 1),
	(6, 2)
GO

INSERT INTO [DishOrder]([reservation_id], [dish_id], [quantity])
VALUES
	(3, 1, 10),
	(3, 3, 10),
	(3, 4, 10),
	(3, 5, 8),
	(3, 9, 8),
	(6, 4, 15),
	(6, 5, 15),
	(6, 1, 15),
	(6, 8, 15),
	(6, 10, 15),
	(8, 1, 22),
	(8, 5, 20),
	(8, 8, 22),
	(8, 12, 22),
	(9, 3, 13),
	(9, 6, 13),
	(9, 7, 13),
	(9, 9, 12)
GO

