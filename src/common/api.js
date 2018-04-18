let isProduct = process.env.NODE_ENV === 'production'

const productAPI = {
  contact: '/home/company/contact',
  productlist: '/home/product/productlist',
  info: '/home/product/info',
  message: '/home/company/message',
  banner: '/home/company/banner',
  search: '/home/product/search'
}

const developAPI = {
  contact: '/api/home/company/contact',
  productlist: '/api/home/product/productlist',
  info: '/api/home/product/info',
  message: '/api/home/company/message',
  banner: '/api/home/company/banner',
  search: '/api/home/product/search'
}

let api = isProduct ? productAPI : developAPI

export default api
