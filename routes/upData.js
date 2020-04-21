const express = require('express')
const router = express.Router()
const fs = require('fs')
const formidable = require('formidable')
const sd = require('silly-datetime')



module.exports = router.post('/upData', function(req, res, next) {
  let AVATAR_UPLOAD_FOLDER = '/data';
  //创建上传表单
  var form = new formidable.IncomingForm();
  //设置编码格式
  form.encoding = 'utf-8';
  //设置上传目录
  form.uploadDir = './public' + AVATAR_UPLOAD_FOLDER;
  //保留后缀
  form.keepExtensions = true;
  //文件大小
  form.maxFieldsSize = 2 * 1024 * 1024;
  form.parse(req, function(err, fields, files) {
    let filesFile = files.file
    if (err) {
      return res.json({
        status: 206,
        msg: "内部服务器错误",
        result: ''
      })
    }
    let size = ''
    const limit = files.file.size
    if (limit < 0.1 * 1024) { //小于0.1KB，则转化成B
      size = limit.toFixed(2) + "B"
    } else if (limit < 0.1 * 1024 * 1024) { //小于0.1MB，则转化成KB
      size = (limit / 1024).toFixed(2) + "KB"
    } else if (limit < 0.1 * 1024 * 1024 * 1024) { //小于0.1GB，则转化成MB
      size = (limit / (1024 * 1024)).toFixed(2) + "MB"
    } else { //其他转化成GB
      size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB"
    }
    const index = files.file.path.lastIndexOf(".")
      //获取后缀
    const ext = files.file.path.substr(index + 1)

    // 新图片路径
    var newPath = form.uploadDir + '/' + files.file.name
    var dataPic = ''
    switch (ext) {
      case 'doc':
        dataPic = 'http://127.0.0.1:3000/public/img/defaultDOCPic.png';
        break;
      case 'zip':
        dataPic = 'http://127.0.0.1:3000/public/img/defaultZIPPic.png';
        break;
      case 'ppt':
        dataPic = 'http://127.0.0.1:3000/public/img/defaultPPTPic.png';
        break;
      case 'pdf':
        dataPic = 'http://127.0.0.1:3000/public/img/defaultPDFPic.png';
        break;
      case 'jpg':
        dataPic = 'http://127.0.0.1:3000/public/img/defaultJPGPic.png';
        break;
      case 'mp4':
        dataPic = 'http://127.0.0.1:3000/public/img/defaultVideoPic.png';
        break;
      case 'mp3':
        dataPic = 'http://127.0.0.1:3000/public/img/mp3.png';
        break;
      default:
        dataPic = 'http://127.0.0.1:3000/public/img/others.png';
        break;
    }
    console.log(dataPic);

    // fs.rename(files.file.path, files.file.path, function(err) {
    fs.rename(files.file.path, newPath, (err) => {
      if (err) {
        return res.send({
          status: 204,
          msg: '上传失败',
          ext
        })
      } else {
        const datapath = 'http://127.0.0.1:3000/public/data/' + files.file.name
        return res.send({
          status: 200,
          msg: "文件上传成功",
          result: {
            name: files.file.name,
            path: datapath,
            pic: dataPic,
            size: size
          }
        })
      }
    })
  })
})