import { get, post } from "../routing";

export default class TestController
{
  @get('/api/test')
  async test(req:any) {
    return {
      message: "Hello World"
    }
  }

  @post('/api/test')
  async postTest(req:any) {
    return {
      message: "POST REQUEST YO"
    }
  }
}
