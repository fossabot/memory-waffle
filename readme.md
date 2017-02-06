
# memory-waffle

`mw` accepts a `ready` callback of the signature `function(prompt) {}`. omitting this callback will call [`interface#prompt`](http://devdocs.io/node/readline#readline_rl_prompt_preservecursor) for you.

```javascript
var mw = require('memory-waffle')

mw({
  frobnicate: function(a, b, done) {
    foobar(a, b)
    done()
  }
}, '$ ', function(prompt) {
  // maybe you need to do something to set up?
  // invoke `prompt` when you're ready to begin
})
```
