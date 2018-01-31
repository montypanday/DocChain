using Model;
using System.Collections.Generic;
using Dapper;
using System.Data.SqlClient;
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
                .First().ToString();
                //string hashString = System.Text.Encoding.Default.GetString(hash);
                System.Diagnostics.Debug.WriteLine(action.ActionType + " action successfully tracked");
                return hash;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }

        public List<FileAction> GetActionsByUser(string email)
        {
            List<FileAction> actions = new List<FileAction>();
            try
            {
                string sql = "SELECT *, " +
                    "sys.fn_sqlvarbasetostr(HASHBYTES('MD5', CONCAT(ActionTime, FileID, StoragePlatform, ActionType, UserName, UserEmail, FileHash))) AS RowHash " +
                    "FROM fileactions " +
                    "WHERE UserEmail = @UserEmail " +
                    "ORDER BY ActionTime DESC";
                 actions = connection.Get().Query<FileAction>(sql, new { UserEmail = email}).AsList<FileAction>();
            }
            catch (SqlException e)
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
                string sql = "SELECT *, " +
                    "sys.fn_sqlvarbasetostr(HASHBYTES('MD5', CONCAT(ActionTime, FileID, StoragePlatform, ActionType, UserName, UserEmail, FileHash))) AS RowHash " +
                    "FROM fileactions " +
                    "WHERE FileID = @FileID AND StoragePlatform = @Platform " +
                    "ORDER BY ActionTime DESC";
                actions = connection.Get().Query<FileAction>(sql, new { FileID = fileID, Platform = platform }).AsList<FileAction>();
            }
            catch (SqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
            return actions;
        }

        public FileAction GetCurrentHashes(string fileID, string platform)
        {
            FileAction result = new FileAction();
            try
            {
                string sql = "SELECT *, " +
                    "sys.fn_sqlvarbasetostr(HASHBYTES('MD5', CONCAT(ActionTime, FileID, StoragePlatform, ActionType, UserName, UserEmail, FileHash))) AS RowHash " +
                    "FROM fileactions " +
                    "WHERE ActionTime = " +
                    "(SELECT MAX(ActionTime) " +
                    "FROM fileactions " +
                    "WHERE FileID = @FileID " +
                    "AND StoragePlatform = @Platform);";
                result = connection.Get().Query<FileAction>(sql, new { FileID = fileID, Platform = platform }).First();
            } catch (SqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
            return result;
        }
    }
}
