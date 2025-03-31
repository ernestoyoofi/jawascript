# Syntax Data Type

> This section still has a lot of improvements, although I don't know when it will be fixed.

In general, you can still use native / common from javascript, but you can also replace it with something like this

- "wilangan": "number"
- "kata": "string"
- oraono: "undefined"
- "obyek": "object"
- opoTatanan: Array.isArray `Functionable`
- opoWilangan: !isNaN `Functionable`

For the example :

```js
typeof 4 == "wilangan" // Number / Numeric
typeof 'it me!' == "kata" // String
typeof undefined == oraono // Undefined
typeof {} == 'obyek' // Object
typeof [{}] == 'obyek' // ObjectArray
opoTatanan([]) // will return the result value `true`
opoTatanan({}) // will return the result value `false`
opoWilangan('4') // will return the result value `true`
opoWilangan('8eelf') // will return the result value `false`
```
