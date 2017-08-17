
import { BaseModel } from "./baseModel";
export class File extends BaseModel {
    file_version: object;// this is actually a file_version type object, to be changed later.
    sequence_id: string;
    etag: string;
    sha1: string;
    name: string;
    description: string;
    size: number;// it is integer,check later
    path_collection: object;//The path of folders to this item, starting at the root
    created_at: Date;
    modified_at: Date;
    trashed_at: Date;
    purged_at: Date;
    content_created_at: Date;
    content_modified_at: Date;
    created_by: object;// mini user object
    modified_by: object; // mini user object
    owned_by: object;//mini user object
    shared_link: object;// shared link object
    parent: object; //mini folder object
    item_status: string;
    version_number: string;
    comment_count: string;
    permissions: object;
    tags: Array<string>;
    lock: object;
    extension: string;
    is_package: boolean;
    expiring_embed_link: string;
    watermark_info: object
    allowed_invitee_roles: Array<string>;
    is_externally_owned: boolean;
    has_collaborations: boolean;
}

