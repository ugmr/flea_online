const Core = require('@alicloud/pop-core');
const smsConfig = require('../config/aliSDK');
const redisDb = require('../model/redis');
const {CError, ERROR} = require('../libs/error');
// sms client
const client = new Core({
  accessKeyId: smsConfig.accessKeyId,
  accessKeySecret: smsConfig.accessSecret,
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});
// 验证码过期时间
const expire = 5 * 60;
// 产生6位随机数(用来生成短信验证码的)
const getCode = function () {
  let str = "";
  for (let i = 0; i < 6; i++) {
    str += parseInt(Math.random() * 10);
  }
  return str;
}
// 发送验证码短信
const sendSMS = async function (mobile) {
  const code = getCode();
  const params = {
    "RegionId": "cn-hangzhou",
    "PhoneNumbers": mobile,
    "SignName": smsConfig.SignName,
    "TemplateCode": smsConfig.TemplateCode,
    "TemplateParam": code
  };
  const requestOption = {
    method: 'POST'
  };
  // 写入redis
  await redisDb.set(0, mobile, code, expire)
  // 发送验证码短信
  //return await client.request('SendSms', params, requestOption);
  return true;
}
// 验证验证码是否正确
const verify = async function (id, code) {
  const res = await redisDb.get(redisDb.types.CAPTCHA, id);
  await redisDb.del(redisDb.types.CAPTCHA, id);
  return res == code;
};

module.exports = {
  getCode,
  sendSMS,
  verify
}