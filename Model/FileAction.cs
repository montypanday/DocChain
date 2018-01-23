using Newtonsoft.Json.Linq;
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
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public DateTime ActionTime { get; set; }
        public string ActionType { get; set; }

        public FileAction(string id, string fileHash, string storagePlatform, string userName, string userEmail, string actionType, DateTime actionTime)
        {
            this.FileID = id;
            this.FileHash = fileHash;
            this.StoragePlatform = storagePlatform;
            this.UserName = userName;
            this.UserEmail = userEmail;
            this.ActionType = actionType;
            this.ActionTime = actionTime;
        }

        public FileAction()
        {

        }

        public FileAction(JObject json)
        {
            //JObject jObject = JObject.Parse(json);
            JToken jFileAction = json["FileAction"];
            FileID = (string)jFileAction["FileID"];
            FileHash = (string)jFileAction["FileHash"];
            StoragePlatform = (string)jFileAction["StoragePlatform"];
            UserName = (string)jFileAction["UserName"];
            UserEmail = (string)jFileAction["UserEmail"];
            ActionTime = DateTime.Now;
            ActionType = (string)jFileAction["ActionType"];
        }
    }
}
