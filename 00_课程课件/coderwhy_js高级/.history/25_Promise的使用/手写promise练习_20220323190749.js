const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED;
        queueMicrotask(() => {
          console.log("resolve被调用" + value);
          this.value = value;
          this.onFulfilledFns.forEach((Fn) => {
            Fn(this.value);
          });
        });
      }
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED;
        queueMicrotask(() => {
          this.reason = reason;
          console.log("reject被调用" + reason);
          this.onRejectedFns.forEach((Fn) => {
            Fn(this.reason);
          });
        });
      }
    };
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    this.onFulfilledFns.push(onFulfilled);
    this.onRejectedFns.push(onRejected);
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending");
  resolve(123123);
  reject(1231223233);
});

promise.then(
  (res) => {
    console.log("res1:", res);
    return 123;
  },
  (err) => {
    console.log("err1:", err);
    return 456;
  }
);
promise.then(
  (res) => {
    console.log("res2:", res);
    return 1232323;
  },
  (err) => {
    console.log("err2:", err);
    return 4562323;
  }
);
