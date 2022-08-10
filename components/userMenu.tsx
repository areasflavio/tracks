import {
  Button,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { IoCaretDown, IoCaretUp } from 'react-icons/io5';
import { auth } from '../lib/mutations';

const menuOptions = [
  {
    name: 'Account',
    route: '/account',
  },
  {
    name: 'Profile',
    route: '/profile',
  },
  {
    name: 'Settings',
    route: '/settings',
  },
  {
    name: 'Logout',
    mode: 'logout',
    route: '/',
    hasDivider: true,
  },
];

type menuOptionType = typeof menuOptions[0];

interface Props {
  avatar: string;
  name: string;
}

export const UserMenu = ({ avatar, name }: Props) => {
  const router = useRouter();

  const handleItemClick = async (option: menuOptionType) => {
    if (option.mode) {
      await auth('signout', {} as any);
    }

    return router.push(option.route);
  };

  return (
    <Menu autoSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            rightIcon={
              isOpen ? <IoCaretUp size={20} /> : <IoCaretDown size={20} />
            }
            transition="all 0.2s"
            aria-label="user options"
            variant="outline"
            border="none"
            px="4px"
            rounded="full"
            bg="black"
            color="white"
            _hover={{
              bg: 'gray.700',
              color: 'white',
            }}
            _active={{
              bg: 'gray.700',
              color: 'white',
            }}
          >
            <Flex align="center">
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={avatar}
                alt={name}
                mr="12px"
              />
              {name}
            </Flex>
          </MenuButton>
          <MenuList bg="gray.700" color="white" px="4px">
            {menuOptions.map(option => (
              <>
                {option.hasDivider && <Divider color="gray.600" />}
                <MenuItem
                  key={option.name}
                  borderRadius="sm"
                  _hover={{
                    bg: 'gray.600',
                  }}
                  onClick={() => handleItemClick(option)}
                >
                  {option.name}
                </MenuItem>
              </>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};
