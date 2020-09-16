function Promise (excutor){
  const self = this
  self.data = ''
  self.status = 'pending' //此时的promise状态

  function reslove (value){
    self.data = value
    self.status = 'resloved'
  }
  function reject (reason){
    self.data = reason
    self.status = 'rejected'
  }

  excutor(reslove,reject); //调用执行器函数
}

Promise.prototype.then = function(onResloved,onRejected){
  const self = this
  //成功的promise
  return new Promise((reslove,reject)=>{
    if(self.status === 'resloved'){
      try {
        let result = onResloved(self.data)
        
        // if(result instanceof Promise){
        //   return new Promise()
        // }else{
        //   return new Promise((reslove,reject)=>{
        //     reslove (result)
        //   })
        // }


        //判断result是否为promise类型
        if(result instanceof Promise){
          result.then(
            value =>{
              reslove(value)
            },
            reason =>{
              reject(reason)
            }
          )
        }else{
          reslove (result)
        }
      } catch (error) {
          reject (error)
      }
    }
    //失败的promise
    if(self.status === 'rejected'){
      //判断result的类型是否为promise
      try {
        let result = onRejected(self.data)

        if(result instanceof Promise){
          result.then(
            value =>{
              reslove (value)
            },
            reason =>{
              reject (reason)
            }
          )
        }else{
          reslove (result)
        }
      } catch (error) {
        reject (error)
      }
    }
  })
}