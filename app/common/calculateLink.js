exports.calculateAllIndexOfLink = async (fullWeek) =>{
    const today = new Date();
    const dayOfWeek = today.getUTCDay();
    // console.log("dayOfWeek ----- ", dayOfWeek )
    let indexLink = null
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        indexLink = (fullWeek <= 9 ? "0" + fullWeek : fullWeek) + "-01";
    } else if (dayOfWeek <= 5) {
        indexLink = (fullWeek <= 9 ? "0" + fullWeek : fullWeek) + "-0" + dayOfWeek;
    }
    // console.log("indexLink --- ", indexLink)
    return indexLink
}