using Model;
using System;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;
using Dapper;
using MySql.Data.MySqlClient;

namespace Database.Services
{
    public class FileActionService
    {
        private ConnectionProvider connection = new ConnectionProvider();

        public void RecordFileAction(FileAction action)
        {
            try
            {
                connection.Open();
                connection.Get().Insert(action);
                connection.Get().Close();
            }
            catch (MySqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
        }

        public void RecordFileAction(FileAction[] actions)
        {
            try
            {
                connection.Open();
                connection.Get().Insert(actions);
                connection.Get().Close();
            }
            catch (MySqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
        }

        public SortedList<DateTime, FileAction> GetUserActions(string userID)
        {
            SortedList<DateTime, FileAction> sortedActions = new SortedList<DateTime, FileAction>();

            try
            {
                connection.Open();
                string sql = "SELECT * FROM fileactions WHERE userid = @UserID";
                var actions = connection.Get().Query<FileAction>(sql, new { UserID = userID }).AsList<FileAction>();
                actions.ForEach(action => sortedActions.Add(action.ActionTime, action));
            }
            catch (MySqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }

            connection.Get().Close();
            return sortedActions;
        }
    }
}
