const express = require('express')
const router = express.Router()
const Mock = require('mockjs')
const Random = Mock.Random

// 产品列表
router.get('/productlist', (req, res) => {
  let category_list = [
    {category_id: '1', name: '唇部'},
    {category_id: '2', name: '眼部'},
    {category_id: '3', name: '脸部'},
    {category_id: '4', name: '套装'}
  ]
  let product_list = []
  for (let i = 0; i < 20; i++) {
    let category_id = `${i%4+1}`
    let type_id
    switch (category_id) {
      case '1':
        type_id = `${Math.round(Math.random() + 1)}`
        break
      case '2':
        type_id = `${Math.round(Math.random() * 2 + 1)}`
        break
      default:
        type_id = '1'
        break
    }
    let item = {
      category_id,
      id: `${i}`,
      img_url: Random.image('200x200'),
      name: Random.word(3, 7),
      type: Random.cword(2),
      type_id
    }
    product_list.push(item)
  }
  res.json({
    data: {
      category_list,
      product_list
    },
    description: 'OK',
    description_cn: '',
    errcode: 0
  })
})

// 产品详细信息
router.get('/info', (req, res) => {
  res.json({
    data: {
      category: Random.cword(2),
      category_id: `${Math.round(Math.random() * 3 + 1)}`,
      content: `<img src=${Random.image('600x400')}>`,
      name: Random.word(3, 7),
      type: Random.cword(2),
      type_id: '1'
    },
    description: 'OK',
    description_cn: '',
    errcode: 0
  })
})

// 搜索
router.get('/search', (req, res) => {
  let productArr = []
  for(let i = 0; i < 4; i++) {
    productArr.push({
      id: `${Math.round(Math.random() * 3 + 1)}`,
      img_url: Random.image('200x200'),
      name: `${req.query.key}_${Random.word(3, 4)}`
    })
  }
  res.json({
    data: productArr,
    description: 'OK',
    description_cn: '',
    errcode: 0
  })
})

module.exports = router
