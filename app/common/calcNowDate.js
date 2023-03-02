exports.calcNowDate = async () => {
    try {
        const allMonths = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        return day + " " + allMonths[month] + " " + year + " года"
    } catch (e) {
        console.log(e)
    }
}