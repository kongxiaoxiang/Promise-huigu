function Promise(excutor) {
  const self = this //this指向
  self.data = '' //变量载体，储存变量
  self.status = 'pending' //此时promise的状态
  self.callbacks = [] //pending状态的共享数据

  function resolve(value) {
    self.data = value
    self.status = 'resolved'

    if (self.callbacks.length > 0) {
      self.callbacks.forEach(cb => {
        cb.onResolved()
      });
    }
  }

  function reject(reason) {
    self.data = reason
    self.status = 'rejected'

    if (self.callbacks.length > 0) {
      self.callbacks.forEach(cb => {
        cb.onRejected()
      })
    }
  }

  excutor(resolve, reject);
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  return new Promise((resolve, reject) => {
    //代码优化函数封装handle
    function handle(calllback){
      try {
        let result = calllback(self.data)
        if (result instanceof Promise) {
          result.then(
            value => {
              resolve(value)
            },
            reason => {
              reject(reason)
            }
          )
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    //如果是成功的promise
    if (self.status === 'resolved') {
      handle(onResolved)
    }
    //如果是失败的promise
    if (self.status === 'rejected') {
      handle(onRejected)
    }
    // 如果是pending状态的promise
    if (self.status === 'pending') {
      self.callbacks.push({
        onResolved: function () {
          handle(onResolved)
        },
        onRejected: function(){
          handle(onRejected)
        }
      })
    }
  })
}