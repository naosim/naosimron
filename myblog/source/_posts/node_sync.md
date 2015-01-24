title: nodeで適当にコールバック地獄をやめる
date: 2015-01-24 23:00:00
tags: [dev, javascript]
---

## コールバック地獄
jsで非同期処理書いてるとこんな感じになる。
ネストが深くて読みにくい。
```javascript
console.log('fitst');
setTimeout(function() {
  console.log('second');
  setTimeout(function() {
    console.log('third');
    setTimeout(function() {
      console.log('last');
    }, 1000);
  }, 1000);
}, 1000);

```
## 正しい解決方法
[Promise](http://azu.github.io/promises-book/)をつかう。
Promiseとは、非同期処理を上手く扱う為のAPIです。
今後、nodeとかに標準で入るとか入らないとか。

## とりあえず適当に解決する
そこまでしなくてもとりあえず解決したいときは
こんな感じの関数を作っておきます。
```javasctipt
var sync = function(tasks) {
  var i = 0;
  var callback = function() {
    if(i >= tasks.length) return;
    tasks[i++](callback);
  };
  callback();
};
```

これをつかうとネスト地獄がこうなります。
```javasctipt
sync([
  function(callback) {
    console.log('fitst');
    setTimeout(callback, 1000);
  },
  function(callback) {
    console.log('second');
    setTimeout(callback, 1000);
  },
  function(callback) {
    console.log('third');
    setTimeout(callback, 1000);
  },
  function(callback) {
    console.log('last');
  }
]);
```
ネストがへった！！！
