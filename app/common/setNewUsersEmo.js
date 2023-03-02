const callDb = require("../controllers/common.conroller");

async function setNewUsersEmo(helen) {
    // const newArrayUsers = await callDb.findAllUsersMain({source: 'new'})
    const newArrayUsers = await callDb.findIntensiveCheck()
    // console.log('newArrayUsers --- ', newArrayUsers)
    for (let i = 0; i < newArrayUsers.length; i++) {
        // console.log('newArrayUsers --- ', newArrayUsers[i].dataValues)
        await callDb.createNewSendEmo(newArrayUsers[i].dataValues)
    }
}
module.exports = setNewUsersEmo;