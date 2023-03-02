const callDb = require("../controllers/common.conroller");
const calculateWeeksSinceBD = require('./calculateWeeks')

async function setNewUsersHW(helen) {
    const newArrayUsers = await callDb.findAllUsersMain({source: 'new'})
    // console.log('newArrayUsers --- ', newArrayUsers)
    for (let i = 0; i < newArrayUsers.length; i++) {
        // console.log('newArrayUsers --- ', newArrayUsers[i].dataValues)
        const week = await calculateWeeksSinceBD(newArrayUsers[i].dataValues.birthday_telegram)
        callDb.createSendHW(newArrayUsers[i].dataValues, week)
    }
}
module.exports = setNewUsersHW;