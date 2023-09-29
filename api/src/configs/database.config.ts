export const databaseConfig = () => ({
  database: {
    type: process.env['DB_TYPE'] || 'mysql',
    host: process.env['DB_HOST'] || '127.0.0.1',
    port: parseInt(process.env['DB_PORT'], 10) || 3306,
    username: process.env['DB_USER'] || 'root',
    password: process.env['DB_PASSWORD'] || 'root',
    database: process.env['DB_NAME'] || 'car_inspector',
    logging: process.env['DB_LOGGING'] === 'true',
    synchronize: process.env['DB_SYNCHRONIZE'] === 'true',
    entities: ['dist/modules/**/entities/**.entity{.ts,.js}'],
  },
});
