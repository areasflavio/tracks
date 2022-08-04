export async function fetcher<T = any>(
  url: string,
  data = undefined
): Promise<T> {
  const res = await fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data, ['email', 'name', 'password']),
  });

  if (res.status < 200 || res.status > 399) {
    throw new Error('Fetch error.');
  }

  return res.json();
}
