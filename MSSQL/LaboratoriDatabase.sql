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
 
 create table Qyteti(
	QytetiID int identity(1,1) primary key,
	Shteti varchar not null,
	Emri varchar(255) not null
)
alter table Qyteti alter column Shteti varchar;

DBCC CHECKIDENT ('Njoftimet', RESEED, 0);
DBCC CHECKIDENT ('Lajmet', RESEED, 0);
DBCC CHECKIDENT ('Shteti', RESEED, 0);
DBCC CHECKIDENT ('Qyteti', RESEED, 0);