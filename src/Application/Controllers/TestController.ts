import { get, post, iRouterRequest } from "../router";

export default class TestController
{
  @get('/api/test')
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
