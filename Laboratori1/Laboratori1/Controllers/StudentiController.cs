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
    public class StudentiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public StudentiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from Studenti";
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
        public JsonResult Post(Studenti studentet)
        {
            string query = @"insert into Studenti values(@Emri,@Email,@Password,CONVERT(DATE,@Datelindja,103),@Gjinia,@Vendbanimi,@Fakulteti,@Dega,@Drejtimi,@Specializimi)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Emri", studentet.Emri);
                    myCommand.Parameters.AddWithValue("@Email", studentet.Email);
                    myCommand.Parameters.AddWithValue("@Password", studentet.Password);
                    myCommand.Parameters.AddWithValue("@Datelindja", studentet.Datelindja);
                    myCommand.Parameters.AddWithValue("@Gjinia", studentet.Gjinia);
                    myCommand.Parameters.AddWithValue("@Vendbanimi", studentet.Vendbanimi);
                    myCommand.Parameters.AddWithValue("@Fakulteti", studentet.Fakulteti);
                    myCommand.Parameters.AddWithValue("@Dega", studentet.Dega);
                    myCommand.Parameters.AddWithValue("@Drejtimi", studentet.Drejtimi);
                    myCommand.Parameters.AddWithValue("@Specializimi", studentet.Specializimi);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Successful Insertion");
        }

        [HttpPut]
        public JsonResult Put(Studenti studentet)
        {
            string query = @"update Studenti set Emri = @Emri, Email = @Email, Password = @Password Datelindja = CONVERT(DATE,@Datelindja,103), Gjinia = @Gjinia, Vendbanimi = @Vendbanimi, Fakulteti = @Fakulteti, Dega = @Dega, Drejtimi = @Drejtimi, Specializimi = @Specializimi where StudentiID = @StudentiID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@StudentiID", studentet.StudentiID);
                    myCommand.Parameters.AddWithValue("@Emri", studentet.Emri);
                    myCommand.Parameters.AddWithValue("@Email", studentet.Email);
                    myCommand.Parameters.AddWithValue("@Password", studentet.Password);
                    myCommand.Parameters.AddWithValue("@Datelindja", studentet.Datelindja);
                    myCommand.Parameters.AddWithValue("@Gjinia", studentet.Gjinia);
                    myCommand.Parameters.AddWithValue("@Vendbanimi", studentet.Vendbanimi);
                    myCommand.Parameters.AddWithValue("@Fakulteti", studentet.Fakulteti);
                    myCommand.Parameters.AddWithValue("@Dega", studentet.Dega);
                    myCommand.Parameters.AddWithValue("@Drejtimi", studentet.Drejtimi);
                    myCommand.Parameters.AddWithValue("@Specializimi", studentet.Specializimi);
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
            string query = @"delete from Studenti where StudentiID = @StudentiID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@StudentiID", id);
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
