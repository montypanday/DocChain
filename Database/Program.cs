using Database.Services;
using Model;
using System;
using System.Collections.Generic;

namespace Database
{
    class Program
    {
        static void Main(string[] args)
        {
            ConnectionProvider connection = new ConnectionProvider();

            Console.WriteLine(connection.Get());

            //TrackedFileService fileTracker = new TrackedFileService();

            FileActionService fileActionService = new FileActionService();

            List<FileAction> userActions = fileActionService.GetActionsByUser("test@email.com");
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

            FileAction action = fileActionService.GetCurrentHashes("123", "test-platform");
            Console.WriteLine(action.RowHash + " " + action.FileHash);

            List<FileAction> fileActions = fileActionService.GetActionsByFile("123", "test-platform");
            fileActions.ForEach(a => Console.WriteLine(a.FileHash));
        }
    }
}
