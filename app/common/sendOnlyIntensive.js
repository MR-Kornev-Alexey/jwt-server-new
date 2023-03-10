const getDate = require("./calcNowDate");
const createList = require("./createListOfSending");


async function sendOnlyIntensive(helen) {
    const date = await getDate.calcNowDate()
    const newArrayNew = await createList.createListEmo()
    console.log('newArrayNew --- ', newArrayNew)
    for (let i = 0; i < newArrayNew.length; i++) {
        setTimeout(() => {
            try {
                helen.telegram.getChatMember(newArrayNew[i].chatId, newArrayNew[i].chatId).then(async (chatMember) => {
                    // console.log("chatMember ----", chatMember.status)
                    if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                        console.log('User is not available')
                    } else {
                        // console.log(newArrayIntensive[i])
                        try {
                            await helen.telegram.sendMessage(newArrayNew[i].chatId, `❤️ Доброго времени суток ${newArrayNew[i].name}❤️\n Тестовая рассылка ${date}\n` +
                                `\n`
                            )
                            helen.telegram.sendMessage(1081994928, `Рассылка для ${newArrayNew[i].name} отправлено`).then(r => {
                            })
                        } catch (error) {
                            console.log(error);
                        }
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }, 10000 * i)
    }
}

module.exports = sendOnlyIntensive;