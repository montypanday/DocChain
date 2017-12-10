using Database.Services;
using Model;
using System;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;

namespace Database
{
    class Program
    {
        static void Main(string[] args)
        {
            ConnectionProvider connection = new ConnectionProvider();
            if (connection.Open())
            {
                Console.WriteLine("Connected");

                FileAction fakeAction = new FileAction("00000002", "99999997", "docchain_dev", "cool user", "fun action", DateTime.Now);
                connection.Get().Insert(fakeAction);
                connection.Get().Close();

                FileActionService fileService = new FileActionService();
                SortedList<DateTime, FileAction> actions = fileService.GetUserActions("cool user");
                foreach (KeyValuePair<DateTime, FileAction> action in actions)
                {
                    Console.WriteLine(action.Key.ToString() + " " + action.Value.FileID + " " + action.Value.ActionType);
                }

            } else
            {
                Console.WriteLine("No good");
            }


        }
    }
}
