const express = require('express')
const router = express.Router()
const Mock = require('mockjs')
// 主要使用Mock.random生成随机数
const Random = Mock.Random

// 公司介绍
router.get('/contact', (req, res) => {
  let item = Mock.mock({
    address: Random.csentence(13, 16),
    code: Random.integer(6),
    email: Random.email(),
    fax: Random.integer(8),
    introduce_cn: Random.csentence(400, 450),
    introduce_en: Random.sentence(200, 230),
    phone: Random.integer(8)
  })
  let data = {
    data: item,
    description: 'OK',
    description_cn: '',
    errcode: 0
  }
  res.json(data)
})

// 信息反馈
router.post('/message', (req, res) => {
  res.json({
    errcode: 0,
    description: 'OK',
    description_cn: ''
  })
})

// 首页的banner
router.get('/banner', (req, res) => {
  const imgArr = []
  for (let i = 0; i < 3; i++) {
    imgArr.push({
      img_url: Random.image('600x400'),
      pid: `${i}`
    })
  }
  res.json({
    data: imgArr,
    description: 'OK',
    description_cn: '',
    errcode: 0
  })
})

module.exports = router
