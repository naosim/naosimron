title: enchant.jsとかをサクっとセットアップする
date: 2015-07-19 11:11:11
tags: shell
---
「enchantでちょっとゲームでも作ろっかなー」て思ったら
ググって、ライブラリをzipで落として、解凍して、jsを取り出して・・・
って意外に面倒だったので
シェルスクリプト作った。

enchant setup
```
mkdir js
mkdir img

if [ ! -e js/enchant ]; then
  git clone --depth 1 https://github.com/uei/enchant.js-builds.git
  cp -r enchant.js-builds/build js/enchant
  cp -r enchant.js-builds/images img/enchant
  rm -rf enchant.js-builds
fi
```

ちなみにこっちがpixi.js

pixi setup
```
mkdir js
mkdir img

if [ ! -e js/pixi ]; then
  git clone --depth 1 https://github.com/GoodBoyDigital/pixi.js.git
  cp -r pixi.js/bin js/pixi
  rm -rf pixi.js
fi
```
