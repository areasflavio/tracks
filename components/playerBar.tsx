import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { useStoreState } from '../lib/store';
import { Player } from './player';

export const PlayerBar = () => {
  const { activeSongs, activeSong } = useStoreState(state => state);

  return (
    <Box h="100px" w="100vw" bg="gray.900" p="10px">
      <Flex align="center">
        {activeSong && (
          <>
            <Flex align="center" w="30%">
              <Image
                src={`https://picsum.photos/400?random=${Math.random() * 10}`}
                w="70px"
                h="70px"
              />
              <Box p="20px" color="white">
                <Text fontSize="md">{activeSong.name}</Text>
                <Text fontSize="x-small">{activeSong.artist.name}</Text>
              </Box>
            </Flex>

            <Box w="40%">
              <Player activeSong={activeSong} songs={activeSongs} />
            </Box>
            <Box w="30%">controls</Box>
          </>
        )}
      </Flex>
    </Box>
  );
};
