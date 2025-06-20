import HttpServer from "../http/HttpServer";

interface Output {
  status: string;
}

export default class HealthCheckController {
  constructor(private httpServer: HttpServer) {
    this.httpServer.register("get", "/health-check", this.handle.bind(this));
  }

  async handle(params: any, body: any): Promise<Output> {
    return {
      status: "ok",
    };
  }
}
