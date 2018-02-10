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
    var strRegex = "^((https|http|ftp|rtsp|mms)?://){0,1}" +
        "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
        +
        "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
        +
        "|" // 允许IP和DOMAIN（域名）
        +
        "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
        +
        "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
        +
        "[a-z]{2,6})" // first level domain- .com or .museum 
        +
        "(:[0-9]{1,4})?" // 端口- :80 
        +
        "((/?)|" // a slash isn't required if there is no file name 
        +
        "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)";
    var re = new RegExp(strRegex);
    //re.test()
    return re
        // if (re.test(str_url)) {
        //     let str = re.exec(str_url)
        //     return {
        //         isTrue: true,
        //         str: str
        //     };
        // } else {
        //     return {
        //         isTrue: false
        //     };
        // }
}