import { Box } from '@chakra-ui/layout';
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';

import { Song } from '@prisma/client';

import { formatDate, formatTime } from '../lib/formatters';

interface Props {
  songs: Song[];
}

export const SongsTable = ({ songs }: Props) => {
  return (
    <Box bg="transparent" color="white">
      <Box p="10px" mb="20px">
        <Box mb="30px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            colorScheme="green"
            size="lg"
            isRound
            aria-label="play"
          />
        </Box>

        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {songs.map((song, index) => (
              <Tr
                key={song.id}
                sx={{
                  transition: 'all 0.3s',
                  '&:hover': {
                    bg: 'rgba(255,255,255,0.1)',
                  },
                }}
                cursor="default"
              >
                <Td>{index + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
