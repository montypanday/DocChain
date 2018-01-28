using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class DocchainHashSet
    {
        public string FileHash { get; set; }
        public string RowHash  { get; set; }

        public DocchainHashSet(string fileHash, string rowHash)
        {
            this.FileHash = fileHash;
            this.RowHash = rowHash;
        }

        public DocchainHashSet()
        {

        }
    }
}
