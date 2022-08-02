import {
  Box,
  Center,
  Divider,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/layout';
import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from 'react-icons/md';

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'My Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
];

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorites',
  },
];

const playlists = new Array(30)
  .fill(1)
  .map((_, index) => `Playlist ${++index}`);

export const Sidebar = () => {
  return (
    <Box w="100%" h="calc(100vh - 100px)" px="5px" bg="black" color="gray">
      <Box h="100%" py="20px">
        <Box w="120px" mb="20px" px="20px">
          <NextImage src="/logo.svg" height={60} width={120} />
        </Box>

        <Box mb="20px">
          <List spacing={2}>
            {navMenu.map((item) => (
              <ListItem key={item.name} px="20px" fontSize="16px">
                <LinkBox>
                  <NextLink href={item.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={item.icon} color="white" mr="20px" />
                      {item.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box my="20px">
          <List spacing={2}>
            {musicMenu.map((item) => (
              <ListItem key={item.name} px="20px" fontSize="16px">
                <LinkBox>
                  <NextLink href={item.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={item.icon} color="white" mr="20px" />
                      {item.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box px="20px">
          <Divider color="gray.800" />
        </Box>

        <Box h="66%" overflowY="auto" py="20px">
          <List spacing={2}>
            {playlists.map((playlist) => (
              <ListItem key={playlist} px="20px">
                <LinkBox>
                  <NextLink href="/" passHref>
                    <LinkOverlay>{playlist}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};