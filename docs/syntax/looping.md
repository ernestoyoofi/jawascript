# Syntax Looping

There is only one looping system at the moment, it is not possible to implement all of them because it is difficult.

Here if you want to use `for` as looping data you can replace it with `ubengi` which means “to loop”.

For example:

```js
ubengi(let a of [1,2,3]) {
  catetan(a)
}
// become as
for(let a of [1,2,3]) {
  console.log(a)
}
```