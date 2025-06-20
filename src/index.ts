import HealthCheckController from "./infra/controller/HealthCheckController";
import { ExpressServer } from "./infra/http/HttpServer";

const httpServer = new ExpressServer();

new HealthCheckController(httpServer);

httpServer.listen(3000);