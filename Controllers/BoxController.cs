using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Box.V2;
using Box.V2.Auth;
using Box.V2.Config;
using Box.V2.Models;
using front_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace front_end.Controllers
{
    [Route("api/[controller]")]
    public class BoxController : Controller
    {
        public IConfiguration Configuration { get; set; }

        public BoxController(IConfiguration config)
        {
            Configuration = config;
        }

        [Route("GetRoot")]
        [HttpGet]
        public async Task<JsonResult> GetRoot()
        {
            var client = Initialise();
            return await GetBoxFolderItems(client, "0");
        }

        [Route("GetPreview/{id}")]
        [HttpGet]
        public async Task<string> GetPreview(string id)
        {
            var client = Initialise();
            return (await client.FilesManager.GetPreviewLinkAsync(id)).ToString();
        }

        //public async Boolean Rename(string ID)
        //{

        //}

        //public async Boolean Delete(string ID)
        //{

        //}

        //public async JsonResult Share(string ID)
        //{

        //}

        //public async string GetDownloadLink(string ID)
        //{


        //}

        private BoxClient Initialise()
        {
            string cookie = Request.Cookies["boxCred"];
            return GetClient(cookie);
        }

        /// <summary>
        /// GetClient returns BoxClient initialising it with credentials.
        /// </summary>
        /// <param name="Cookie"></param>
        /// <returns></returns>
        private BoxClient GetClient(string Cookie)
        {
            OAuthSession oAuth = JsonConvert.DeserializeObject<OAuthSession>(Cookie);
            BoxClient client = new BoxClient(new BoxConfig(Configuration["BoxClientId"], Configuration["BoxClientSecret"], new Uri(Configuration["BoxRedirectURL"])), oAuth);
            return client;
        }

        /// <summary>
        /// GetBoxFolderItems is used to get Box Folder items using FolderManager.GetFolderItemsAsync.
        /// </summary>
        /// <param name="client"> Client that need the folder items.</param>
        /// <param name="ID"> ID of folder.</param>
        /// <returns></returns>
        private async Task<JsonResult> GetBoxFolderItems(BoxClient client, string ID)
        {
            var items = await client.FoldersManager.GetFolderItemsAsync(ID, 100000, 0,
                new List<string>()
                {
                    // specify the fields you want to receive.
                    // Large Number of fields have performance implications.
                    BoxFolder.FieldName,
                    BoxFile.FieldName,
                    BoxFolder.FieldSize,
                    BoxFile.FieldSize,
                    BoxFolder.FieldModifiedAt,
                    BoxFile.FieldModifiedAt

                    //BoxFolder.FieldCreatedAt,
                    //BoxFolder.FieldCreatedBy,
                    //BoxFolder.FieldOwnedBy,
                    //BoxFolder.FieldPathCollection,
                    //BoxFolder.FieldSharedLink,
                    //BoxFile.FieldExtension,
                    //BoxFile.FieldExpiringEmbedLink,
                    //BoxFile.FieldPathCollection,
                    //BoxFile.FieldSha1,
                    //BoxFile.FieldSharedLink,
                });
            Content[] list = new Content[items.TotalCount];
            for (int i = 0; i < items.TotalCount; i++)
            {
                if (items.Entries[i].Type == "file")
                {
                    BoxFile boxFile = (BoxFile)items.Entries[i];
                    list[i] = GetCustomFileObject(boxFile);
                    continue;
                }
                if (items.Entries[i].Type == "folder")
                {
                    BoxFolder boxFolder = (BoxFolder)items.Entries[i];
                    list[i] = GetCustomFolderObject(boxFolder);
                }
            }
            return Json(list);
        }

        /// <summary>
        /// GetCustomFileObject returns custom content from BoxFile Object.
        /// </summary>
        /// <param name="boxFile"></param>
        /// <returns></returns>
        private Content GetCustomFileObject(BoxFile boxFile)
        {
            Content cont = new Content();
            cont.Type = boxFile.Type;
            cont.Id = boxFile.Id;
            cont.FileName = boxFile.Name;
            cont.Size = boxFile.Size.ToString();
            //cont.Hash = boxFile.Sha1;
            cont.LastModified = boxFile.ModifiedAt.ToString();
            //cont.embedLink = boxFile.ExpiringEmbedLink.Url.ToString();
            //cont.DownloadUrl = downloadlink.ToString();
            return cont;
        }

        /// <summary>
        /// GetCustomFolder returns Content from BoxFolder object.
        /// </summary>
        /// <param name="boxFolder"></param>
        /// <returns></returns>
        private Content GetCustomFolderObject(BoxFolder boxFolder)
        {
            Content cont = new Content();
            cont.Type = boxFolder.Type;
            cont.Id = boxFolder.Id;
            cont.FileName = boxFolder.Name;
            cont.Size = boxFolder.Size.ToString();
            cont.LastModified = boxFolder.ModifiedAt.ToString();
            return cont;
        }
    }
}
