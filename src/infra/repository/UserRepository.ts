import User from "../../domain/entity/User";
import DatabaseConnection from "../database/DatabaseConnection";

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly db: DatabaseConnection) {}

  async save(user: User): Promise<void> {
    await this.db.query(
      `
      INSERT INTO users (id, name, email, password, created_at)
      values ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        password = EXCLUDED.password
    `,
      [
        user.getId(),
        user.getName(),
        user.getEmail(),
        user.getPassword().getValue(),
        user.getCreatedAt(),
      ]
    );
  }

  async findById(id: string): Promise<User | null> {
    const [userData] = await this.db.query(
      `
      SELECT id, name, email, password, created_at
      FROM users
      WHERE id = $1
    `,
      [id]
    );

    if (!userData) return null;

    return new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.created_at
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const [userData] = await this.db.query(
      `
      SELECT id, name, email, password, created_at
      FROM users
      WHERE email = $1
    `,
      [email]
    );

    if (!userData) return null;

    return new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.created_at
    );
  }
}
