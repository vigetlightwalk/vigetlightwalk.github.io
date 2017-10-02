import Simulator from './Simulator'
import Effect    from './Effect'
import RainUp    from './RainUp'
import RainDown  from './RainDown'
import WaveUp    from './WaveUp'
import WaveDown  from './WaveDown'
import Breathe   from './Breathe'
import Bubbles   from './Bubbles'

const DURATION = 10000

export default class Controls {
  constructor(el) {
    this.el = el
    this.variables()
    this.listen()
  }

  variables() {
    // Simulator
    this.simulator = new Simulator

    // UI elements
    this.pageToggles      = this.el.querySelectorAll('[data-page-link]')
    this.addEffectBtn     = this.el.querySelector('.controls-page__add-effect')
    this.pageOneElements  = this.el.querySelectorAll('.-is-page-1')
    this.pageTwoElements  = this.el.querySelectorAll('.-is-page-2')
    this.activeEffectCard = this.el.querySelector('.controls__display-effect')
    this.activeEffectName = this.activeEffectCard.querySelector('.controls__active-effect__name')

    // Form elements
    this.form = document.getElementById('controls-form')
    this.foregroundEffectDropdown = document.getElementById('foreground-effect')
    this.backgroundEffectDropdown = document.getElementById('background-effect')
    this.effectDropdowns = [this.foregroundEffectDropdown, this.backgroundEffectDropdown]
    this.formSubmitBtn = document.getElementById('controls-form-submit')

    // Classes
    this.visibleClass = '-is-visible'
    this.activeClass  = '-is-active'

    // Timeouts
    this.submitPause = 900
    this.submitTimeout = null
  }

  listen() {
    // Form changes
    this.effectDropdowns.forEach(el => el.addEventListener('change', this.handleFormChange)
      )
    // Form submission
    this.form.addEventListener('submit', this.handleSubmit)

    // Page "links"
    this.pageToggles.forEach(el => el.addEventListener('click', this.handlePageLink))

    // On simulation end
    document.addEventListener(this.simulator.endEventName, this.handleSimulationEnd)
  }

  handlePageLink = e => {
    const page = parseInt(e.currentTarget.getAttribute('data-page-link'), 10)
    this.goToPage(page)
  }

  goToPage(page) {
    if (page === 1) {
      this.pageOneElements.forEach(el => el.classList.add(this.visibleClass))
      this.pageTwoElements.forEach(el => el.classList.remove(this.visibleClass))
    } else if (page === 2) {
      this.pageTwoElements.forEach(el => el.classList.add(this.visibleClass))
      this.pageOneElements.forEach(el => el.classList.remove(this.visibleClass))
    }
  }

  handleFormChange = () => {
    const anythingSelected = this.effectDropdowns.filter(el => el.value).length
    if (anythingSelected) {
      this.formSubmitBtn.removeAttribute('disabled')
    } else {
      this.formSubmitBtn.setAttribute('disabled', 'disabled')
    }
  }

  handleSubmit = e => {
    clearTimeout(this.submitTimeout)
    e.preventDefault()

    // Prepare simulator
    this.simulator.foregroundEffect = this.grabEffect(this.foregroundEffectDropdown)
    this.simulator.backgroundEffect = this.grabEffect(this.backgroundEffectDropdown)

    // Return to page 1 and load active effect card
    this.goToPage(1)
    this.addEffectBtn.classList.remove(this.visibleClass)
    this.activeEffectName.innerHTML = this.simulator.getName()
    this.activeEffectCard.classList.add(this.activeClass)

    // Launch simulator after delay
    this.submitTimeout = setTimeout(() => {
      this.simulator.draw(Date.now() + DURATION)
    }, this.submitPause)
  }

  handleSimulationEnd = () => {
    this.activeEffectCard.classList.remove(this.activeClass)
    this.addEffectBtn.classList.add(this.visibleClass)
  }

  grabEffect(dropdown) {
    switch(dropdown.value) {
      case 'waveUp':
        return new WaveUp
      case 'waveDown':
        return new WaveDown
      case 'rainbowRain':
        return new RainDown
      case 'rainUp':
        return new RainUp
      case 'breathe':
        return new Breathe
      case 'bubbles':
        return new Bubbles
      default:
        return new Effect
    }
  }
}