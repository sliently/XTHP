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
        this.audio = config.audio || '';
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
    notify() {

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