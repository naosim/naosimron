title: サイトで使われてるjsを抽出する
date: 2015-03-29 16:00:00
tags: [dev, javascript]
---
最近、サイトを見ていて
「このサイト、何のjsつかってるんだろ」って思うことが多いので
簡単に抽出できるブックマークレット作った。
```
javascript:(function(){var ary = document.querySelectorAll('script');var result = "";for(var i = 0; i < ary.length; i++) {var src = ary[i].src;if(!src || src.indexOf('.js') == -1) continue;if(src.indexOf('?') != -1) src = src.slice(0, src.indexOf('?'));result += '- ' + src + '\n';}alert(result);console.log(result);})();
```

本ブログで使うと
こんな感じのがダイアログで出ます。
![ダイアログ](/blog/img/20150329_jsbookmarklet/dialog.png)
使ってるjsが一瞬でわかりますね。
(記事書きながら実行したのでlocalhostですが。)

こりゃ便利。
