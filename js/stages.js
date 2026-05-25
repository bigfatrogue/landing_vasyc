const WIDTH_SLIDE_MOBILE = 800

const media = window.matchMedia(`(max-width: ${WIDTH_SLIDE_MOBILE}px)`)

const stageSlider = document.querySelector('.stage-slider')
const stageContainer = document.querySelector('.stage-stages')
const stageCards = document.querySelectorAll('.stage-card')
const stageCardImage = document.querySelector('.stage-card--image')
let stageCardSlides = document.querySelectorAll('.stage-card-slide')


const MOBILE_INDEX_SLIDE = [
    [0, 1], 
    [2],
    [3, 4],
    [5],
    [6]
]

const countPoint = MOBILE_INDEX_SLIDE.length
let points = []
const sliderViewPortCircle = document.querySelector('.slider-viewport-circle')
let activePoint
let activeSlide
let currentIndexPoint = 0


if (window.outerWidth <= WIDTH_SLIDE_MOBILE) {
    createMobileSlider()
    activateSlide(currentIndexPoint)
}

media.addEventListener('change', (event) => {
    if (event.matches) {
        createMobileSlider()
        activateSlide(currentIndexPoint)
    } else {
        createDesktopSlider()
    }
})

function createMobileSlider() {
    stageSlider.classList.toggle('hidden')

    MOBILE_INDEX_SLIDE.forEach(indexes => {
        const stageCardSlide = document.createElement('div')
        stageCardSlide.className = 'stage-card-slide'

        indexes.forEach(indexCard => {
            if (indexCard == 0) {
                if (activeSlide === undefined) {
                    activeSlide = stageCardSlide
                } 
            }
            stageCardSlide.appendChild(stageCards[indexCard])
        })

        stageContainer.insertBefore(stageCardSlide, stageCardImage)
        stageCardSlides = document.querySelectorAll('.stage-card-slide')
    })
}

function createDesktopSlider() {
    stageSlider.classList.toggle('hidden')
    
    stageCards.forEach(item => {
        stageContainer.insertBefore(item, stageCardImage)
    })

    stageCardSlides.forEach(item => {
        item.remove()
    })
}


for (let i = 0; i < countPoint; i++) {
    const div = document.createElement('div')
    div.className = 'slider-viewport-circle__point'
    if (i == 0) {
        div.classList.add('point-is-active')
        activePoint = div
    }
    points.push(div)
    sliderViewPortCircle.appendChild(div)
}
 

const sliderBtnStagePrev = document.querySelector('.slider-btn-stage__prev')
const sliderBtnStageNext = document.querySelector('.slider-btn-stage__next')

sliderBtnStagePrev.addEventListener('click', (event) => {
    if (currentIndexPoint - 1 >= 0) {
        currentIndexPoint -= 1
        activatePoint(currentIndexPoint)
        activateSlide(currentIndexPoint)
    }
})

sliderBtnStageNext.addEventListener('click', (event) => {
    if (currentIndexPoint + 1 < countPoint) {
        currentIndexPoint += 1
        activatePoint(currentIndexPoint)
        activateSlide(currentIndexPoint)
    }
})

function activatePoint(index) {
    activePoint.classList.remove('point-is-active')
    activePoint = points[index]
    activePoint.classList.add('point-is-active')
    
    if (index + 1 > 1) {
        sliderBtnStagePrev.classList.remove('btn-disable')
    } else {
        sliderBtnStagePrev.classList.add('btn-disable')
    }

    if (index + 1 == countPoint) {
        sliderBtnStageNext.classList.add('btn-disable')
    } else {
        sliderBtnStageNext.classList.remove('btn-disable')
    }
} 

function activateSlide(index) {
    activeSlide.classList.remove('is-active')
    activeSlide = stageCardSlides[index]
    activeSlide.classList.add('is-active')
}

