import { REED_COUNT, PIXEL_COUNT } from './constants'
import Rain from './Rain'
import Wave from './Wave'

export default class Simulator {
  constructor() {
    this.variables()
    this.backgroundEffect = new Wave()
    this.foregroundEffect = new Rain()

    setInterval(() => {
      this.backgroundEffect.update()
      this.foregroundEffect.update()
      this.setLedMatrix()
    }, 10)
  }

  variables() {
    this.reeds = document.querySelectorAll('.reed')
    this.reeds.forEach((reed, x) => {
      this[`reed${x}`] = reed.querySelectorAll('.reed__light')
    })
    this.leds = []
    // this.activeClass = '-is-active'
  }

  loadLedMatrix() {
    for (let x = 0; x < REED_COUNT; x++) {
      for (let y = 0; y < PIXEL_COUNT; y++) {
        if (this.leds[x][y]) {
          this[`reed${x}`][y].style.backgroundColor = `rgb(${this.leds[x][y][0]},${this.leds[x][y][1]},${this.leds[x][y][2]}`
        } else {
          this[`reed${x}`][y].style.backgroundColor = 'transparent'
        }
        // this[`reed${x}`][y].classList[this.leds[x][y] ? 'add' : 'remove'](this.activeClass)
      }
    }
  }

  setPixel(x, y, color) {
    this.leds[x][y] = color
  }

  setLedMatrix() {
    // start with a blank slate
    this.clearLedMatrix()

    for (let x = 0; x < REED_COUNT; x++) {
      for (let y = 0; y < PIXEL_COUNT; y++) {
        if (this.backgroundEffect.cares(x, y)) {
          this.setPixel(x, y, this.backgroundEffect.colorFor(x))
        }
        if (this.foregroundEffect.cares(x, y)) {
          this.setPixel(x, y, this.foregroundEffect.colorFor(x))
        }
      }
    }

    this.loadLedMatrix()
  }

  clearLedMatrix() {
    this.leds = []
    for (let x = 0; x < REED_COUNT; x++) {
      const reed = []
      for (let y = 0; y < PIXEL_COUNT; y++) {
        reed.push(0)
      }
      this.leds.push(reed)
    }
  }
}