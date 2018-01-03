using Dapper;
using Dapper.Contrib.Extensions;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Services
{
    class TrackedFileService
    {
        private ConnectionProvider connection = new ConnectionProvider();

        [Table("trackedfiles")]
        class TrackedFile
        {
            [ExplicitKey]
            public string FileID { get; set; }

            public string Platform { get; set; }

            public TrackedFile(string fileID, string platform)
            {
                this.FileID = fileID;
                this.Platform = platform;
            }
        }

        public bool TrackFile(string fileID, string platform)
        {
            try
            {
                connection.Get().Insert(new TrackedFile(fileID, platform));
                System.Diagnostics.Debug.WriteLine("File with id " + fileID + " is now being tracked");
                return true;
            } catch (MySqlException e)
            {
                if (e.ErrorCode == 1062)
                {
                    System.Diagnostics.Debug.WriteLine("File with id " + fileID + " is already being tracked");
                    return true; //Error 1062 indicates that the file is already tracked
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine(e.Message);
                    return false;
                }
            }
        }

        public bool UntrackFile(string fileID, string platform)
        {
            try
            {
                connection.Get().Delete<TrackedFile>(new TrackedFile(fileID, platform));
                System.Diagnostics.Debug.WriteLine("File with id " + fileID + " is no longer being tracked");
                return true;
            } catch (MySqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
                return false;
            }

        }

        public bool CheckIfTracked(string fileID, string platform)
        {
            try
            {
                TrackedFile file = new TrackedFile(fileID, platform);
                var check = connection.Get().Get<TrackedFile>(file.FileID);

                if (check != null)
                {
                    System.Diagnostics.Debug.WriteLine("File with id " + fileID + " IS being tracked");
                    return true;
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine("File with id " + fileID + " IS NOT being tracked");
                    return false;
                }
            }
            catch (MySqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
                return false;
            }
        }
    }
}
