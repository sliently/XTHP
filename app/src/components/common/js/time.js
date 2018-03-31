export default function(obj) {
    let date = new Date(obj)
    let Hours = date.getHours(),
        minutes = date.getMinutes(),
        time
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (Hours > 12) {
        Hours = Hours - 12
        time = `${Hours}:${minutes} 下午`
    } else {
        time = `${Hours}:${minutes} 上午`
    }
    return time
}