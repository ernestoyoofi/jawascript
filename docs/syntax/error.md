# Syntax Error

If you want to take the problem on asyncronus or not so that the script does not close immediately you can use like this

```js
nyobake {
  mbalangi perkoroAnyar("Oops!")
} njupuk(e) {
  infoPerkoro(a. stack)
} akire {
  catetan("Rampung!")
}
```

Then the above script becomes like this

```js
try {
  throw new Error("Oops!")
} catch(e) {
  console.error(a.stack)
} finally {
  console.log("Rampung!")
}
```
