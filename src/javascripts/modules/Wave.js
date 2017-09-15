import { REED_COUNT, PIXEL_COUNT } from './constants'
import Effect from './Effect'
const DURATION = 1000
const HALF_DURATION = (DURATION / 2)

export default class Wave extends Effect {
  constructor(up = true) {
    super()
    this.startTime = Date.now()
    this.color = [200, 255, 255]
    this.up = up
  }

  cares(x, y) {
    const localPercentage = this.up ? (PIXEL_COUNT - y) / PIXEL_COUNT : y / PIXEL_COUNT

    if (this.inFirstHalf) {
      return localPercentage < this.percentagePassed
    } else {
      return localPercentage > this.percentagePassed
    }
  }

  colorFor(x, y) {
    return this.color
  }

  update() {
    const currentTime = Date.now()
    const timePassed = (currentTime - this.startTime) % DURATION

    if (timePassed < HALF_DURATION) {
      this.inFirstHalf = true
      this.percentagePassed = this.mapFloat(timePassed, 0, HALF_DURATION, 0, 1.0)
    } else {
      this.inFirstHalf = false
      this.percentagePassed = this.mapFloat(timePassed, HALF_DURATION, DURATION, 0, 1.0)
    }
  }
}