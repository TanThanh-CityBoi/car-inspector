export const getBearerToken = (req, key = 'authorization') => {
  if (req.headers[key] && req.headers[key].split(' ')[0] === 'Bearer') {
    return req.headers[key].split(' ')[1];
  }
  return null;
};
