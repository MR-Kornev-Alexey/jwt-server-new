const getDate = require("./calcNowDate");
const createList = require("./createListOfSending");
const callDb = require("../controllers/common.conroller");

async function  sendEmoEveryDay (helen){
    const date = await getDate.calcNowDate()
    const newArrayEmo = await createList.createListEmo()
    console.log('newArrayEmo --- ', newArrayEmo)
    for (let i = 0; i < newArrayEmo.length; i++) {
        setTimeout(() => {
            try {
                helen.telegram.getChatMember(newArrayEmo[i].chatId, newArrayEmo[i].chatId).then(async (chatMember) => {
                    // console.log("chatMember ----", chatMember.status)
                    if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                        console.log('User is not available')
                    } else {
                        // console.log(newArrayIntensive[i])
                        try {
                            await helen.telegram.sendMessage(newArrayEmo[i].chatId, `❤️ Добрый день ${newArrayEmo[i].name}❤️\nРассылка от ${date} (${newArrayEmo[i].index_send})\n` +
                                `\n` +
                                `${newArrayEmo[i].link}\n`
                            )
                             await callDb.incrementIndexOfSend( newArrayEmo[i].chatId, newArrayEmo[i].index_send)
                             helen.telegram.sendMessage(1081994928, `Рассылка для ${newArrayEmo[i].name} отправлено`).then(r => {})
                        } catch (error) {
                            console.log(error);
                        }
                    }
                })
            } catch (error) {
                    console.log(`Failed to send message to user ${newArrayEmo[i].name} with chatId ${newArrayEmo[i].chatId}. Error: ${error.response.description}`);
                }
        }, 10000 * i)
    }
}
module.exports = sendEmoEveryDay;