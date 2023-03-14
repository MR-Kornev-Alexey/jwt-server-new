const db = require("../models");
const dataBot = db.tutorials;
const Op = db.Sequelize.Op;

exports.saveSandingToDB =  async (user, link, index) => {
    const newSending = {
        chatId: user.chatId,
        name:  user.name,
        birthday: user.birthday,
        numberMonth: user.numberMonth,
        numberWeek: user.numberWeek,
        link: link,
        indexVideo: index,
        indexWeek: user.numberWeek
    };
    await dataBot.Sending.create(newSending)
        .catch(err => {
            console.log(err)
        })
}

exports.updateNewWeek = (id, week) => {
    console.log(id, week);
    dataBot.Intensive.update({ index_week: week}, {
        where: { chatId: id }
    })
}
exports.findAllUsers = async (req, res) => {
    return await dataBot.Tutorial.findAll( { where: { role_telegram: 'admin'}})
        .then(user => {
            // console.log(data)
            return user;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};
exports.findAllUsersMain = async (data, res) => {
    return await dataBot.Tutorial.findAll( { where: data})
        .then(user => {
            // console.log(data)
            return user;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};

exports.checkUserForEmo = async (chatId) => {
    const user = await dataBot.SendEmo.findByPk(chatId);
    return !!user;
}

exports.createUserForEmo = async (data) => {
    const newUser = {
        email_telegram: data.email,
        real_name_telegram: data.name,
        baby_name_telegram: data.babyName,
        birthday_telegram: data.birthdayBaby,
        chatId: data.chatId,
        first_name_telegram: data.first_name_telegram,
        registrationDate: new Date
    };
    await dataBot.SendEmo.create(newUser)
        .catch(err => {
            console.log(err)
        })
}

exports.findAllIntensive = async (req, res) => {
    return await dataBot.Intensive.findAll({ where: { send: true }})
        .then(user => {
            // console.log(user)
            return user;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};
exports.findNewIntensive = async (req, res) => {
    return await dataBot.Intensive.findAll({ where: { note: 'new' }})
        .then(user => {
            // console.log(user)
            return user;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};
exports.findIntensiveCheck = async (data, res) => {
    return await dataBot.Intensive.findAll({
        where: {
            number: 'number-2',
            send: true
        }
    } )
        .then(user => {
            // console.log(user)
            return user;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};
exports.findAllEmo = async (req, res) => {
    return await dataBot.SendEmo.findAll({ where: { send: true }})
        .then(user => {
            // console.log(user)
            return user;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};
exports.findAllTest = async (req, res) => {
    return await dataBot.Test.findAll({ where: { send: true }})
        .then(user => {
            // console.log(user)
            return user;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};

exports.findOneHelen = (data) => {
    return new Promise((resolve, reject) => {
        findAndLogUserHelen(data)
            .then((user) => {
                if (user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};
exports.findUserByPk = async (data) => {
    try {
        // console.log(user)
        return await dataBot.Tutorial.findByPk(data);
    } catch (err) {
        console.log(err);
        throw err;
    }
};
async function findAndLogUserHelen(data) {
    // console.log('findAndLogUser(data)  - ' + data)
    // console.log(data)

    const user = await dataBot.Helen.findByPk(data);
    if (user) {
        console.log(`Пользователь с id = ${data}`);
        console.log(user.dataValues);
        return user.dataValues;
    } else {
        // console.log(`Пользователь не найден`);
        return null;
    }
}
exports.incrementIndexOfSend = async (chatId , index) => {
    const newIndexSend = Number(index) + 1
    dataBot.SendEmo.update({ index_send: newIndexSend }, {
        where: { chatId: chatId }
    })
}
exports.createSendHW = async ( data, indexWeek) => {
    // console.log('data_in_create =  ' +  data)
    // console.log(data)
    const newUser = {
        name_telegram: data.name_telegram,
        first_name_telegram: data.first_name_telegram,
        last_name_telegram: data.last_name_telegram,
        email_telegram: data.email_telegram,
        real_name_telegram: data.real_name_telegram,
        baby_name_telegram: data.baby_name_telegram,
        birthday_telegram: data.birthday_telegram,
        chatId: data.chatId,
        index_week: indexWeek,
        note: "new"
    };
    console.log('newUser = ', newUser )
    dataBot.Intensive.create(newUser)
        .catch(err => {
            console.log(err)
        })
};
exports.createNewSendEmo = async (data) => {
    // console.log('data_in_create =  ' +  data)
    const user = await dataBot.SendEmo.findByPk(data.chatId);
    if (user) {
        // console.log(`Пользователь найден`);
    } else {
        const newUser = {
            chatId: data.chatId,
            name_telegram: data.name_telegram,
            first_name_telegram: data.first_name_telegram,
            last_name_telegram: data.last_name_telegram,
            baby_name_telegram: data.baby_name_telegram,
            birthday_telegram: data.birthday_telegram,
            real_name_telegram: data.real_name_telegram,
            email_telegram: data.email_telegram,
            choice_emo: data.choice_emo,
            index_send: 0,
            registrationDate: new Date,
            index_week: data.index_week
        };
        console.log('newUserEmo = ', newUser)
        dataBot.SendEmo.create(newUser)
            .catch(err => {
                console.log(err)
            })
    }
};