using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class DocchainResult
    {
        public string FileHash { get; set; }
        public string RowHash  { get; set; }
        public bool Embedded   { get; set; }

        public DocchainResult(string fileHash, string rowHash)
        {
            this.FileHash = fileHash;
            this.RowHash = rowHash;
            this.Embedded = false;
        }

        public DocchainResult()
        {

        }
    }
}
