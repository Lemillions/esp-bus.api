import pgp from "pg-promise";

export default interface DatabaseConnection {
    query (statement: string, params: any): Promise<any>;
    close (): Promise<any>;
}

export class PgPromiseAdapter implements DatabaseConnection {
    connection: any;

    constructor () {
        this.connection = pgp()(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_NAME}`);
    }

    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }

    close(): Promise<any> {
        return this.connection.$pool.end();
    }

}