import { fetcher } from './fetcher';

export const auth = (
  mode: 'signin' | 'signup' | 'signout',
  body: { name?: string; email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};
