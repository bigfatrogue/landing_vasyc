const lines = document.querySelectorAll(".running-line__wrapper")

const SPEED = 80

function animateRunningLine(line, lineInner) {
    const wrapperWidth = lineInner.offsetWidth
    const lineWidth = line.scrollWidth

    const maxTranslate = wrapperWidth - lineWidth

    let currentX = 0
    let lastTime = null

    function frame(time) {
        if (!lastTime) {
            lastTime = time
        }

        const delta = (time - lastTime) / 1000

        lastTime = time
        currentX -= SPEED * delta

        if (currentX <= maxTranslate) {
            currentX = maxTranslate
            line.style.transform = `translateX(${currentX}px)`
            return
        }

        line.style.transform = `translateX(${currentX}px)`

        requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
}


lines.forEach(line => {
    const lineInner = line.parentElement
    
    lineInner.addEventListener('click', () => {
        line.style.transform = `translateX(${0}px)`
        animateRunningLine(line, lineInner)
    })
    
    animateRunningLine(line, lineInner)
})
