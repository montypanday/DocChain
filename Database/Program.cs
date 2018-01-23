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

            TrackedFileService fileTracker = new TrackedFileService();

            FileActionService fileActionService = new FileActionService();

            List<FileAction> userActions = fileActionService.GetActionsByUser("smmath@deakin.edu.au");
            userActions.ForEach(a => Console.WriteLine(a.ActionTime + " " + a.UserName + " " + a.ActionType + " " + a.FileID + " "));

            List<FileAction> fileActions = fileActionService.GetActionsByFile("263262238234", "Box");
            fileActions.ForEach(a => Console.WriteLine(a.FileHash));
        }
    }
}
