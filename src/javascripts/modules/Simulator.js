import { REED_COUNT, PIXEL_COUNT } from './constants'
import RainUp from './RainUp'
import RainDown from './RainDown'
import WaveUp from './WaveUp'
import WaveDown from './WaveDown'
import Breathe from './Breathe'

export default class Simulator {
  constructor() {
    this.variables()
    this.backgroundEffect = new Breathe
    this.foregroundEffect = new RainDown()

    setInterval(() => {
      this.backgroundEffect.update()
      this.foregroundEffect.update()
      this.setLedMatrix()
    }, 1000/60)
  }

  variables() {
    this.reeds = document.querySelectorAll('.reed')
    this.reeds.forEach((reed, x) => {
      this[`reed${x}`] = reed.querySelectorAll('.reed__light')
    })
    this.leds = []
  }

  loadLedMatrix() {
    for (let x = 0; x < REED_COUNT; x++) {
      for (let y = 0; y < PIXEL_COUNT; y++) {
        if (this.leds[x][y]) {
          this[`reed${x}`][y].style.backgroundColor = `rgb(${this.leds[x][y][0]},${this.leds[x][y][1]},${this.leds[x][y][2]}`
          this[`reed${x}`][y].style.boxShadow = `0 0 10px rgb(${this.leds[x][y][0]},${this.leds[x][y][1]},${this.leds[x][y][2]}`
        } else {
          this[`reed${x}`][y].style.backgroundColor = 'transparent'
          this[`reed${x}`][y].style.boxShadow = 'none'
        }
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