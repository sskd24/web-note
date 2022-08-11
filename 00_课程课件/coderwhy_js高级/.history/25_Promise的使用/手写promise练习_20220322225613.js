const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

class HYPromise {
  constructor(executor) {
      this.status = PROMISE_STATUS_PENDING;
    const resolve = (value) => {
        if()=>{
            
        }
      console.log("resolve被调用");
    };
    const reject = (reason) => {
      console.log("reject被调用");
    };
    executor(resolve, reject);
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending");
  resolve();
});
