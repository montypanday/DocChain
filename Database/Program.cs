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

                FileAction fakeAction = new FileAction("00000003", "99999996", "docchain_dev", "cool user", "fun action", DateTime.Now);

                FileActionService fileService = new FileActionService();
                //fileService.RecordFileAction(fakeAction);

                SortedList<DateTime, FileAction> actions = fileService.GetUserActions("cool user");
                foreach (KeyValuePair<DateTime, FileAction> action in actions)
                {
                    Console.WriteLine(action.Key.ToString() + " " + action.Value.FileID + " " + action.Value.ActionType);
                }

                //string json = "{\"fileAction\" : {FileID: \"11111111\", FileHash: \"256bit hexadecimal number\",StoragePlatform: \"Docchain Development\",UserID: \"22222222\",ActionType: \"Test Action\"}}";
                //FileAction jsonAction = new FileAction(json);
                //fileService.RecordFileAction(jsonAction);

            } else

                {
                    Console.WriteLine("No good");
                }
        }
    }
}
