import { createClient, RedisClientType } from "redis";

export default interface Cache {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  quit(): Promise<void>;
}

export class RedisAdapter implements Cache {
  private client: RedisClientType;

  private constructor() {
    this.client = createClient({
      socket: {
        host: "localhost",
        port: 6379,
      },
      password: process.env.REDIS_PASSWORD || undefined,
    });
  }

  static async create (): Promise<RedisAdapter> {
    const instance = new RedisAdapter();

    await instance.client.connect().catch((err) => {
      console.error("Falha ao se conectar com o redis: ", err);
      throw err;
    });

    return instance;
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) await this.client.set(key, value, { EX: ttl });
    else await this.client.set(key, value);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async quit(): Promise<void> {
    await this.client.quit();
  }
}
