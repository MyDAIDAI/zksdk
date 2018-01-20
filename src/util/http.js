import axios from 'axios'

export function getData (url, data) {
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function postData (url, data) {
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function putData (url, data) {
  return axios.put(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deleteData (url, data) {
  return axios.delete(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
