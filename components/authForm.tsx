import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  LinkBox,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC, FormEvent, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { auth } from '../lib/mutations';

export const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);

  const route = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasError(false);

    try {
      const formData = {
        email,
        password,
      };

      if (mode === 'signup') {
        Object.defineProperty(formData, 'name', {
          value: name,
        });

        if (
          name.trim() === '' ||
          email.trim() === '' ||
          password.trim() === ''
        ) {
          throw new Error('');
        }
      }

      await auth(mode, formData);

      if (mode === 'signup') {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }

      route.push('/');
    } catch (err) {
      setHasError(true);
      setIsLoading(false);

      toast({
        title: `Error to ${mode}`,
        description: 'Check your credentials.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>{String(mode).toUpperCase()} | Tracks</title>
      </Head>

      <Box h="100vh" w="100vw" bg="black" color="white">
        <Flex justify="center" align="center" h="calc(100vh - 100px)">
          <Flex
            direction="column"
            p="80px"
            borderRadius="6px"
            bg="gray.900"
            justifyItems="center"
            gap="40px"
          >
            <NextImage src="/logo.svg" height={60} width={120} />

            <LinkBox
              display="flex"
              w="100%"
              justifyContent="space-evenly"
              fontWeight="bold"
              textTransform="uppercase"
            >
              <NextLink href="/signin" passHref>
                <Link
                  href="/"
                  _hover={{
                    textDecor: 'none',
                  }}
                  sx={
                    route.pathname === '/signin' && {
                      borderBottom: '4px solid',
                      borderColor: 'green.500',
                    }
                  }
                >
                  Sign in
                </Link>
              </NextLink>
              <NextLink href="/signup" passHref>
                <Link
                  href="/"
                  _hover={{
                    textDecor: 'none',
                  }}
                  sx={
                    route.pathname === '/signup' && {
                      borderBottom: '4px solid',
                      borderColor: 'green.500',
                    }
                  }
                >
                  Sign up
                </Link>
              </NextLink>
            </LinkBox>

            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '20px',
              }}
            >
              {mode === 'signup' && (
                <Input
                  type="text"
                  placeholder="Name"
                  onChange={e => setName(e.target.value)}
                  borderRadius="full"
                  focusBorderColor="green.300"
                />
              )}

              <Input
                type="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                borderRadius="full"
                focusBorderColor="green.300"
                isRequired
                isInvalid={hasError}
                onFocus={() => setHasError(false)}
              />

              <InputGroup size="md">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                  borderRadius="full"
                  focusBorderColor="green.300"
                  isRequired
                  isInvalid={hasError}
                  onFocus={() => setHasError(false)}
                />
                <InputRightElement mr="4px">
                  <Button
                    size="xs"
                    rounded="full"
                    bg="transparent"
                    _hover={{
                      bg: 'transparent',
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoMdEyeOff size={20} />
                    ) : (
                      <IoMdEye size={20} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Button
                type="submit"
                bg="green.500"
                w="100%"
                borderRadius="full"
                _hover={{ bg: 'green.300' }}
                isLoading={isLoading}
                textTransform="uppercase"
              >
                {mode}
              </Button>
            </form>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
