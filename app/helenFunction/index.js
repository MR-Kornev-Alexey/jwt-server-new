const callDb = require("../controllers/common.conroller");
exports.firstStep = async (ctx) => {
    switch (ctx.message.text) {
        case '/support':
            ctx.replyWithHTML(`Вы можете написать в Службу поддержки Бота\nhttps://t.me/mrk_service`)
            break
        case '/help':
            // await ctx.replyWithHTML(helpHelen.help)
            await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHLnBju3AHWWk_-r_jjHgXlXAl16HJugACwxMAAm3oEEqGY8B94dy6NC0E')
            break
        case "Дружба":
            await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQljx4G5gd7Xn9qG7_HilIy-1YYXQgACCh0AAsGoIEkIjTf-YvDReC0E')
            await ctx.replyWithHTML(`<b>Спасибо</b>`)
            break
        case "дружба":
            await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQljx4G5gd7Xn9qG7_HilIy-1YYXQgACCh0AAsGoIEkIjTf-YvDReC0E')
            await ctx.replyWithHTML(`<b>Спасибо</b>`)
            break
        case "/homeworks":
            await ctx.replyWithHTML(`<b>Домашние задания следует смотреть в Helen Bot.</b>\n\n` +
                `Вам сюда https://t.me/mrk_new_bot`)
            break
        default :
            await mainCheckAdmin(ctx)
    }
}
async function nextStep(ctx) {
    switch (ctx.message.text) {
        case "/convert_emo":
            await ctx.replyWithHTML(`<b>Команда convert_emo</b>`)
            await convertUserToEmo()
            break
        default:
            await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQtjx4Mrk8muB2BSyhVHqSko2ZZrQgACzBgAAntYUEmwTZrmztcawi0E')
            await ctx.replyWithHTML(`<b>Непонятная команда\n Повторите, пожалуйста, ввод. </b>`)
    }
}
exports.startStep = async (ctx) => {
    await checkUserHelen(ctx.message.from).then(async (result) => {
        if (result) {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nВы уже подружились со мной.\nЖдите ДЗ согласно графику.`,
            )
        } else {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nПодружитесь, пожалуйста со мной, отправив мне слово дружба`,
            )
        }
    }
    ).catch(e => {
        console.log(e)
    })
}
mainCheckAdmin = async (ctx) => {
    const isAdmin = await checkUserAdmin(ctx.message.from);
    if (isAdmin) {
        await nextStep(ctx)
    } else {
        switch (ctx.message.text) {
            default:
                await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQtjx4Mrk8muB2BSyhVHqSko2ZZrQgACzBgAAntYUEmwTZrmztcawi0E')
                await ctx.reply('Я это слово пока еще не знаю.\nПока я отравляю только ДЗ\nМожете написать в поддержку\nhttps://t.me/mrk_service')
        }
    }
}
async function checkUserAdmin(data) {
    // console.log(data)
    try {
        const user = await callDb.findUserByPk(data.id);
        if (user && user.role_telegram === "admin") {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
checkUserHelen = (data) => {
    return new Promise((resolve, reject) => {
        callDb.findOneHelen(data.id)
            .then((idCheck) => {
                if (idCheck) {
                    console.log("idCheck ----", idCheck, "Пользователь найден")
                    resolve(true); //Пользователь найден
                } else {
                    console.log("Пользователь не найден")
                    callDb.createHelen(data);
                    resolve(false); //Пользователь не найден
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}

async function convertUserToEmo() {
    const oldArray = await callDb.findAllUsers()
    const newArray = oldArray.map(({
                                       dataValues: {
                                           real_name_telegram,
                                           first_name_telegram,
                                           chatId,
                                           baby_name_telegram,
                                           birthday_telegram,
                                           email_telegram,
                                           access_emo
                                       }
                                   }) => {
        return {
            name: real_name_telegram,
            chatId: chatId,
            babyName: baby_name_telegram,
            birthdayBaby: birthday_telegram,
            email: email_telegram,
            first_name_telegram: first_name_telegram,
            access_emo:	access_emo
        }
    });
    for (let i = 0; i < newArray.length; i++) {
        // await callDb.createUserForTest(newArray[i])
        const user = await callDb.checkUserForEmo(newArray[i].chatId)
        if (user) {
            console.log("найден ---", newArray[i].name ,"----", newArray[i].chatId)
        } else {
            console.log("не найден ---", newArray[i].name, "----", newArray[i].chatId)
            if(newArray[i].access_emo){
                await callDb.createUserForEmo(newArray[i])
                // await callDb.createUserForTest(newArray[i])
            }
        }
    }
    console.log(newArray)
}