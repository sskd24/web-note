class HYPromise {
 constructor(executor) {
     executor()
 }
}


const promise = new HYPromise(()={
console.log("状态pending"));
});