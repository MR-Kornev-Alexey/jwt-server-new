const getDate = require("./calcNowDate");
const createList = require("./createListOfSending");


async function sendOnlyIntensive(helen) {
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
                            await helen.telegram.sendMessage(newArrayEmo[i].chatId, `❤️ Доброго времени суток ${newArrayEmo[i].name}❤️\n Тестовая рассылка ${date}\n` +
                                `\n` +
                                `С 1 марта стартует ежедневная рассылка лекций и заданий курса по эмоциям.\n Сообщение будет продублировано в основном чате`
                            )
                            helen.telegram.sendMessage(1081994928, `Рассылка для ${newArrayEmo[i].name} отправлено`).then(r => {
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