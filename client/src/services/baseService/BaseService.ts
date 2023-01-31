import { customApiInstance } from "./../network/baseNetwork";
import { ResponseModel } from "../../models/core/ResponseModel";

export class BaseService<T> {
  private endPoint = "";
  constructor(url: string) {
    this.endPoint = url;
  }
  async getAll(url: string = this.endPoint): Promise<ResponseModel> {
    try {
      let apiResponse = await customApiInstance.get(url);

      let response: ResponseModel = {
        data: apiResponse.data,
        status: true,
        statusCode: apiResponse.status,
        errorMessage: "",
      };
      return response;
    } catch (error: any) {
      let response: ResponseModel = {
        data: {},
        status: false,
        statusCode: error.response.status,
        errorMessage: error.message,
      };
      return response;
    }
  }

  async delete(url: string = this.endPoint): Promise<void> {
    await customApiInstance.delete(url);
  }

  async add(url: string = this.endPoint, data: T): Promise<void> {
    await customApiInstance.post(url, data);
  }

  async update(url: string = this.endPoint, data: T): Promise<void> {
    await customApiInstance.put(url, data);
  }
}
