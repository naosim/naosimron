title: HexoのCSSが更新されない
date: 2014-12-30 17:01:37
tags: [dev, hexo]
---
Hexoでgenerate変更が反映されないことが何回かおきた。
自分のプログラムの問題だと思ってバグ探しをしたけど
みあたらない。
結局またHexoの問題でした。
Hexoのトラブルシューティングに書いてあった。

> ** Stylesheets Not Updated **

> You may find that stylesheets updated in Hexo server but not applied to static files. It’s because Hexo compares modified date of files when generating. You can clean cache to solve this problem.

> ` $ hexo clean `

> [引用元: Troubleshooting | Hexo](http://hexo.io/docs/troubleshooting.html#Stylesheets_Not_Updated)

クリーンしろって。
たかがcssを1行変更しただけでクリーンするのかー。
試しにcssだけ消してみたら、再生成してくれたから
とりあえずこれでいいか。

ゆくゆくは記事投稿サーバ側でgit pullしたら
「レイアウト系ファイルに変更があったらcssを削除してジェネレート」
って処理をいれたいな。
