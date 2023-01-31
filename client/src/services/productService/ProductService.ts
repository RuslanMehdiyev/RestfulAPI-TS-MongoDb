import { Product } from "../../models/products/ProductModel";
import { BaseService } from "../baseService/BaseService";

export class ProductService extends BaseService<Product> {
  constructor() {
    super("/");
  }
}
