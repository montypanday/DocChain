using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class ValidatedFileAction : FileAction
    {
        public bool isValid { get; set; }

        public ValidatedFileAction()
        {

        }

        public ValidatedFileAction(FileAction action)
            : base(action.FileID, action.FileHash, action.StoragePlatform, action.UserName, action.UserEmail, action.ActionType, action.ActionTime, action.RowHash)
        {
            this.isValid = false;
        }
    }
}
