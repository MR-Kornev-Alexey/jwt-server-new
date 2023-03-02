const callDb = require("../controllers/common.conroller");
const createList56 = require('./createListIntensive')
const newListOfSend = require('../lib/listSendOfEmoCouse')

exports.createListOFSending = async () => {  //command is list
    const newData = await callDb.findAllIntensive() // формирование реального списка
    // const newDataTest = await callDb.findAllTest() // формирование тестового списка
    // console.log('newDataTest ---- ', newDataTest)
    return await createList56.createListBefore56(newData)
}

exports.createListEmo = async () => {  //command is list
    const newData = await callDb.findAllEmo() // формирование реального списка emo
    // console.log('newData ---- ', newData)
    const newList = []
    for (let i = 0; i < newData.length; i++) {
        const indexOfSend = newData[i].dataValues.index_send
        newList.push(
            {
                link: await createLinkTextForEmo(newListOfSend[indexOfSend]),
                index_send: newData[i].dataValues.index_send,
                chatId: newData[i].dataValues.chatId,
                name: newData[i].dataValues.real_name_telegram,
            }
        )
    }
    return newList
}

async function createLinkTextForEmo(array){
    // console.log('array ---- ', array)
   let text = 'Блок: ' + array[0].block + ' \n==========\n' + array[0].title + '\n==========\n\n'
    for (let i = 0; i < array.length; i++) {

        text = text + Number(i+1) + '. ' + array[i].subTitle + '\n' + array[i].link + '\n==========\n'
    }
    return text
}