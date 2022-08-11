const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED;
        console.log("resolve被调用" + value);
        this.value = value;
      }
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED;
        this.reason = reason;
        console.log("reject被调用" + reason);
      }
    };
    executor(resolve, reject);
  }
  then(()=>{

  })
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending");
  reject(1231223233);
  resolve(123123);
});
