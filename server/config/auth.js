const randomPath = require('./random'),
    fs = require('fs'),
    COS = require('cos-nodejs-sdk-v5'),
    AppId = require('./cr-config').AppId,
    SecretId = require('./cr-config').SecretId,
    SecretKey = require('./cr-config').SecretKey,
    Bucket = require('./cr-config').Bucket,
    Region = require('./cr-config').Region
module.exports = function(obj, file) {
    return new Promise((resolve, reject) => {
        let dd = randomPath(5)
        let path = `./file/${obj}/${dd}${file.name}`
        let webpath = `${obj}/${dd}${file.name}`
        fs.writeFile(path, file.file, (err) => {
            if (err) {
                reject(err)
            }
            var cos = new COS({
                AppId: AppId,
                SecretId: SecretId,
                SecretKey: SecretKey,
            });
            cos.sliceUploadFile({
                Bucket: Bucket,
                Region: Region,
                Key: webpath,
                FilePath: path
            }, async(err, data) => {
                if (err) {
                    reject(err)
                }
                resolve({ data })
            });
        })
    })

}