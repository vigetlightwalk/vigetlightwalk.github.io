import { REED_COUNT, PIXEL_COUNT } from './constants'
import Effect from './Effect'

class Drop {
  constructor(startTime, height, startPosition, velocity, color) {
    this.configure(startTime, height, startPosition, velocity, color)
  }

  configure(startTime, height, startPosition, velocity, color) {
    this.position = startPosition
    this.startPosition = startPosition
    this.height = height
    this.velocity = velocity
    this.startTime = startTime
    this.color = color
  }

  update(currentTime) {
    this.position = this.startPosition + (currentTime - this.startTime) * this.velocity
  }

  surrounds(y) {
    return this.position <= y && (this.position + this.height) > y
  }
}

export default class RainDown extends Effect {
  constructor() {
    super()
    this.name = 'Rainbow Rain'

    const currentTime = Date.now()
    this.drops = []

    for (let i = 0; i < REED_COUNT; i++){
      const height = this.random(3, 8);
      const startPosition = this.random(PIXEL_COUNT * -2, 0);
      const velocity = this.random(30, 60) * 1.0 / 1000;
      const color = this.generateColor()
      this.drops[i] = new Drop(currentTime, height, startPosition, velocity, color)
    }
  }

  update() {
    const currentTime = Date.now()
    for (let i = 0; i < this.drops.length; i++) {
      this.drops[i].update(currentTime)
      if (this.drops[i].position > PIXEL_COUNT) {
        this.restartDrop(i)
      }
    }
  }

  restartDrop(i) {
    const currentTime = Date.now()
    const height = this.random(3, 8);
    const startPosition = this.random(PIXEL_COUNT * -2, 0);
    const velocity = this.random(30, 60) * 1.0 / 1000;
    const color = this.generateColor()

    this.drops[i].configure(currentTime, height, startPosition, velocity, color)
  }

  cares(x, y) {
    return this.drops[x].surrounds(y)
  }

  colorFor(x) {
    return this.drops[x].color
  }

  generateColor() {
    return this.possibleColors[this.random(0, 11)]
    // return [this.random(0, 255), this.random(0, 255), this.random(0, 255)]
    // return [0, 255, this.random(0, 255)]
    // return [255, 0, this.random(0, 255)]
  }

  possibleColors = [
    [252,67,79],
    [253,150,74],
    [255,248,83],
    [94,242,91],
    [79,253,156],
    [162,253,83],
    [74,164,252],
    [66,74,251],
    [146,74,251]
  ]
}
