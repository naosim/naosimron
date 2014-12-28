title: gitの更新をチェックするスクリプト
date: 2014-12-30 00:00:00
tags:
---
ブログの自動更新のプログラムで
gitのmasterが更新されているかをチェックする必要があったので作った。

```
git fetch
current=`git log --oneline master -1`
origin=`git log --oneline origin/master -1`
if [ "$current" = "$origin" ] ; then
  exit 0
fi
# do something...
```

jenkinsとかのCI環境で
「masterが変更されていたら何かする」みたいなやつがあるけど
あれってどうやってチェックしてんだろう。
