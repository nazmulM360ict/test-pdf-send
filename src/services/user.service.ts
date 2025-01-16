import { AppError } from '../middlewares/appError';

interface User {
  id: string;
  name: string;
  email: string;
}

export class UserService {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async create(data: User): Promise<User> {
    this.users.push(data);

    return data;
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      Object.assign(user, data);
      return user;
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
