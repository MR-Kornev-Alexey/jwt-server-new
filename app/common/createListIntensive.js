const calculateMonth = require('./calculateMonth')
const arraySend = require('../lib/send_0_104')
const calculateLink = require('./calculateLink')

exports.createListBefore56 = async (newData) => {
    const dataBefore56 = []
    for (let i = 0; i < newData.length; i++) {
        const fullMonth = await calculateMonth.calculateMonthsSinceBirth(newData[i].dataValues.birthday_telegram)
        const fullWeek = newData[i].dataValues.index_week
        // console.log("fullMonth ---", fullMonth)
        // console.log("fullWeek ---", fullWeek)
        if (fullWeek <= 104) {
            const linkVideo = await calculateLinkForSending(fullWeek, arraySend)
               dataBefore56.push({
                    numberMonth: fullMonth,
                    numberWeek: fullWeek,
                    indexVideo: linkVideo.index,
                    link: linkVideo.link,
                    indexWeek: linkVideo.id,
                    chatId: newData[i].dataValues.chatId,
                    name: newData[i].dataValues.real_name_telegram,
                    birthday: newData[i].dataValues.birthday_telegram,
             })
        }
    }
    console.log("dataBefore56 ---", dataBefore56)
    return dataBefore56
}

async function calculateLinkForSending(fullWeek, array) {
    let indexLink = await calculateLink.calculateAllIndexOfLink(fullWeek)
    let object = array.find(obj => obj.id === indexLink)
    // console.log('object ----', object)
    return object
}