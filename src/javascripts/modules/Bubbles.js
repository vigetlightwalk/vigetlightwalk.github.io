import { REED_COUNT, PIXEL_COUNT } from './constants'
import Effect from './Effect'
import InteractiveEffect from './InteractiveEffect'

const DURATION = 2000
const HALF_DURATION = (DURATION / 2)
const MAX_BUBBLE_RADIUS = (PIXEL_COUNT)
const BUBBLE_HEIGHT = (PIXEL_COUNT / 2)

class Bubble extends Effect {
  constructor(movement) {
    super()
    this.movement = movement
  }

  update(currentTime) {
    const timePassed = (currentTime - this.movement.startTime) % DURATION
    let percentagePassed = 0

    if (timePassed < HALF_DURATION) {
      percentagePassed = this.mapFloat(timePassed, 0, HALF_DURATION, 0.2, 1.0)
      this.intensity = this.mapFloat(timePassed, 0, HALF_DURATION, 0.1, 1)
    } else {
      percentagePassed = this.mapFloat(timePassed, HALF_DURATION, DURATION, 1.0, 0.2)
      this.intensity = this.mapFloat(timePassed, HALF_DURATION, DURATION, 1, 0.1)
    }

    this.radius = percentagePassed * MAX_BUBBLE_RADIUS

  }

  surrounds(x, y) {
    const distance = this.distanceBetween(x, y, this.movement.xOffset, BUBBLE_HEIGHT)
    return this.radius >= distance
  }

  distanceBetween(x1, y1, x2, y2) {
    const aSquaredPlusBSquared = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
    return Math.pow(aSquaredPlusBSquared, 0.5)
  }
}

export default class Bubbles extends InteractiveEffect {
  constructor() {
    super()
    this.name = 'Bubbles'

    this.bubbles = []
    this.color = [20, 100, 250]
    this.startTime = Date.now()
    this.movementOn(6, this.startTime)

    // this.movementOn(0, this.startTime)
    // setTimeout(() => {
    //   this.movementOff(0)
    // }, 2000)

    // setTimeout(() => {
    //   this.movementOn(10, Date.now())
    // }, 2200)
    // setTimeout(() => {
    //   this.movementOff(10)
    // }, 4200)

    // setTimeout(() => {
    //   this.movementOn(20, Date.now())
    // }, 4400)
    // setTimeout(() => {
    //   this.movementOff(20)
    // }, 6400)
    // this.movementOn(20, this.startTime)
    // this.movementOn(21, this.startTime + 1000)

  }

  cares(x, y) {
    for (let i = 0; i < this.activeMovements; i++) {
      if (this.bubbles[i].surrounds(x, y)) {
        return true
      }
    }

    return false
  }

  colorFor(x, y) {
    // return this.color
    return this.generateColor()
    // return [
    //   this.color[0],
    //   this.color[1],
    //   Math.floor(this.color[2] * this.bubbles[0].intensity)
    // ]
    // return [
    //   Math.floor(this.color[0] * this.bubbles[0].intensity),
    //   Math.floor(this.color[1] * this.bubbles[0].intensity),
    //   Math.floor(this.color[2] * this.bubbles[0].intensity)
    // ]
  }

  generateColor() {
    // return this.possibleColors[this.random(0, 11)]
    // return [this.random(0, 255), this.random(0, 255), this.random(0, 255)]
    // return [0, 255, this.random(0, 255)]
    return [0, 255, this.random(0, 255)]
    // return [255, 100, 200]
  }

  possibleColors = [
    [255, 0,   0],
    [255, 120, 0],
    [255, 255, 0],
    [120, 255, 0],
    [0,   255, 0],
    [0,   255, 120],
    [0,   255, 255],
    [0,   120, 255],
    [0,   0,   255],
    [120, 0,   255],
    [255, 0,   255],
    [255, 0,   120]
  ]

  update() {
    const currentTime = Date.now()
    for (let i = 0; i < this.activeMovements; i++) {
      this.bubbles[i].update(currentTime)
    }
  }

  movementUpdate() {
    for (let i = 0; i < this.activeMovements; i++) {
      this.bubbles[i] = new Bubble(this.movements[i])
    }
  }
}