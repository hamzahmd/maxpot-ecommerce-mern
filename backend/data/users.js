import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@maxpot.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Hamza',
    email: 'hamza@maxpot.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Ahmad',
    email: 'ahmad@maxpot.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
