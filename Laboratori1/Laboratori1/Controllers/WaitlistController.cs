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
    public class WaitlistController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public WaitlistController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from Waitlist";
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
        public JsonResult Post(Waitlist waitlista)
        {
            string query = @"insert into Waitlist values(@Emri,@Email,@Password,CONVERT(DATE,@Datelindja,103),@Gjinia,@Vendbanimi,@Fakulteti,@Dega,@Drejtimi,@Specializimi)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Emri", waitlista.Emri);
                    myCommand.Parameters.AddWithValue("@Email", waitlista.Email);
                    myCommand.Parameters.AddWithValue("@Password", waitlista.Password);
                    myCommand.Parameters.AddWithValue("@Datelindja", waitlista.Datelindja);
                    myCommand.Parameters.AddWithValue("@Gjinia", waitlista.Gjinia);
                    myCommand.Parameters.AddWithValue("@Vendbanimi", waitlista.Vendbanimi);
                    myCommand.Parameters.AddWithValue("@Fakulteti", waitlista.Fakulteti);
                    myCommand.Parameters.AddWithValue("@Dega", waitlista.Dega);
                    myCommand.Parameters.AddWithValue("@Drejtimi", waitlista.Drejtimi);
                    myCommand.Parameters.AddWithValue("@Specializimi", waitlista.Specializimi);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Successful Insertion");
        }

        [HttpPut]
        public JsonResult Put(Waitlist waitlista)
        {
            string query = @"update Waitlist set Emri = @Emri, Email = @Email, Password = @Password, Datelindja = CONVERT(DATE,@Datelindja,103), Gjinia = @Gjinia, Vendbanimi = @Vendbanimi, Fakulteti = @Fakulteti, Dega = @Dega, Drejtimi = @Drejtimi, Specializimi = @Specializimi where StudentiID = @StudentiID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@StudentiID", waitlista.StudentiID);
                    myCommand.Parameters.AddWithValue("@Emri", waitlista.Emri);
                    myCommand.Parameters.AddWithValue("@Email", waitlista.Email);
                    myCommand.Parameters.AddWithValue("@Password", waitlista.Password);
                    myCommand.Parameters.AddWithValue("@Datelindja", waitlista.Datelindja);
                    myCommand.Parameters.AddWithValue("@Gjinia", waitlista.Gjinia);
                    myCommand.Parameters.AddWithValue("@Vendbanimi", waitlista.Vendbanimi);
                    myCommand.Parameters.AddWithValue("@Fakulteti", waitlista.Fakulteti);
                    myCommand.Parameters.AddWithValue("@Dega", waitlista.Dega);
                    myCommand.Parameters.AddWithValue("@Drejtimi", waitlista.Drejtimi);
                    myCommand.Parameters.AddWithValue("@Specializimi", waitlista.Specializimi);
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
            string query = @"delete from Waitlist where StudentiID = @StudentiID";
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
