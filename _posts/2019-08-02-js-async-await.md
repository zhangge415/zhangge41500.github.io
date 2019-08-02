---
title: async与await的用法详解
layout: post
categories: JavaScript
tags: asnyc await 异步
excerpt: 关于异步函数中async与await的用法详解
---
# async

用于声明异步函数，返回值为一个 `Promise` 对象，它以类似同步的方法来写异步方法，语法与声明函数类似，例如：
```js
async function fn() {
    console.log('Hello world!');
}

console.log(fn().constructor); // Promise()
// 这里证明其返回值为一个 Promise 对象；
```

也许会有疑问，返回值是 Promise 对象，那么函数本身定义的返回值跑到哪里去了呢？其实，熟悉 Promise 的就知道其异步结果是通过 `.then()` 或者 `.catch()` 方法来获取并进行进一步处理的，这样一个道理，定义的异步函数中的返回值会当成 `resolve` 状态来处理，一般用 `.then()` 方法处理，而如果定义的异步函数抛出错误，例如变量未定义，则会被当做 `reject` 状态来处理，一般使用 `.catch()` 方法来处理；

举例：
```js
// 使用 .then() 的情况
async function fn1() {
    return 'Hello world!';
}

fn1().then(function(res) {
    console.log(res);
});
// Hello world!

// 使用 .catch() 的情况
async function fn2() {
    console.log(aaa); // 这里的变量 aaa 未定义，为了制造错误
}

fn2().catch(function(error) {
    console.log(error);
});
// ReferenceError: aaa is not defined
```

假如是既有返回值，又有错误的话，来看看结果如何：
```js
async function fn3(){
    console.log(aaa); // aaa 依然未定义；
    return 'Hello world!';
}

fn3().then(function(res){
    console.log(res);
}).catch(function(error){
    console.log(error);
});
// ReferenceError: aaa is not defined
```

结果证明只会执行 `reject` 状态的情况下的语句，忽略了 `resolve` 时的代码，所以此处值得 **注意**；

# await

用法顾名思义，有**等待**的意思，语法为：
```js
var value = await myPromise();
```

**注意** `await` 必须在 `async function` 内使用，否则会提示语法错误；

这里的 `myPromise()` 是一个 Promise对象，而自定义的变量 `value` 则用于获取 Promise 对象返回的 **resolve** 状态值，如果 await 后面跟的是其他值，则直接返回该值；

所以，所谓**等待**其实就是指暂停当前 `async function` 内部语句的执行，等待后面的 `Promise` 处理完返回结果后，继续执行 `async function` 函数内部的剩余语句；

举例：
```js
async function fn(){
    console.log(1);
    var result = await new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(2);
        }, 2000);
    });
	console.log(result);
    console.log(3);
    console.log(await 4); // 4 会被直接返回
}
fn();
// 1
// 2 (2 秒后输出)
// 3
// 4
```

如果 await 后面的 Promise 返回一个 `reject` 状态的结果的话，则会被当成错误在后台抛出，例如：
```js
async function fn(){
    console.log(1);
    var result = await new Promise(function(resolve, reject){
        setTimeout(function(){
            reject(2);
        }, 2000);
    });
    console.log(3);
}
fn();
// 1
// Uncaught (in promise) 2 (2 秒后输出)
```

如上，2 秒后会抛出出错误，并且 3 这个数并没有被输出，说明后面的执行也被忽略了；

另外，await 后面的 Promise 返回的 reject， 也可以被该 async 函数返回的 Promise 对象以 reject 状态获取，例如：
```js
async function fn(){
    console.log(1);
    var result = await new Promise(function(resolve, reject){
        setTimeout(function(){
            reject(2);
        }, 2000);
    });
    console.log(3);
}
fn().catch(function(error){
    console.log(error);
});
// 1
// 2 (2 秒后输出)
```

这种情况就不会以错误抛出，直接对异常值进行了处理，并且最后同样没有输出数字 3，即后面的代码依然被忽略了；