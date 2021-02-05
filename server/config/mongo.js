const config = {
  host: 'localhost',
  port: 27017,
  username: 'appAdmin',
  password: '109451',
  database: 'flea_data'
};

config.url = `mongodb://${config.username}:${config.password}@` +
`${config.host}:${config.port}/${config.database}`;

module.exports = config;