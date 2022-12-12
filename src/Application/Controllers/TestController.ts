import { get, iRouterRequest, post } from "../routing";

export default class TestController
{
  @get('/api/test/:id')
  async test(req:iRouterRequest) {
    return {
      message: "Hello World"
    }
  }

  @post('/api/test')
  async postTest(req:iRouterRequest) {
    return {
      message: "POST REQUEST YO"
    }
  }
}
