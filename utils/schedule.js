const cron = require('node-cron');
const mailer = require('./send-mail');
const serviceHandler = require('./service-handler');
const { Plan } = require('../models');

// cron.schedule('0 * * * *', () => {
//   console.log('node-cron 매시간 0분마다 실행');
// });
// cron.schedule(
//   '* * * * * *',
//   serviceHandler(async () => {
//     console.log('1초마다 실행되는 작업입니다');
//   })
// );
cron.schedule(
  '* * * * *',
  serviceHandler(async () => {
    console.log('node-cron 1분마다 실행');
    const currentTime = new Date();
    const nextHour = new Date(currentTime.getTime() + 60 * 60 * 1000);

    const plan = await Plan.findAll({});
  })
);
