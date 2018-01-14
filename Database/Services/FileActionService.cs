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
                connection.Get().Insert(action);
                System.Diagnostics.Debug.WriteLine(action.ActionType + " action successfully tracked");
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
                connection.Get().Insert(actions);
                System.Diagnostics.Debug.WriteLine("actions successfully tracked");
            }
            catch (MySqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
        }

        public SortedList<DateTime, FileAction> GetUserActions(string email)
        {
            SortedList<DateTime, FileAction> sortedActions = new SortedList<DateTime, FileAction>();

            try
            {
                string sql = "SELECT * FROM fileactions WHERE userid = @UserEmail";
                var actions = connection.Get().Query<FileAction>(sql, new { UserEmail = email}).AsList<FileAction>();
                actions.ForEach(action => sortedActions.Add(action.ActionTime, action));
            }
            catch (MySqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
            return sortedActions;
        }
    }
}
