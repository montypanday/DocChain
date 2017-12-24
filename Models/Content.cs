using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace front_end.Models
{
    public class Content
    {
        public Content()
        {

        }
        public Content(string type, string id, string fileName, string size, string hash, string modifiedat,string embedlink, string downloadlink)
        {
            this.Type = type;
            this.Id = id;
            this.FileName = fileName;
            this.Size = size;
            this.Hash = hash;
            this.LastModified = modifiedat;
            this.EmbedLink = embedlink;
            this.DownloadUrl = downloadlink;


        }
        public string Type { get; set; }
        // in Google, type is called kind and is always drive#file.
        public string Id { get; set; }
        // this is unique to a file.

        public string FileName { get; set; }
        // Box calls it name, Drive calls it title.
        // This title will be displayed.

        public string Size { get; set; }

        public string Hash { get; set; }
        // Box calls it sha1, Drive calls it md5Checksum.
        // Box uses sha1 and Drive uses MD5
        // To be checked if works fine when using with blockchain.


        public string LastModified { get; set; }
        // both uses datetime object
        // Drive uses RFC 3339 timestamp
        // To be verified for Box.
        // Box calls it modified_at, Drive calls it modifiedByMeDate

        public string EmbedLink { get; set; }
        //This link can be used to embed the file in a iframe.
        //Search for the iframe tag, iframe tag can also be used inside a bootstrap modal, search for examples
        //Called expiring_embed_link in box and embedLink in Drive.

        public string DownloadUrl { get; set; }





    }
}
