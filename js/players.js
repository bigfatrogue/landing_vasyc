const PLAYERS = [
    {
        name: 'Хозе-Рауль Капабланка',
        status: 'Чемпион мира по шахматам',
        url_photo: null
    },
    {
        name: 'Эммануил Ласкер',
        status: 'Чемпион мира по шахматам',
        url_photo: null
    },
    {
        name: 'Александр Алехин',
        status: 'Чемпион мира по шахматам',
        url_photo: null
    },
    {
        name: 'Арон Нимцович',
        status: 'Чемпион мира по шахматам',
        url_photo: null
    },
    {
        name: 'Рихард Рети',
        status: 'Чемпион мира по шахматам',
        url_photo: null
    },
    {
        name: 'Остап Бендер',
        status: 'Чемпион мира по шахматам',
        url_photo: null
    }
]

const playerSliderCounter = document.querySelector('.player-slider__counter')
let countActiveCard

const settingsScreenPoint = [
    {
        width: Infinity,
        countCard: 3
    },
    {
        width: 1366,
        countCard: 3
    },
    {
        width: 1200,
        countCard: 2
    }, 
    {
        width: 800,
        countCard: 2
    }, 
    {
        width: 749,
        countCard: 1
    }, 
    {
        width: 375,
        countCard: 1
    } 
]

const playerCards = []

function createCards() {
    const existCard = document.querySelector('.player-card')
    
    PLAYERS.forEach(player => {
        const cloneCard = existCard.cloneNode(true)
        playerCards.push(cloneCard)

        existCard.parentElement.appendChild(cloneCard)
        
        if (player.url_photo !== null) {
            cloneCard.querySelector('.player-card__image img').src = player.url
        }

        cloneCard.querySelector('.player-card-title__name').textContent = player.name 
        cloneCard.querySelector('.player-card-title__status').textContent = player.status
    })

    existCard.remove()
}


function setupCard() {
    for (let i = 1; i < settingsScreenPoint.length; i++) {
        const outerWidthWindow = window.outerWidth 
        if (
            outerWidthWindow <= settingsScreenPoint[i - 1].width 
            && outerWidthWindow > settingsScreenPoint[i].width
        ) {
            playerCards.slice(0, settingsScreenPoint[i - 1].countCard).forEach(card => {
                card.classList.add('is-active')
            })

            countActiveCard = settingsScreenPoint[i - 1].countCard
        }

        const screenPoint = settingsScreenPoint[i]
        const media = window.matchMedia(`(max-width: ${screenPoint.width}px)`)
        
        media.addEventListener('change', (event) => {
            playerCards.forEach(item => {
                item.classList.remove('is-active')
            })

            const point = (event.matches) ? settingsScreenPoint[i] : settingsScreenPoint[i - 1]

            playerCards.slice(0, point.countCard).forEach(card => {
                card.classList.add('is-active')
            }) 

            countActiveCard = point.countCard
            playerSliderCounter.textContent = countActiveCard
        })
    }
}

createCards()
setupCard()


const sliderPlayerCards = document.querySelector('.slider-player-cards')
const cardsWrapper = document.querySelector('.player-cards')
let cardsGap = 0

resizeCards()

window.addEventListener('resize', (event) => {
    resizeCards(event)
})

function resizeCards(event) {
    const card = playerCards[0]
    cardsGap = Math.floor((sliderPlayerCards.offsetWidth - card.offsetWidth * countActiveCard) / countActiveCard)
    cardsWrapper.style.gap = `${cardsGap}px`
    cardsWrapper.style.paddingInline = `${Math.floor(cardsGap / (countActiveCard + 1))}px`
}


const sliderBtnPlayersPrev = document.querySelector('.slider-btn-players__prev')
const sliderBtnPlayersNext = document.querySelector('.slider-btn-players__next')

let isEnd = false
let isStart = false

playerSliderCounter.textContent = countActiveCard


sliderBtnPlayersPrev.addEventListener('click', (event) => {
    activatePlayerCard(-countActiveCard)
})

sliderBtnPlayersNext.addEventListener('click', (event) => {
    activatePlayerCard(countActiveCard)
})

function switchStateButton(countViewCard) {
    isStart = countViewCard > countActiveCard
    if (isStart) {
        sliderBtnPlayersPrev.classList.remove('btn-disable')
    } else {
        sliderBtnPlayersPrev.classList.add('btn-disable')
    }

    isEnd = countViewCard === playerCards.length
    if (isEnd) {
        sliderBtnPlayersNext.classList.add('btn-disable')
    } else {
        sliderBtnPlayersNext.classList.remove('btn-disable')
    }
}

function hiddenAllCard() {
    playerCards.forEach(item => item.classList.remove('is-active'))
}

function showCard(countCard, countViewCard) {
    const cardWidth = playerCards[0].offsetWidth

    const moveX = (countViewCard - Math.abs(countCard)) * (cardWidth + cardsGap)

    cardsWrapper.style.transform = `translateX(-${moveX}px)`

    const direction = (countCard > 0) ? 1 : -1
    playerCards
    .slice(countViewCard - countCard * direction, countViewCard)
    .forEach(item => {
        item.classList.add('is-active')
    })
}

function activatePlayerCard(countCard) {
    let currentCountViewCard = Number(playerSliderCounter.textContent)

    if (countCard > 0 && currentCountViewCard === playerCards.length) return
    if (countCard < 0 && currentCountViewCard - 1 < countActiveCard) return

    currentCountViewCard += countCard
    playerSliderCounter.textContent = Number(playerSliderCounter.textContent) + countCard

    switchStateButton(currentCountViewCard)

    hiddenAllCard()
    
    showCard(countCard, currentCountViewCard)   
}

const intervalPlayers = setInterval(switchCardPlayer, 4000)

function switchCardPlayer() {
    if (isEnd) {
        playerSliderCounter.textContent = countActiveCard
        hiddenAllCard()
        switchStateButton(countActiveCard)
        showCard(countActiveCard, countActiveCard)
        isEnd = false
        
    } else {
        activatePlayerCard(countActiveCard)
    }
}