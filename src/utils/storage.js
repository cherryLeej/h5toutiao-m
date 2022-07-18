const TOKEN_KEY = 'token_user'
/**
 * 存token
 */
export const setToken = (value) => {
  // 本地缓存只能存储字符串类型的数据，如果需要存储的数据是数组对象类型，那么需要转成json字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem('TOKEN_KEY', value)
}


/**
 * 获取token
 */
export const getToken = () => {
  const data = localStorage.getItem('TOKEN_KEY')
  // 如果获取的token的是数组对象类型，那么需要把json字符串类型 转成 json对象类型
  try {
    // 开始进入到 try 里面，如果获取到的本地缓存是json字符串类型，那么就转成 json对象类型，并且return出去，
    // 如果 try 里面报错，则会进入到catch里面，说明获取的缓存不是json字符串类型
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}


/**
 * 删除token
 */
export const removeToken = (key) => {
  localStorage.removeItem(key)
}
