const fs = require('fs');
const qiniu = require("qiniu");
const logger = require('../../libs/log4j')('upload');
const { CError, ERROR } = require("../../libs/error");
const { accessKey, secretKey, bucket, imageUrl } = require('../../config/qiniu');

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: bucket,
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;

// 图片上传
const upload = (req, res) => {
  // 图片数据流
  const imgData = req.files.imgData;
  logger.info(imgData)

  const fileName = imgData.path.split('/').slice(-1)[0];

  const localFile = imgData.path;
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  const key = fileName;
  // 文件上传
  formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
    fs.unlinkSync(imgData.path);
    if (respErr) {
      throw new CError(ERROR.SERVER_ERROR, '上传失败');
    }
    if (respInfo.statusCode == 200) {
      const imageSrc = imageUrl + '/' + respBody.key;
      res.status(200).json({
        status: 'success',
        message: '上传成功',
        data: {
          imageUrl: imageSrc
        }
      });
    } else {
      console.log(respBody)
      throw new CError(ERROR.SERVER_ERROR, '上传失败');
    }
  });
}

module.exports = upload;
