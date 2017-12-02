using System;

namespace LINCD.Docchain.Database
{
    class Program
    {
        static void Main(string[] args)
        {
            ConnectionProvider conn = new ConnectionProvider();
            if (conn.OpenConnection())
            {
                Console.WriteLine("Connected!");
            }

        }
    }
}
