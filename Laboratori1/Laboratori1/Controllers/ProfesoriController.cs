using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Laboratori1.Objects;

namespace Laboratori1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesoriController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ProfesoriController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from Profesori";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(Profesori profesoret)
        {
            string query = @"insert into Profesori values(@Emri,
														CONVERT(DATE,@Datelindja,103),
														@Gjinia,
														@GradaAkademike,
														@Drejtimi,
														@NrTelefonit,
														@Email,
                                                        @Password,
														@Vendbanimi
														)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Emri", profesoret.Emri);
                    myCommand.Parameters.AddWithValue("@Datelindja", profesoret.Datelindja);
                    myCommand.Parameters.AddWithValue("@Gjinia", profesoret.Gjinia);
                    myCommand.Parameters.AddWithValue("@GradaAkademike", profesoret.GradaAkademike);
                    myCommand.Parameters.AddWithValue("@Drejtimi", profesoret.Drejtimi);
                    myCommand.Parameters.AddWithValue("@NrTelefonit", profesoret.NrTelefonit);
                    myCommand.Parameters.AddWithValue("@Email", profesoret.Email);
                    myCommand.Parameters.AddWithValue("@Password", profesoret.Password);
                    myCommand.Parameters.AddWithValue("@Vendbanimi", profesoret.Vendbanimi);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Successful Insertion");
        }

        [HttpPut]
        public JsonResult Put(Profesori profesoret)
        {
            string query = @"update Profesori set Emri = @Emri, Datelindja = CONVERT(DATE,@Datelindja,103),
			Gjinia = @Gjinia, GradaAkademike=@GradaAkademike, Drejtimi = @Drejtimi,
			NrTelefonit=@NrTelefonit, Email=@Email, Password=@Password, Vendbanimi = @Vendbanimi  where ProfesoriID = @ProfesoriID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ProfesoriID", profesoret.ProfesoriID);
                    myCommand.Parameters.AddWithValue("@Emri", profesoret.Emri);
                    myCommand.Parameters.AddWithValue("@Datelindja", profesoret.Datelindja);
                    myCommand.Parameters.AddWithValue("@Gjinia", profesoret.Gjinia);
                    myCommand.Parameters.AddWithValue("@GradaAkademike", profesoret.GradaAkademike);
                    myCommand.Parameters.AddWithValue("@Drejtimi", profesoret.Drejtimi);
                    myCommand.Parameters.AddWithValue("@NrTelefonit", profesoret.NrTelefonit);
                    myCommand.Parameters.AddWithValue("@Email", profesoret.Email);
                    myCommand.Parameters.AddWithValue("@Password", profesoret.Password);
                    myCommand.Parameters.AddWithValue("@Vendbanimi", profesoret.Vendbanimi);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Successful Update");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from Profesori where ProfesoriID = @ProfesoriID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ProfesoriID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Successful Deletion");
        }
    }
}
