using Model;
using System;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;
using Dapper;

namespace Database.Services
{
    public class FileActionService
    {
        private ConnectionProvider connection = new ConnectionProvider();

        public void RecordFileAction(FileAction action)
        {
            connection.Open();
            connection.Get().Insert(action);
            connection.Get().Close();
        }

        public SortedList<DateTime, FileAction> GetUserActions(string userID)
        {
            SortedList<DateTime, FileAction> sortedActions = new SortedList<DateTime, FileAction>();

            string sql = "SELECT * FROM fileactions WHERE userid = @UserID";

            connection.Open();
            var actions = connection.Get().Query<FileAction>(sql, new { UserID = userID }).AsList<FileAction>();

            actions.ForEach(action => sortedActions.Add(action.ActionTime, action));

            return sortedActions;
        }
    }
}
