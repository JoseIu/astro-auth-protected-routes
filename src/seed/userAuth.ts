import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import prisma from '../db';

interface UserAuthSeed {
  name: string;
  email: string;
  password: string;
  //   createdAt: Date;
  role: Role;
}

type Role = 'ADMIN' | 'USER';

const generateUserAuthSeed = (): UserAuthSeed[] => {
  const userAuthSeed: UserAuthSeed[] = [];

  const userAdmin: UserAuthSeed = {
    name: faker.person.firstName(),
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456'),
    role: 'ADMIN'
  };

  const user: UserAuthSeed = {
    name: faker.person.firstName(),
    email: 'user@user.com',
    password: bcrypt.hashSync('123456'),
    role: 'USER'
  };

  userAuthSeed.push(userAdmin);
  userAuthSeed.push(user);
  return userAuthSeed;
};

const main = async () => {
  await prisma.userAuth.deleteMany();

  await prisma.userAuth.createMany({
    data: generateUserAuthSeed()
  });

  console.log('SEED USER AUTH EJECUTADO CORRECTAMENTE!! 🚀🚀🚀🚀🚀');
};

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();
