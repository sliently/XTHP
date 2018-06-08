const avatar = ['avatar1.jpg',
    'avatar2.jpg', 'avatar3.jpg',
    'avatar4.jpg', 'avatar5.jpg',
    'avatar6.jpg', 'avatar7.jpg',
    'avatar8.jpg', 'avatar9.jpg']
const url = 'http://lhp313-1253555032.coscd.myqcloud.com/avatar/default/'
module.exports = function() {
    let a = Math.floor(Math.random() * 9)
    return url + avatar[a]
}