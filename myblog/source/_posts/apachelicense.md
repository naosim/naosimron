title: Apache Licenseを生成するワンライナー
date: 2015-04-12 08:26:53
tags: dev
---
サっと生成できたら便利かなーと思って作ってみた。
ググってコピペした方が早い気もする。

## 実行
```
curl -o LICENSE.txt "http://naosim.sakura.ne.jp/app/apache?name=yourname"
```

## 実行結果
↓ これがLICENSE.txtってファイルに出力されます。
```
Copyright 2015 yourname

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
西暦と名前には入力した値が入ります。

## API仕様
- URL: http://naosim.sakura.ne.jp/app/apache
- METHOD: GET
- PARAM:

|key   | 必須 | 説明                                   |
|------|:----:|----------------------------------------|
| name |  ◯  | 名前                                   |
| year |      | 西暦<br>省略した場合は今年が設定される |
