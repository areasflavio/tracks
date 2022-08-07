import { Artist, Playlist as PlaylistType, Song } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { SongsTable } from '../../components/songsTable';
import { GradientLayout } from '../../layouts/gradientLayout';
import { validateToken } from '../../lib/auth';
import { prismaClient } from '../../lib/prisma';

const customCookie = process.env.ACCESS_TOKEN_COOKIE;
const colors = [
  'red',
  'gray',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
];

const getPlaylistIndex = (id: string) => {
  const index = parseInt(
    Intl.NumberFormat('en-US', {
      notation: 'scientific',
    }).format(parseInt(id, 10)),
    10
  );

  return index - 1 || Math.floor(Math.random() * colors.length);
};

interface Props {
  playlist: PlaylistType & {
    duration: {
      hours: number;
      minutes: number;
    };
    songs: Array<
      Song & {
        artist: Pick<Artist, 'id' | 'name'>;
      }
    >;
  };
}

const Playlist = ({ playlist }: Props) => {
  const playlistIndex = getPlaylistIndex(playlist.id);
  const bgColor = colors[playlistIndex];

  let playlistDescription = `${playlist.songs.length} songs, about`;

  if (playlist.duration.hours > 0) {
    playlistDescription += ` ${playlist.duration.hours} hours and`;
  }

  playlistDescription += ` ${playlist.duration.minutes} minutes`;

  return (
    <>
      <Head>
        <title>{playlist.name} | Tracks</title>
      </Head>

      <GradientLayout
        color={bgColor}
        subtitle="Playlist"
        title={playlist.name}
        description={playlistDescription}
        image={`https://picsum.photos/400?random=${Math.random() * 10}`}
      >
        <SongsTable songs={playlist.songs} />
      </GradientLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  let id: string;

  try {
    id = validateToken(req.cookies[customCookie]);
  } catch (err) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
      props: {},
    };
  }

  const [playlist] = await prismaClient.playlist.findMany({
    where: {
      id: query.id as string,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const playlistDurationSeconds = playlist.songs.reduce((acc, song) => {
    const newDuration = acc + song.duration;
    return newDuration;
  }, 0);

  const playlistDurationMinutes = Math.ceil(playlistDurationSeconds / 60);
  const playlistDurationHours = Math.floor(playlistDurationMinutes / 60);

  return {
    props: {
      playlist: {
        ...playlist,
        duration: {
          hours: playlistDurationHours,
          minutes: playlistDurationMinutes,
        },
      },
    },
  };
};

export default Playlist;
