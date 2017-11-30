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
    document.body.removeChild(mask[0])
  }
}
const messages = {
  warning: (val = '这是一条警告提示！', time = 2) => {
    let options = {
      'type': 'warning',
      'text': val,
      'closetime': time
    }
    return message(options)
  },
  error: (val = '这是一条错误提示！', time = 2) => {
    let options = {
      'type': 'error',
      'text': val,
      'closetime': time
    }
    return message(options)
  },
  normal: (val = '这是一条普通提示！', time = 2) => {
    let options = {
      'type': 'normal',
      'text': val,
      'closetime': time
    }
    return message(options)
  },
  success: (val = '这是一条成功提示！', time = 2) => {
    let options = {
      'type': 'success',
      'text': val,
      'closetime': time
    }
    return message(options)
  }
}
function message (options) {
  let modal = document.body.querySelector('.custom-messages')
  if (!modal) {
    modal = document.createElement('div')
    modal.className = 'custom-messages'
    document.body.appendChild(modal)
  }
  let type = options.type
  let text = options.text
  let closetime = options.closetime
  let msg = document.createElement('div')
  msg.className = 'custom-message'
  let msgi = document.createElement('div')
  msgi.className = 'custom-message-item custom-message-' + type
  if (type === 'warning') {
    type = 'fa-exclamation-circle'
  } else if (type === 'success') {
    type = 'fa-check'
  } else if (type === 'error') {
    type = 'fa-times-circle'
  } else {
    type = 'fa-comment-o'
  }
  msgi.innerHTML = "<i class='fa " + type + "'></i>" + text
  msg.appendChild(msgi)
  modal.appendChild(msg)
  setTimeout(() => {
    modal.removeChild(msg)
  }, closetime * 1000)
}
export default {
  waiting,
  messages
}
