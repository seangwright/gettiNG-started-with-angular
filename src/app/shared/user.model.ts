export class User {
  id = 0;
  username = '';
  firstName = '';
  lastName = '';

  constructor(user: Partial<User>) {
    if (user) {
      Object.assign(this, user);
    }
  }
}
