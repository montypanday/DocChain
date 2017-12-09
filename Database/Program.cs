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
            ConnectionProvider conn = new ConnectionProvider();
            if (conn.Open())
            {
                Console.WriteLine("Connected!");
            }

            FileAction fakeAction = new FileAction("00000002", "99999997", "docchain_dev", "cool user", "fun action", DateTime.Now);
            Console.WriteLine(fakeAction.FileID);
            conn.Get().Insert(fakeAction);
            conn.Get().Close();

            FileActionService fileService = new FileActionService();
            SortedList<DateTime, FileAction> actions = fileService.GetUserActions("cool user");
            foreach (KeyValuePair<DateTime, FileAction> action in actions)
            {
                Console.WriteLine(action.Key.ToString() + " " + action.Value.FileID + " " + action.Value.ActionType);
            }
        }
    }
}
