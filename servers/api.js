import axios from 'axios'
let base = '/db'
export const saveUserList = params => {
  return axios.post(`${base}/user/save`, params)
}
export const editUserList = params => {
  return axios.post(`${base}/user/edit`, params)
}
export const getUserList = params => {
  return axios.get(`${base}/user/find`, params)
}
export const queryUserList = params => {
  return axios.post(`${base}/user/query`, params)
}
export const delUserList = params => {
  return axios.post(`${base}/user/del`, params)
}
export const saveMusic = params => {
  return axios.post(`${base}/musicList/save`, params)
}
export const delMusic = params => {
  return axios.post(`${base}/musicList/del`, params)
}
export const getMusicList = params => {
  return axios.post(`${base}/musicList/getList`, params)
}
export const saveMusicList = params => {
  return axios.post(`${base}/musicList/saveList`, params)
}
