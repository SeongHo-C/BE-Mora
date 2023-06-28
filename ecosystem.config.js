module.exports = {
  apps: [
    {
      name: 'moyeora-racer',
      script: './app.js',
      instance_var: 'INSTANCE_ID',
      instances: 3,
      exec_mode: 'cluster',
      autorestart: false,
      watch: false,
    },
  ],
};
