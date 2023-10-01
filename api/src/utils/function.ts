import { customAlphabet } from 'nanoid';

export const getBearerToken = (req, key = 'authorization') => {
  if (req.headers[key] && req.headers[key].split(' ')[0] === 'Bearer') {
    return req.headers[key].split(' ')[1];
  }
  return null;
};

export const getUniqueCode = async () => {
  const random = await customAlphabet(
    '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    7,
  )();

  const timer = new Date().getTime().toString();
  const preCode = timer.slice(0, timer.length - 9);

  return preCode + random;
};
