function Promise (excutor){
  const self = this
  self.data = ''
  self.status = 'pending' //此时promise的状态
  self.callbacks = []

  function reslove (value){
    // console.log(value)
    // if(self.status !== 'pending') return;
    self.data = value
    self.status = 'resloved'

    if(self.callbacks.length > 0){
      self.callbacks.forEach(cb => {
        cb.onResloved(self.data)
      });
    }
  }

  function reject (reason){
    // if(self.status !== 'pending') return;
    self.data = reason
    self.status = 'rejected'


    if(self.callbacks.length >0){
      self.callbacks.forEach(cb =>{
        cb.onRejected(self.data)
      })
    }
  }
    excutor(reslove,reject);
}


Promise.prototype.then = function(onResloved,onRejected){
  const self = this
  // console.log(self.data)
  //如果是成功的promise
  if(self.status === 'resloved'){
    onResloved(self.data)
  }
  //如果是失败的promise
  if(self.status === 'rejected'){
    onRejected(self.data)
  }
  //如果是pending状态的promise
  if(self.status === 'pending'){
    self.callbacks.push({
      onResloved,
      onRejected
    })
  }
}