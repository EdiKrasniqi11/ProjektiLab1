create database Laboratori1

use Laboratori1

create table Njoftimet(
	NjoftimiID int identity(1,1) primary key,
	Titulli varchar(50) not null,
	Pershkrimi varchar(255) not null
)

create table Lajmet(
	LajmiID int identity(1,1) primary key,
	Titulli varchar(50) not null,
	Pershkrimi varchar(255) not null,
	Foto varchar(255) not null
)

create table Shteti(
	ShtetiID int identity(1,1) primary key,
	Emri varchar(20) not null
)

<<<<<<< HEAD
DBCC CHECKIDENT ('Njoftimet', RESEED, 0);
DBCC CHECKIDENT ('Lajmet', RESEED, 0);
DBCC CHECKIDENT ('Shteti', RESEED, 0);
=======
insert into Shteti(ShtetiID,Emri) values(1,'Kosova');


SET IDENTITY_INSERT Lajmet ON;  

insert into Lajmet(LajmiID,Titulli,Pershkrimi,Foto) values(1,'Lajmi1','Lajmi','anonymous.png');
>>>>>>> 123e493c368cbe69536913b0132d9f64aea9d8ed
