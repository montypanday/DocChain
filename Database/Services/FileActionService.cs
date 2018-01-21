using Model;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;
using Dapper;
using MySql.Data.MySqlClient;
using System.Linq;

namespace Database.Services
{
    public class FileActionService
    {
        private ConnectionProvider connection = new ConnectionProvider();

        public string RecordFileAction(FileAction action)
        {
            try
            {
                //connection.Get().Insert(action);
                string sql = "usp_record_action_return_hash";
                string hash = connection.Get().Query<string>(sql, new
                {
                    ActionTime = action.ActionTime,
                    FileID = action.FileID,
                    StoragePlatform = action.StoragePlatform,
                    ActionType = action.ActionType,
                    UserName = action.UserName,
                    UserEmail = action.UserEmail,
                    FileHash = action.FileHash
                }, commandType: System.Data.CommandType.StoredProcedure)
                .First();
                System.Diagnostics.Debug.WriteLine(action.ActionType + " action successfully tracked");
                return hash;
            }
            catch (MySqlException e)
            {
                throw e;
            }
        }

        public List<FileAction> GetActionsByUser(string email)
        {
            List<FileAction> actions = new List<FileAction>();
            try
            {
                string sql = "SELECT * " +
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
                string sql = "SELECT * " +
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

        public DocchainResult GetCurrentHashes(string fileID, string platform)
        {
            DocchainResult result = new DocchainResult();
            try
            {
                string sql = "SELECT " +
                    "FileHash, " +
                    "MD5(concat(ActionTime, FileID, StoragePlatform, ActionType, UserName, UserEmail, FileHash)) AS RowHash " +
                    "FROM fileactions " +
                    "WHERE ActionTime = " +
                    "(SELECT MAX(ActionTime) " +
                    "FROM fileactions " +
                    "WHERE FileID = @FileID " +
                    "AND StoragePlatform = @Platform);";
                result = connection.Get().Query<DocchainResult>(sql, new { FileID = fileID, Platform = platform }).First();
            } catch (MySqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
            return result;
        }
    }
}
