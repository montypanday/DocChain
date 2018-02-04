using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
namespace Database
{
    public class ConnectionProvider
    {
        //private MySqlConnection connection;
        private SqlConnection connection;

        public ConnectionProvider()
        {
            Initialize();
        }

        private void Initialize()
        {
        //ConnectionStringSettings mySQL = ConfigurationManager.ConnectionStrings["MySQL"];
        ConnectionStringSettings azure = ConfigurationManager.ConnectionStrings["Azure"];
            connection = new SqlConnection(azure.ConnectionString);
            Open();
        }

        public IDbConnection Get()
        {
            return connection;
        }

        private bool Open()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch (SqlException e)
            {
                switch (e.Number)
                {
                    case 0:
                        Console.WriteLine("Cannot connect to server.  Contact administrator");
                        break;

                    case 1045:
                        Console.WriteLine("Invalid username/password, please try again");
                        break;
                }
                return false;
            }
        }

        private bool Close()
        {
            try
            {
                connection.Close();
                return true;
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }


        //Closing the database connection before the object is cleaned up by garbage collection
        ~ConnectionProvider()
        {
            Close();
        }
    }
}
