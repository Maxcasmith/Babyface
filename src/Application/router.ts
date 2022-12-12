export type iRequest = {
  path:string;
  method:string;
  query?:any;
  body?:any;
  headers?:any;
  files?:any;
}

export type iRouterRequest = {
  query?:any;
  body?:any;
  headers?:any;
  params?:any;
  files?:any;
}

export const routes:Array<any> = [];

export function get(route:string) {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    routes.unshift({ method: "GET", route, callback: descriptor.value });
  }
}

export function post(route:string) {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    routes.unshift({ method: "POST", route, callback: descriptor.value });
  }
}

export default class Router
{
  private readonly routes:Array<any>;

  constructor(routes:Array<any>) {
    this.routes = routes;
  }

  async direct({ path, method, query, body, headers, files }: iRequest) {
    let params:any = {};
    const route = this.routes.find(r => {
      const wildcards = r.route.match(/:([^\/]*)/g);
      if (wildcards) {
        let routeBuild = r.route.replace(/\//g, "\\/");
        for (let wildcard of wildcards) routeBuild = routeBuild.replace(wildcard, '([^\/]*)');
        const rb = new RegExp(routeBuild + '$');
        const matchingRoute = rb.test(path) && r.method == method;

        if (matchingRoute) {
          const wildcardVals = ((path as any).match(rb)).splice(1, wildcards.length);
          for (let i = 0; i < wildcards.length; i++) {
            params[wildcards[i].slice(1)] = wildcardVals[i];
          }
          params = params;
        }
        return matchingRoute;
      }
      else return (r.route == path && r.method == method) || r.route == "*";
    });

    const request:iRouterRequest = {query, body, headers, params, files};
    
    if (!route) throw {
      status: 404,
      stack: {
        message: `path '${path}' with method '${method}' not found`
      }
    };
    
    return await route.callback(request);
  }
}
