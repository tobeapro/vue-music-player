/**
 * Created by Administrator on 2017/11/29.
 */
const waiting = {
  show: () => {
    let wait = document.createElement('div')
    wait.className = 'custom-waiting'
    document.body.appendChild(wait)
  },
  hide: () => {
    let mask = document.querySelectorAll('.custom-waiting')
    document.body.removeChild(mask)
  }
}
const tip = {
  warning: (val = '警告消息') => {
    let msg = document.createElement('div')
    msg.className = 'custom-tip'
    let icon = document.createElement('i')
    icon.className = 'fa fa-exclamation'
    msg.appendChild(icon)
    let text = document.createElement('span')
    text.className = 'custom-tip-text'
    text.innerHTML = val
    msg.appendChild(text)
    document.body.appendChild(msg)
  }
}
export default {
  waiting,
  tip
}
