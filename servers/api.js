import axios from 'axios'
let base = '/db'
export const saveCustomerList = params => {
  return axios.post(`${base}/customer/save`, params)
}
export const editCustomerList = params => {
  return axios.post(`${base}/customer/edit`, params)
}
export const getCustomerList = params => {
  return axios.get(`${base}/customer/find`, params)
}
export const queryCustomerList = params => {
  return axios.post(`${base}/customer/query`, params)
}
export const delCustomerList = params => {
  return axios.post(`${base}/customer/del`, params)
}
