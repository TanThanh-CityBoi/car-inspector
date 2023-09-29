export const envConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  clientUrl: process.env.CLIENT_URL,
  env: process.env.ENV,
  requestTimeout: 7000, // milisecond
  //
  jwtAccessKey: process.env.JWT_ACCESS_KEY,
  jwtAccessExpire: process.env.JWT_ACCESS_EXPIRE,
  //
  jwtRefreshKey: process.env.JWT_REFRESH_KEY,
  jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE,
  //
  passwordSalt: process.env.PASSWORD_SALT
    ? parseInt(process.env.PASSWORD_SALT)
    : 10,
});
