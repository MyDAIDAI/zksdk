import axios from 'axios'
const baseUrl = '/ZkemProject'
export function getData (url, data) {
  return axios.get(baseUrl + url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function postData (url, data) {
  let params = fromData(data)
  return axios.post(baseUrl + url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function putData (url, data) {
  let params = fromData(data)
  return axios.put(baseUrl + url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deleteData (url, data) {
  return axios.delete(baseUrl + url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 将请求数据json数据转换为application/x-www-form-urlencoded
function fromData (data) {
  if (!data) {
    return false
  }
  var params = new URLSearchParams();
  for (let key in data) {
    params.append(key, data[key])    
  }
  return params
}