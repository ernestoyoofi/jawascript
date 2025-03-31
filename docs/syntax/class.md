# Syntax Class

In general, you can also use it in javascript, but here you can also use it like this

```js
taterapan person {
  kontruksi() {
    this.name = "Person"
  }
  harisekarang() {
    return anyar Wektu()
  }
}
```

It will automatically become

```js
class person {
  constructor() {
    this.name = "Person"
  }
  harisekarang() {
    return new Date()
  }
}
```
