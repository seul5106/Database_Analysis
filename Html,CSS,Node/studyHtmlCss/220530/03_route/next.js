const schedule = require("node-schedule");
 
schedule.scheduleJob('10 * * * *', function(){
  console.log('매 10초에 실행');
});


