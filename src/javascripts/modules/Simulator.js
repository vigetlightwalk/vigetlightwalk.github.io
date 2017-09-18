import { REED_COUNT, PIXEL_COUNT } from './constants'
import RainUp   from './RainUp'
import RainDown from './RainDown'
import WaveUp   from './WaveUp'
import WaveDown from './WaveDown'
import Breathe  from './Breathe'
import Bubbles  from './Bubbles'

export default class Simulator {
  constructor() {
    this.variables()
    // this.backgroundEffect = new Breathe
    // this.foregroundEffect = new RainDown
    // this.backgroundEffect = new Bubbles
    this.backgroundEffect = new Breathe
    this.foregroundEffect = new RainUp

    this.draw()

    setTimeout(() => {
      document.querySelector('.reeds').classList.add('-is-off')
    }, 4000)

  }

  variables() {
    this.reeds = document.querySelectorAll('.reed')
    this.reeds.forEach((reed, x) => {
      this[`reed${x}`] = reed.querySelectorAll('.reed__light')
    })
    this.leds = []
  }

  draw() {
    requestAnimationFrame(() => this.draw())
    this.backgroundEffect.update()
    this.foregroundEffect.update()
    this.setLedMatrix()
  }

  loadLedMatrix() {
    for (let x = 0; x < REED_COUNT; x++) {
      for (let y = 0; y < PIXEL_COUNT; y++) {
        if (this.leds[x][y]) {
          this[`reed${x}`][y].style.color = `rgb(${this.leds[x][y][0]},${this.leds[x][y][1]},${this.leds[x][y][2]}`
        } else {
          this[`reed${x}`][y].style.color = 'transparent'
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