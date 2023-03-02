const convertBirthdate = require('./convertBirth')

exports.calculateMonthsSinceBirth = async (birthdate) =>{
    let newBirthdate = await convertBirthdate(birthdate)
    const today = new Date();
    let months = (today.getFullYear() - newBirthdate.getFullYear()) * 12 + today.getMonth() - newBirthdate.getMonth();
    if (today.getDate() < newBirthdate.getDate()) {
        const newFrom = new Date(today.getFullYear(), today.getMonth(), newBirthdate.getDate())
        if (today < newFrom && today.getMonth() === newFrom.getMonth() && today.getFullYear() % 4 !== 0) {
            months--
        }
    }
    return months
}
