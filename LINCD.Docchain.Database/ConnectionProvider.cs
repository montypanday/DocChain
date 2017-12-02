using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace LINCD.Docchain.Database
{
    public class ConnectionProvider
    {
        private MySqlConnection connection;

        public ConnectionProvider()
        {
            Initialize();
        }

        private void Initialize()
        {
            MySqlConnectionStringBuilder connectionString = new MySqlConnectionStringBuilder();
            connectionString.Server = "localhost";
            connectionString.Database = "docchain";
            connectionString.UserID = "root";
            connectionString.Password = "Lincd";
            connection = new MySqlConnection(connectionString.ToString());
        }

        public IDbConnection GetDbConnection()
        {
            return connection;
        }

        public bool OpenConnection()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch (MySqlException e)
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
    }
}
