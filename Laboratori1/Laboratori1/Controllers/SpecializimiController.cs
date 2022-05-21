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
    public class SpecializimiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public SpecializimiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select * from Specializimi";
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
        public JsonResult Post(Specializimi specializimet)
        {
            string query = @"insert into Specializimi values(@Fakulteti,@Drejtimi,@EmriSpecializimit)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Fakulteti", specializimet.Fakulteti);
                    myCommand.Parameters.AddWithValue("@Drejtimi", specializimet.Drejtimi);
                    myCommand.Parameters.AddWithValue("@EmriSpecializimit", specializimet.EmriSpecializimit);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Successful Insertion");
        }

        [HttpPut]
        public JsonResult Put(Specializimi specializimet)
        {
            string query = @"update Specializimi set Fakulteti = @Fakulteti, Drejtimi = @Drejtimi , EmriSpecializimit=@EmriSpecializimit where SpecializimiID = @SpecializimiID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@SpecializimiID", specializimet.SpecializimiID);
                    myCommand.Parameters.AddWithValue("@Fakulteti", specializimet.Fakulteti);
                    myCommand.Parameters.AddWithValue("@Drejtimi", specializimet.Drejtimi);
                    myCommand.Parameters.AddWithValue("@EmriSpecializimit", specializimet.EmriSpecializimit);
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
            string query = @"delete from Specializimi where SpecializimiID = @SpecializimiID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SMISAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@SpecializimiID", id);
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
