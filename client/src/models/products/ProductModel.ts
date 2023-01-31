import { BaseModel } from "../core/BaseModel";
export interface Product extends BaseModel {
  name: string;
  description: string;
  date: string;
}
