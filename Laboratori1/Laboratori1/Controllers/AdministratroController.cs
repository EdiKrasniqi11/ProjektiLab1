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
    public class AdministratorController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AdministratorController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from Administrator";
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
        public JsonResult Post(Administrator administratoret)
        {
            string query = @"insert into Administrator values(@Emri,@Email,@Password,CONVERT(DATE,@Datelindja,103),@Gjinia,@Vendbanimi)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Emri", administratoret.Emri);
                    myCommand.Parameters.AddWithValue("@Email", administratoret.Email);
                    myCommand.Parameters.AddWithValue("@Password", administratoret.Password);
                    myCommand.Parameters.AddWithValue("@Datelindja", administratoret.Datelindja);
                    myCommand.Parameters.AddWithValue("@Gjinia", administratoret.Gjinia);
                    myCommand.Parameters.AddWithValue("@Vendbanimi", administratoret.Vendbanimi);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Successful Insertion");
        }

        [HttpPut]
        public JsonResult Put(Administrator administratoret)
        {
            string query = @"update Administrator set Emri = @Emri, Email = @Email, Password = @Password, Datelindja = CONVERT(DATE,@Datelindja,103), Gjinia = @Gjinia, Vendbanimi = @Vendbanimi where AdminID = @AdminID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AdminID", administratoret.AdminID);
                    myCommand.Parameters.AddWithValue("@Emri", administratoret.Emri);
                    myCommand.Parameters.AddWithValue("@Email", administratoret.Email);
                    myCommand.Parameters.AddWithValue("@Password", administratoret.Password);
                    myCommand.Parameters.AddWithValue("@Datelindja", administratoret.Datelindja);
                    myCommand.Parameters.AddWithValue("@Gjinia", administratoret.Gjinia);
                    myCommand.Parameters.AddWithValue("@Vendbanimi", administratoret.Vendbanimi);
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
            string query = @"delete from Administrator where AdminID = @AdminID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AdminID", id);
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
