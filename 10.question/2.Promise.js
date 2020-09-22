function Promise (excutor){
  const self = this
  self.data ='' 
  self.status ='pending'
  self.callbacks = [] 

  function reslove (value){
    self.data = value 
    self.status = 'resloved'
    return new Promise((reslove,reject)=>{
      if(self.callbacks.length >0){
        self.callbacks.forEach(cb => {
          let result = cb.onResloved(self.data)
          if(result instanceof Promise){
          
          }else{
            reslove (result)
          }
        });
      }
    })
  }

  function reject (reason){
    self.data = reason
    self.status = 'rejected'
  }

  excutor (reslove,reject);
}

Promise.prototype.then = function(onResloved,onRejected){
  const self = this
  if(self.status === 'pending'){
    self.callbacks.push({
      onResloved,
      onRejected
    })
  }
}