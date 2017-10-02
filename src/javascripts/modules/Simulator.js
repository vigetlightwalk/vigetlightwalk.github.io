import { REED_COUNT, PIXEL_COUNT } from './constants'

export default class Simulator {
  constructor() {
    this.variables()
  }

  variables() {
    // Elements
    this.reeds = document.querySelectorAll('.reed')
    this.reeds.forEach((reed, x) => {
      this[`reed${x}`] = reed.querySelectorAll('.reed__light')
    })
    this.countdown = document.getElementById('countdown').querySelector('span')

    // Matrix
    this.leds = []

    // Custom events
    this.endEventName = 'simulationEnd'
    this.simulationEnd = new Event(this.endEventName)
  }

  getName() {
    const names = []
    if (this.foregroundEffect.name) names.push(this.foregroundEffect.name)
    if (this.backgroundEffect.name) names.push(this.backgroundEffect.name)
    return names.join(', ')
  }

  draw(endTime) {
    const currentTime = Date.now()
    if (currentTime < endTime) {
      const timeLeft = Math.ceil((endTime - currentTime)/1000)
      this.countdown.innerHTML = timeLeft < 10 ? '0' + timeLeft : timeLeft

      requestAnimationFrame(() => this.draw(endTime))
      this.backgroundEffect.update()
      this.foregroundEffect.update()
      this.setLedMatrix()
    } else {
      this.countdown.innerHTML = '00'
      this.clearLedMatrix()
      this.loadLedMatrix()
      document.dispatchEvent(this.simulationEnd)
    }
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