export function getFileSize(fileByte) {
    var fileSizeByte = fileByte;
    var fileSizeMsg = "";
    if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(1) + "KB";
    else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(1) + "MB";
    else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    else fileSizeMsg = "文件超过1TB";
    return fileSizeMsg;
}
export function IsURL(str_url) {
    var re = /(((http|ftp|https):\/\/)?)+[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/g
    let arr
    let msg = str_url
    if (re.test(str_url)) {
        arr = str_url.match(re)
        for (let i = 0; i < arr.length; i++) {
            //   匹配里面的中文
            let htp = /((http|ftp|https):\/\/)/g
            let ele
            if (htp.test(arr[i])) {
                ele = `<a href='${arr[i]}'>${arr[i]}</a>`
            } else {
                ele = `<a href='http://${arr[i]}'>${arr[i]}</a>`
            }
            msg = msg.replace(arr[i], ele)
        }
    }
    return msg
}