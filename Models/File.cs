using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace front_end.Models
{
    public class File
    {
        public File(string type, string id, string fileName)
        {
            this.type = type;
            this.id = id;
            this.fileName = fileName;
            
        }
        public string type { get; set; }
        // in Google, type is called kind and is always drive#file.
        public string id { get; set; }
        // this is unique to a file.

        public string fileName { get; set; }
        // Box calls it name, Drive calls it title.
        // This title will be displayed.

        public string size { get; set; }

        public string hash { get; set; }
        // Box calls it sha1, Drive calls it md5Checksum.
        // Box uses sha1 and Drive uses MD5
        // To be checked if works fine when using with blockchain.

        
        public string lastModified { get; set; }
        // both uses datetime object
        // Drive uses RFC 3339 timestamp
        // To be verified for Box.
        // Box calls it modified_at, Drive calls it modifiedByMeDate

        public string extension { get; set; }
        // Box calls it extension, Drive calls it fileExtension.
        // can be used to decide an icon to display on screen along with file.

        public string embedLink { get; set; }
        //This link can be used to embed the file in a iframe.
        //Search for the iframe tag, iframe tag can also be used inside a bootstrap modal, search for examples
        //Called expiring_embed_link in box and embedLink in Drive.






    }
}
