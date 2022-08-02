import { Box } from '@chakra-ui/layout';
import { Sidebar } from './sidebar';

export const PlayerLayout = ({ children }) => {
  return (
    <Box w="100vw" h="100vh">
      <Box pos="absolute" top="0" left="0" w="250px">
        <Sidebar />
      </Box>

      <Box ml="250px" mb="100px">
        {children}
      </Box>

      <Box pos="absolute" left="0" bottom="0">
        player
      </Box>
    </Box>
  );
};
