const express = require("express");
const cors = require("cors");

const app = express();
//======================================================================
const {Telegraf, Markup, Scenes, session} = require('telegraf')
const cron = require('node-cron');
const token_helen = "5815175979:AAGXqlzqxeq9LCigysbmxrqmhVrsD76LGos" //helen_bot
const token_super = "5810660881:AAEtp2JduLoeBpiHBXDCfJKKbSWw3fiArVU" // superHelen bot
// const helen = new Telegraf(token_helen);
const helen = new Telegraf(token_helen);
const HelenFunction = require('./app/helenFunction/index')
const sendUsersNew = require('./app/common/SentUser')
const setNewWeek = require('./app/common/setNewWeek')
const sendEmoEveryDay = require('./app/common/sendEmoEveryDay')
const setNewUsersHW = require('./app/common/setNewUsersHW')
const setNewEmo = require('./app/common/setNewUsersEmo')
const sendOnlyIntensive = require('./app/common/sendOnlyIntensive')
//==========================================================================

// const corsOptions = {
//   origin: "http://localhost:8081"
// };


let corsOptions;
if (process.env.NODE_ENV === 'production') {
  corsOptions = {
    // origin: 'https://example.com',
    origin: ' 95.163.241.214',
  };
} else {
  corsOptions = {
    origin: 'http://localhost:8081',
  };
}
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });
const path = require('path')
app.use(express.static(path.join(__dirname, 'dist')))

// Обработка маршрутов на стороне клиента
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}
//============================= helen ======================================
// sendUsersNew(helen).then(r => {})
// sendEmoEveryDay(helen).then(r=>{})
helen.start(async (ctx) => {
  await HelenFunction.startStep (ctx)
})
helen.command('new_hw', async (ctx) => {
        await ctx.replyWithHTML(`<b>Команда new_hw</b>`)
        await setNewUsersHW(helen)
});
helen.command('new_emo', async (ctx) => {
  await ctx.replyWithHTML(`<b>Команда new_emo</b>`)
  await setNewEmo(helen)
});
helen.command('send_emo', async (ctx) => {
  await ctx.replyWithHTML(`<b>Команда send_emo</b>`)
  await sendEmoEveryDay(helen)
});
helen.command('send_intensive', async (ctx) => {
  await ctx.replyWithHTML(`<b>Команда send_intensive</b>`)
  await sendOnlyIntensive(helen)
});
helen.on('message', async (ctx) => {
  // console.log(ctx.message)
  await HelenFunction.firstStep(ctx)
})
cron.schedule('15 6 * * 1-5', async () => {
  await sendUsersNew(helen)
});
cron.schedule('15 7 * * *', async () => {
  await sendEmoEveryDay(helen)
});
cron.schedule('0 6 * * 1', async () => {
  await setNewWeek(helen)
});

//=========================================================================
helen.launch();
process.once('SIGINT', () => helen.stop('SIGINT'));
process.once('SIGTERM', () => helen.stop('SIGTERM'));
//=========================================================================