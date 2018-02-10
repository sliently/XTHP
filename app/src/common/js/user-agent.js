export default function() {
    let userAgent = navigator.userAgent
    let Win = new RegExp('Windows'),
        iPhone = new RegExp('iPhone'),
        iPad = new RegExp('iPad'),
        Android = new RegExp('Android'),
        Mac = new RegExp('Macintosh')
    if (Win.test(userAgent)) {
        return "[ Win ]"
    }
    if (iPhone.test(userAgent)) {
        return "[ iPhone ]"
    }
    if (iPad.test(userAgent)) {
        return "[ iPad ]"
    }
    if (Android.test(userAgent)) {
        return "[ Android ]"
    }
    if (Mac.test(userAgent)) {
        return "[ Mac ]"
    }
}
// "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.4549.400 QQBrowser/9.7.12900.400"
// "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25"
// "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25"
// "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36"
// "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A"