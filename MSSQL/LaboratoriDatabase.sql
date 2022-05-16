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
	Emri varchar(255) not null,
	Shteti varchar(255) not null
)
create table Fakulteti(
	FakultetiID int identity(1,1) primary key,
	Emri varchar(255) not null,
	Shteti int not null foreign key references Shteti(ShtetiID)
)

create table Dega(
	DegaID int identity(1,1) primary key,
	Qyteti int foreign key references Qyteti(QytetiID),
	Fakulteti int foreign key references Fakulteti(FakultetiID)
)

DBCC CHECKIDENT ('Njoftimet', RESEED, 0);
DBCC CHECKIDENT ('Lajmet', RESEED, 0);
DBCC CHECKIDENT ('Shteti', RESEED, 0);
DBCC CHECKIDENT ('Qyteti', RESEED, 0);
DBCC CHECKIDENT ('Fakulteti', RESEED, 0);
DBCC CHECKIDENT ('Dega', RESEED, 0);