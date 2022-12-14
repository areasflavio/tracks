import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { artistsData } from './artistsData';

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async artist => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map(song => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      name: 'user',
      email: 'user@test.com',
      password: bcrypt.hashSync('password', salt),
    },
  });

  const songs = await prisma.song.findMany();
  await Promise.all(
    new Array(10).fill(1).map((_, index) => {
      const correctIndex = String(index + 1).padStart(2, '0');

      return prisma.playlist.create({
        data: {
          name: `Playlist #${correctIndex}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map(song => ({ id: song.id })),
          },
        },
      });
    })
  );
};

run()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
