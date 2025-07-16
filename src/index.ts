import { RedisAdapter } from "./infra/cache/Cache";
import HealthCheckController from "./infra/controller/HealthCheckController";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressServer } from "./infra/http/HttpServer";
import { UserRepositoryImpl } from "./infra/repository/UserRepository";
import "dotenv/config";

async function main() {
    const httpServer = new ExpressServer();
    const databaseConnection = new PgPromiseAdapter();
    const cache = await RedisAdapter.create();

    const UserRepository = new UserRepositoryImpl(databaseConnection);

    new HealthCheckController(httpServer);

    httpServer.listen(3000);
}

main().catch((error) => {
    console.error("Erro na inicialização: ", error);
    process.exit(1);
});