import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { Artist, User } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { useFetchWithSWR } from '../hooks/useFetchWithSWR';
import { GradientLayout } from '../layouts/gradientLayout';
import { prismaClient } from '../lib/prisma';

interface Props {
  artists: Artist[];
}

type UserPageProps = User & {
  playlistCount: number;
};

const Home = ({ artists }: Props) => {
  const { data: user } = useFetchWithSWR<UserPageProps>('/me');

  if (!user) {
    return;
  }

  return (
    <>
      <Head>
        <title>HOME | Tracks</title>
      </Head>

      <GradientLayout
        color="gray"
        title={user.name}
        subtitle="Profile"
        image={`https://i.pravatar.cc/300?u=${user.name}`}
        roundImage
        description={`${user.playlistCount} public playlists`}
      >
        <Box color="white" paddingX="40px">
          <Box marginBottom="40px">
            <Text fontSize="2xl" fontWeight="bold">
              Top artist this month
            </Text>
            <Text fontSize="md" color="gray.200">
              Only visible to you
            </Text>
          </Box>

          <Flex paddingBottom="16px" overflowX="auto">
            {artists.map(artist => (
              <Box paddingX="10px" minW="20%" key={artist.id}>
                <Box
                  bg="gray.900"
                  borderRadius="4px"
                  padding="15px"
                  width="100%"
                >
                  <Image
                    src={`https://i.pravatar.cc/300?u=${artist.id}`}
                    borderRadius="100%"
                  />
                  <Box marginTop="20px">
                    <Text fontSize="large">{artist.name}</Text>
                    <Text fontSize="x-small" color="gray.200">
                      Artist
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      </GradientLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const artists = await prismaClient.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
