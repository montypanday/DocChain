using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class FileAction
    {
        public string FileID { get; set; }
        public string FileHash { get; set; }
        public string StoragePlatform { get; set; }
        public string UserID { get; set; }
        public DateTime ActionTime { get; set; }
        public string ActionType { get; set; }

        public FileAction(string id, string fileHash, string storagePlatform, string userID, string actionType, DateTime actionTime)
        {
            this.FileID = id;
            this.FileHash = fileHash;
            this.StoragePlatform = storagePlatform;
            this.UserID = userID;
            this.ActionType = actionType;
            this.ActionTime = actionTime;
        }

        public FileAction()
        {

        }
    }
}
