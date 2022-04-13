var defaultConfig = {
  synchonize: false, // don't want to automatically rebuild db on changes
  migrations: ['migrations/*.js'], // will use migrations to update DB tables
  cli: {
    migrationsDir: 'migrations',
  },
};

var testConfig = {
  type: 'sqlite',
  database: 'test.sqlite',
  entities: ['**/*.entity.ts'], // since Jest runs through the TS file we give it .ts
};

var development = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity.js'],
};

if (process.env.NODE_ENV === 'development') {
  Object.assign(defaultConfig, development);
} else {
  Object.assign(defaultConfig, testConfig);
}

module.exports = defaultConfig;
