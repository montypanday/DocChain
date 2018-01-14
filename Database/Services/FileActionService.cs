using Model;
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

        public List<FileAction> GetActionsByUser(string email)
        {
            List<FileAction> actions = new List<FileAction>();
            try
            {
                string sql = "SELECT *, " +
                    "MD5(concat(ActionTime, FileID, StoragePlatform, ActionType, UserName, UserEmail, FileHash)) AS RowHash " +
                    "FROM fileactions " +
                    "WHERE UserEmail = @UserEmail " +
                    "ORDER BY ActionTime DESC";
                 actions = connection.Get().Query<FileAction>(sql, new { UserEmail = email}).AsList<FileAction>();
            }
            catch (MySqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
            return actions;
        }

        public List<FileAction> GetActionsByFile(string fileID, string platform)
        {
            List<FileAction> actions = new List<FileAction>();
            try
            {
                string sql = "SELECT *," +
                    "MD5(concat(ActionTime, FileID, StoragePlatform, ActionType, UserName, UserEmail, FileHash)) AS RowHash " +
                    "FROM fileactions " +
                    "WHERE FileID = @FileID AND StoragePlatform = @Platform " +
                    "ORDER BY ActionTime DESC";
                actions = connection.Get().Query<FileAction>(sql, new { FileID = fileID, Platform = platform }).AsList<FileAction>();
            }
            catch (MySqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
            return actions;
        }
    }
}
