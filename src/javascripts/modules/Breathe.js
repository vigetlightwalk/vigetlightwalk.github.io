import { REED_COUNT, PIXEL_COUNT } from './constants'
import Effect from './Effect'
const DURATION = 4000
const HALF_DURATION = (DURATION / 2)

export default class Breathe extends Effect {
  constructor(up = true) {
    super()
    this.name = 'Breathe'

    this.startTime = Date.now()
    this.color = [74,164,252]
    // this.color = [30, 200, 255]
    // this.color = [20, 20, 20]
  }

  cares(x, y) {
    return true
  }

  colorFor(x, y) {
    return [
      // Fades to black
      // Math.floor(this.color[0] * this.intensity),
      // Math.floor(this.color[1] * this.intensity),
      // Math.floor(this.color[2] * this.intensity)

      // Fades to white
      255 - Math.floor((255 - this.color[0]) * this.intensity),
      255 - Math.floor((255 - this.color[1]) * this.intensity),
      255 - Math.floor((255 - this.color[2]) * this.intensity)
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