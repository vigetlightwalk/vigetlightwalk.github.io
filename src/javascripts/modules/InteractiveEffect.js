import { NODE_COUNT } from './constants'
import Effect from './Effect'

export default class InteractiveEffect extends Effect {
  constructor() {
    super()
    this.activeMovements = 0
    this.movements = this.generateMovements()
  }

  interactive() {
    return true
  }

  movementOn(xOffset, currentTime) {
    // Can't add more movements than there are nodes
    if (this.activeMovements === NODE_COUNT) return

    this.movements[this.activeMovements].xOffset   = xOffset
    this.movements[this.activeMovements].startTime = currentTime

    this.activeMovements += 1
    this.movementUpdate()
  }

  movementOff(xOffset) {
    for (let a = 0; a < this.activeMovements; a++) {
      if (this.movements[a].xOffset === xOffset) {
        for (let b = a; b < this.activeMovements - 1; b++) {
          this.movements[b].xOffset = this.movements[b + 1].xOffset
          this.movements[b].startTime = this.movements[b + 1].startTime
        }

        this.activeMovements -= 1
        this.movementUpdate()

        return
      }
    }
  }

  generateMovements() {
    const movements = []
    for (let i = 0; i < NODE_COUNT; i++) {
      movements.push({
        xOffset: 0,
        startTime: 0
      })
    }

    return movements
  }
}