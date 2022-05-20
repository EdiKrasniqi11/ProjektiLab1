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
    public class VendbanimiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public VendbanimiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select * from Vendbanimi";
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
        public JsonResult Post(Vendbanimi vendbanimet)
        {
            string query = @"insert into Vendbanimi values(@Shteti,@Qyteti,@Adresa)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Shteti", vendbanimet.Shteti);
                    myCommand.Parameters.AddWithValue("@Qyteti", vendbanimet.Qyteti);
                    myCommand.Parameters.AddWithValue("@Adresa", vendbanimet.Adresa);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Successful Insertion");
        }

        [HttpPut]
        public JsonResult Put(Vendbanimi vendbanimet)
        {
            string query = @"update Vendbanimi set Shteti= @Shteti, Qyteti = @Qyteti, Adresa=@Adresa where VendbanimiID = @VendbanimiID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@VendbanimiID", vendbanimet.Shteti);
                    myCommand.Parameters.AddWithValue("@Shteti", vendbanimet.Shteti);
                    myCommand.Parameters.AddWithValue("@Qyteti", vendbanimet.Qyteti);
                    myCommand.Parameters.AddWithValue("@Adresa", vendbanimet.Adresa);
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
            string query = @"delete from Vendbanimi where VendbanimiID = @VendbanimiID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@VendbanimiID", id);
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
