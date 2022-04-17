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
    public class LajmetController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public LajmetController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from Lajmet";
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
        public JsonResult Post(Lajmet lajmet)
        {
            string query = @"insert into Lajmet values(@Foto, @Titulli, @Pershkrimi)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Foto", lajmet.Foto);
                    myCommand.Parameters.AddWithValue("@Titulli", lajmet.Titulli);
                    myCommand.Parameters.AddWithValue("@Pershkrimi", lajmet.Pershkrimi);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Successful Insertion");
        }
        [HttpPut]
        public JsonResult Put(Lajmet lajmet)
        {
            string query = @"update Lajmet set Foto=@Foto, Titulli = @Titulli, Pershkrimi = @Pershkrimi where LajmiID = @LajmiID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@LajmiID", lajmet.LajmiID);
                    myCommand.Parameters.AddWithValue("@Foto", lajmet.Foto);
                    myCommand.Parameters.AddWithValue("@Titulli", lajmet.Titulli);
                    myCommand.Parameters.AddWithValue("@Pershkrimi", lajmet.Pershkrimi);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Successful Update");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int LajmiID)
        {
            string query = @"delete from Lajmet where LajmiID = @LajmiID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@LajmiID", LajmiID);
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


