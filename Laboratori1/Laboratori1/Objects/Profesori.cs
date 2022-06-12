using System;
using System.Collections.Generic;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Laboratori1.Objects
{
    public class Profesori
    {
        public int ProfesoriID
        {
            get;
            set;
        }
        public string Emri
        {
            get;
            set;
        }
        
        public string Datelindja
        {
            get;
            set;
        }
        public char Gjinia
        {
            get;
            set;
        }
        public string GradaAkademike
        {
            get;
            set;
        }
        public int Drejtimi
        {
            get;
            set;
        }
        [DataType(DataType.PhoneNumber)]
        public string NrTelefonit
        {
            get;
            set;
        }
        public string Email
        {
            get;
            set;
        }
        public int Vendbanimi
        {
            get;
            set;
        }

    }
}
