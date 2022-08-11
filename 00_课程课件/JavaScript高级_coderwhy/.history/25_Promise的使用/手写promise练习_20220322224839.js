class HYPromise {
  constructor(executor) {
    const resolve = (value) => {
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
