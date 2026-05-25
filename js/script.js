
const BTN_LINK = [
    {
        btn: '#btn-stage',
        link: '#section-stage'
    },
    {   
        btn: '#btn_support',
        link: '#section-support'
    }
]

BTN_LINK.forEach(item => {
    document.querySelector(item.btn).addEventListener('click', () => {
        goToSection(
            document.querySelector(item.link)
        )
    })
})

function goToSection(section) {
    section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}


