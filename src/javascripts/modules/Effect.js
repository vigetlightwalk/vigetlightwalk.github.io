export default class Effect {
  constructor() {
    this.name = ''
  }

  update() {
    return false
  }

  cares(x, y) {
    return false
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  mapFloat(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
  }
}