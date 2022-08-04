import { Box, Button, Flex, Input } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { FC, FormEvent, useState } from 'react';
import { useSWRConfig } from 'swr';
import { auth } from '../lib/mutations';

export const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = {
        email,
        password,
      };

      if (mode === 'signup')
        Object.defineProperty(formData, 'name', {
          value: name,
        });

      await auth(mode, formData);

      route.push('/');
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Box h="100vh" w="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        h="100px"
        borderBottom="1px solid white"
      >
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>

      <Flex justify="center" align="center" h="calc(100vh - 100px)">
        <Box p="50px" borderRadius="6px" bg="gray.900">
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <Input
                type="text"
                placeholder="Name"
                onChange={e => setName(e.target.value)}
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              bg="green.500"
              _hover={{ bg: 'green.300' }}
              isLoading={isLoading}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};
