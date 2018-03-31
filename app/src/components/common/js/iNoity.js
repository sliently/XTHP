const defaultNotification = {
    title: '消息提醒！',
    body: '您有一条新消息！',
    openurl: '',
    iconUrl: ''
}

export default class iNoity {
    constructor(config) {
        if (config) {
            this.init(config)
        }
    }
    init(config) {
        if (!config) {
            config = {};
        }
        // 判断是否含有通知和允许通知
        if (window.Notification && window.Notification.permission != 'granted') {
            window.Notification.requestPermission()
        }
        this.audio = config.audio || ''
        this.notification = config.notification || defaultNotification
            // this.notification = config.notification || defaultNotification;
            //初始化生成声音文件节点
        if (this.audio) {
            this.setURL(this.audio)
        }
        return this;
    }
    setURL(url) {
            if (url) {
                if (this.audioElm) {
                    this.audioElm.remove();
                }
                this.audioElm = createAudio(url);
                document.body.appendChild(this.audioElm);
            }
            return this;
        }
        // 循环播放
    loopPlay() {
            this.setURL();
            this.audioElm.loop = true;
            this.player();
            return this;
        }
        // 停止播放
    stopPlay() {
            this.audioElm && (this.audioElm.loop = false, this.audioElm.pause());
            return this;
        }
        //播放声音
    player() {
        if (!this.audio) {
            return;
        }
        if (!this.audioElm) {
            this.audioElm = createAudio(this.audio.file);
            document.body.appendChild(this.audioElm)
        }
        this.audioElm.play();
        return this;
    }
    notify(json) {
        let nt = this.notification
        let onclick = json.onclick ? json.onclick : this.onclick
        if ('Notification' in window) {
            let option = {}
            option.icon = json.icon ? json.icon : nt.iconUrl
            option.body = json.body ? json.body : nt.body
            let title = json.title ? json.title : nt.title
                // 文字显示方向默认为auto
            if (json.dir) option.dir = json.dir
            let n = new Notification(title, option)
            n.onclick = () => {
                if (onclick && typeof onclick === 'function') {
                    onclick(n)
                }
            }
            n.onclose = function() {
                if (json.onclose && typeof json.onclose === 'function') {
                    json.onclose(n)
                }
            }
            setTimeout(() => {
                n.close()
            }, 3000)
            n.onerror = function() {
                if (json.onerror && typeof json.onerror === 'function') {
                    json.onerror(n)
                }
            }
            return this
        }
    }
    isPermission() {
        return window.Notification && Notification.permission === "granted" ? true : false
    }
}
//获取文件后缀
function getExtension(file_name) {
    return file_name.match(/\.([^\.]+)$/)[1];
}
// 创建audio节点
function createAudio(url) {
    let audioElm = document.createElement('audio'),
        source
    if (isArray(url) && url.length > 0) {
        for (let i = 0; i < url.length; i++) {
            source = audioElm.createElement('source')
            source.url = url[i]
            source.type = "audio/" + getExtension(url[i])
            audioElm.appendChild(source)
        }
    } else {
        audioElm.src = url;
    }
    return audioElm;
}

function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}