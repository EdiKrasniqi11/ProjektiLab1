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
	Shteti int not null foreign key references Shteti(ShtetiID)
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
create table Drejtimi(
	DrejtimiID int identity(1,1) primary key,
	Emri varchar(255) not null,
	Fakulteti int not null foreign key references Fakulteti(FakultetiID)
)
create table Vendbanimi(
	VendbanimiID int identity(1,1) primary key,
	Shteti int not null foreign key references Shteti(ShtetiID),
	Qyteti int foreign key references Qyteti(QytetiID),
	Adresa varchar(255) not null
)


DBCC CHECKIDENT ('Njoftimet', RESEED, 0);
DBCC CHECKIDENT ('Lajmet', RESEED, 0);
DBCC CHECKIDENT ('Shteti', RESEED, 0);
DBCC CHECKIDENT ('Qyteti', RESEED, 0);
DBCC CHECKIDENT ('Fakulteti', RESEED, 0);
DBCC CHECKIDENT ('Dega', RESEED, 0);
DBCC CHECKIDENT ('Drejtimi', RESEED, 0);
DBCC CHECKIDENT ('Vendbanimi', RESEED, 0);
