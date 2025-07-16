import Password from '../vo/Password';

export default class User {
  private id: string;
  private name: string;
  private email: string;
  private password: Password;
  private createdAt: Date;

  constructor(id: string, name: string, email: string, password: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = new Password(password);
    this.createdAt = createdAt;
  }

  static create(
    name: string,
    email: string,
    password: string,
  ) {
    const id = crypto.randomUUID();
    const createdAt = new Date();

    return new User(id, name, email, password, createdAt);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): Password {
    return this.password;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setName(name: string): void {
    this.name = name;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = new Password(password);
  }

  comparePassword(password: string): boolean {
    return this.password.compare(password);
  }
}