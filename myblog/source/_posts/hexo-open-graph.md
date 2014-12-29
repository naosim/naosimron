title: HexoのOpenGraphのURLがおかしい。
date: 2014-12-30 07:00:00
tags: [dev, hexo, js]
---
Hexoで盛大にハマりました。。
configのURLの説明には
> If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'

って書いてあるから、それに従って
```
url: http://naosim.sakura.ne.jp/blog
root: /blog/
```
って設定したのに
なぜかOpenGraphの参照URLが
```
http://naosim.sakura.ne.jp/blog/blog/...
```
って感じでblogが２つ重なった。。

これはマズいってことで
urlのblogを削ったり、rootのblogを削ったりしてみたけど
こっちを直すとあっちがバグりって感じで全然ダメ。
どうやらurlって変数にバグがあるっぽい。

もう強引にやるしかない！！ってことで
無理矢理設定して解決したのでメモ。
（たぶんHexo側でバグ修正されたタイミングでダメになるので備忘録的な）

- _config.ymlにベースのURLを追加する

  ```
  url: http://naosim.sakura.ne.jp/blog
  root: /blog/
  base_url: http://naosim.sakura.ne.jp
  ```
- OpenGraphの設定値を強引に設定する（自分の場合はhead.ejs）

  ```
  open_graph({url: config.base_url + url.substring(config.url.length), ...
  ```

  urlから/blog/以前を切って、ベースのURLに結合します。
  とりあえず解決したけど、なんだこれって感じだな。。
