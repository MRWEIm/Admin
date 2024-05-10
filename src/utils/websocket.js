var url = 'ws://123.207.9.26:5000/bs/websocket'
var ws
var tt

// websocket对象
var websocket = {
  // websocket建立连接
  Init() {
    // 判断浏览器是否支持websocket
    if (!('WebSocket' in window)) {
      this.$modal.msgError('您的浏览器不支持WebSocket')
      return
    }

    ws = new WebSocket(url)

    ws.onopen = function () {
      console.log('连接成功')
    }

    ws.onerror = function (e) {
      console.log('数据传输发生错误', e)
      reconnect()
    }

    ws.onmessage = function (e) {
      console.log('接收后端消息:' + e.data)
      if (e.data === 'ok') {
        return
      }
    }
  },

  Close() {
    ws.close()
  },

  Send(data) {
    // 处理发送数据JSON字符串
    let msg = JSON.stringify(data)
    // 发送消息给后端
    ws.send(msg)
  },

  // 暴露websocket实例
  getwebsocket() {
    return ws
  },
}

window.onbeforeunload = function () {
  console.log('测试方法执行了')
  ws.close()
}

// 重连方法
function reconnect() {
  tt && clearTimeout(tt)
  tt = setTimeout(function () {
    console.log('执行断线重连')
    websocket.Init()
  }, 4000)
}

// 暴露对象
export default websocket
