import { REED_COUNT, PIXEL_COUNT } from './constants'
import Effect from './Effect'
const DURATION = 4000
const HALF_DURATION = (DURATION / 2)

export default class Breathe extends Effect {
  constructor(up = true) {
    super()
    this.startTime = Date.now()
    this.color = [0, 200, 100]
  }

  cares(x, y) {
    return true
  }

  colorFor(x, y) {
    return [
      Math.floor(this.color[0] * this.intensity),
      Math.floor(this.color[1] * this.intensity),
      Math.floor(this.color[2] * this.intensity)
    ]
  }

  update() {
    const currentTime = Date.now()
    const timePassed = (currentTime - this.startTime) % DURATION

    if (timePassed < HALF_DURATION) {
      this.intensity = this.mapFloat(timePassed, 0, HALF_DURATION, 0.1, 1.0)
    } else {
      this.intensity = this.mapFloat(timePassed, HALF_DURATION, DURATION, 1.0, 0.1)
    }
  }
}