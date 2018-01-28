using Database.Services;
using Model;
using System;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;
using System.Linq;

namespace Database
{
    class Program
    {
        static void Main(string[] args)
        {
            ConnectionProvider connection = new ConnectionProvider();

            TrackedFileService fileTracker = new TrackedFileService();

            FileActionService fileActionService = new FileActionService();

            List<FileAction> userActions = fileActionService.GetActionsByUser("smmath@deakin.edu.au");
            userActions.ForEach(a => Console.WriteLine(a.ActionTime + " " + a.UserName + " " + a.ActionType + " " + a.FileID + " "));

            FileAction testAction = new FileAction(
                "1382872324890",
                "256bit hexadecimal number",
                "testPlatform",
                "testUser",
                "test@email.com",
                "test",
                DateTime.Now);

            string hash = fileActionService.RecordFileAction(testAction);
            Console.WriteLine(hash);

            FileAction action = fileActionService.GetCurrentHashes("333", "TestPlatform");
            Console.WriteLine(action.RowHash + " " + action.FileHash);

            //List<FileAction> fileActions = fileActionService.GetActionsByFile("263262238234", "Box");
            //fileActions.ForEach(a => Console.WriteLine(a.FileHash));
        }
    }
}
