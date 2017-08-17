import { BaseModel } from "./baseModel";
export class MiniFile extends BaseModel {
    sequence_id: string;
    etag: string;
    name: string;
}