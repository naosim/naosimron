title: WebComponentsをつかってみる
date: 2015-01-27 19:00:00
tags: [dev, javascript]
---

WebComponentsがはやってるっぽい。  
AndroidのMaterialDesignが発表されたあたりから気にはなっていたけど  
使ったことなかったので使ってみた。

## WebComponentsって？
独自タグを作れる技術です。  

今までたとえば、複数のサイトで同じヘッダーをつけるときに地味に大変でした。  
今までのやり方はこんな感じ。
- HTMLに一生懸命コピペする  
→ 内容の更新でコピペミスして死ぬ  
- iframeで外部HTMLを読み込む  
→ iframe間でjsが動かないとかいろいろ大変
- phpとかでテンプレートエンジン使う  
→ それだけのために書くの...めんどくせぇ

WebComponentsを使うと  
HTML+JSだけでスッキリ解決できます！

## ヘッダーとフッターを作ってみる
とりあえずサイトの共通項目としてよくあるヘッダーとフッターを作ってみます。
まずはindex.htmlから。

index.html
```html
<!DOCTYPE html>
<!-- テンプレートの読み込み -->
<link rel="import" href="mytemplate.html">

<body>
<!-- 独自タグのヘッダ -->
<my-header></my-header>

<h1>ほげほげコンテンツ</h1>
テキストテキストテキストテキストテキスト<br>
テキストテキストテキストテキストテキスト<br>
テキストテキストテキストテキストテキスト<br>

<!-- 独自タグのフッタ -->
<my-footer></my-footer>
</body>
```
独自タグとしてmy-headerとmy-footerをつけました。
これらのテンプレートは`<link rel="import" href="mytemplate.html">`で読み込んでいます。
次にヘッダーとフッターのテンプレートを作ります。

mytemplate.html
```html
<style>
.header {
  width: 100%;
  background: #eee;
  padding: 12px;
}
.footer {
  width: 100%;
  background: #eee;
  padding: 12px;
}
</style>

<template id="template-header">
<div class="header">home | page A | page B</div>
</template>

<template id="template-footer">
<div class="footer">コピーライト</div>
</template>


<script>
(function(){
  var imports = document.querySelector('link[rel="import"]').import;

  // テンプレートを独自タグとして登録する
  var registerTemplate = function(tagName, templateQuery) {
    var proto = Object.create(HTMLElement.prototype);
    proto.createdCallback = function() {
      // 生成後に呼ばれる
      // 表示したいHTMLをセットする
      this.innerHTML = imports.querySelector(templateQuery).innerHTML;
    };
    document.registerElement(tagName, {prototype: proto});
  };

  registerTemplate('my-header', '#template-header');
  registerTemplate('my-footer', '#template-footer');

  })();
  </script>
  ```
  要素が生成されると`proto.createdCallback`が呼ばれるのでそのタイミングで
  表示したい内容をセットしてあげます。  
  このコードでは上の方にあるテンプレートタグの部分を取得してセットしてます。
  もちろん`this.innerHTML = <div>hoge</div>;`みたいに文字列で直接書いてもOK。
  そして最後に`document.registerElement()`で独自のタグ名とその内容をひも付けて登録します。  
  以上でおわりです。

  タグを登録するコードを書くのは面倒だけど
  ググればイイ感じのライブラリがゴロゴロあるので
  実際はやらなくていいと思います。多分。

  ## できたー


  ![スクショ](http://naosim.sakura.ne.jp/app/webcomponentssample/screenshot.png)
  [実際のサイト](http://naosim.sakura.ne.jp/app/webcomponentssample/)  


  ヘッダーとフッターのついたサイトができましたー！簡単！


  ## これってIEでも使えんの？
  今は無理。  
  ただそこらへんをうまく吸収してくれるライブラリがある。  
  [Polymer](https://www.polymer-project.org/)が有名。  

  ## まとめ
  - WebComponents簡単！イイね！
  - 未対応ブラウザが多いから今はPolymer使え
