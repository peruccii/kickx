import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'KickX',
      email: process.env.email || '',
      password: process.env.pass || '',
      balance: Number(process.env.balance),
      codeValidation: process.env.codeValidation || ''
    }
  ];

  for (const user of users) {
    await prisma.owner.create({ data: user });
  }

  console.log('Usuário criado com sucesso!');
}

main()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
