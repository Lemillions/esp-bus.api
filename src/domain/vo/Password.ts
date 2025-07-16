import bcrypt from 'bcrypt';

export default class Password {
  private value: string;

  constructor(password: string) {
    if (!this.validatePassword(password)) throw new Error("Invalid password");
    this.value = bcrypt.hashSync(password, 10);
  }

  private validatePassword(password: string) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  }

  getValue() {
    return this.value;
  }

  compare(password: string): boolean {
    return bcrypt.compareSync(password, this.value);
  }
}
