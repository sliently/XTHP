export function IsURL(str_url) {
    var re = /(((http|ftp|https):\/\/)?)+[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/g
    let arr, msg
    if (re.test(str_url)) {
        arr = str_url.match(re)[0]
        for (let i = 0; i < arr.length; i++) {
            //   匹配里面的中文
            let htp = /((http|ftp|https):\/\/)?/g
            let ele
            if (htp.test(arr[i])) {
                ele = `<a href='${arr[i]}'>${arr[i]}</a>`
            } else {
                ele = `<a href='http://${arr[i]}'>${arr[i]}<</a>`
            }
            msg = msg.replace(arr[i], ele)
        }
    }
    return msg
}