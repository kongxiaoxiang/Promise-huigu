function Promise (excutor){
  const self = this
  this.data = ''
  this.status = 'pending' //当前promise的状态
  function reslove (value){
    // if(self.status !== 'pending') return;
    self.data = value
    self.status = 'resloved' //成功的promise
  }
  function reject (reason){
    // if(self.status !== 'pending') return;
    self.data = reason
    self.status = 'rejected' //失败的promise
  }

  try {
    excutor(reslove,reject);
  } catch (error) {
    reject (error)
  }
}


Promise.prototype.then = function(onResloved,onRjected){
  const self = this
  // console.log(self.data)
  //如果promise成功了
  if(self.status === 'resloved'){
    onResloved(self.data)
  }
  //如果promise失败了
  if(self.status === 'rejected'){
    onRjected(self.data)
  }
}