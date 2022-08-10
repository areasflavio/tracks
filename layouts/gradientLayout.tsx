import { Box, BoxProps, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { User } from '@prisma/client';
import { UserMenu } from '../components/userMenu';
import { useFetchWithSWR } from '../hooks/useFetchWithSWR';

type Props = BoxProps & {
  description: string;
  image: string;
  roundImage?: boolean;
  title: string;
  subtitle: string;
};

export const GradientLayout = ({
  children,
  color,
  description,
  image,
  roundImage = false,
  subtitle,
  title,
}: Props) => {
  const { data: user } = useFetchWithSWR<User>('/me');

  if (!user) {
    return;
  }

  return (
    <Box
      height="100%"
      overflowY="auto"
      overflowX="clip"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
      position="relative"
    >
      <Flex position="absolute" top="20px" right="40px">
        <UserMenu
          avatar={`https://i.pravatar.cc/300?u=${user.name}`}
          name={user.name}
        />
      </Flex>

      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? '100%' : '3px'}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small" color="gray.200">
            {description}
          </Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};
