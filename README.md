# 取名辅助 [![Build Status](https://travis-ci.org/kaiye/quming.svg?branch=master)](https://travis-ci.org/kaiye/quming)

国家开放二胎了你造吗？ (⊙ˍ⊙)

是不是还在苦恼给娃儿取啥名？ (⊙ˍ⊙)

好听的名字是需要有诗意的你造吗？ (⊙ˍ⊙)


## 使用方法

```
var SearchSong = require('./index');

SearchSong({
  text : '叶',          // 需要查找的字或者词语
  debug: { num: 2 },    //debug 选项仅供调试，正式使用的时候可以删掉
  nolastWord : true     // true 了之后，会过滤掉以这个字结尾的结果
}).then(function(result){
    console.log(result);
});
```

