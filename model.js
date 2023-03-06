'use strict'

const URLRooter = 'https://api.thecatapi.com/v1/images/search?limit=4'
const querisParameters = ['limit=4']


document.addEventListener('click', event => {
    if(event.target.matches('#refresh')) {
        loadImage()
    }
})


function loadImage() {
    const parentNode = document.getElementById('sectionImage')
    const documentFragment = document.createDocumentFragment()
    const imageTemplate = document.getElementById('imageTemplate').content
    cleanNodes(parentNode)
    fetch(URLRooter)
        .then(response => response.json())
        .then(json => {
            for(let i = 0; i < 4; i++) {
                const cloneNode = document.importNode(imageTemplate, true)
                cloneNode.querySelector('img').setAttribute('src', json[i].url)
                documentFragment.append(cloneNode)
            }
            parentNode.append(documentFragment)
        }).catch(error => console.error(`Ha ocurrido un error de tipo ${error}`))
}
loadImage()


/**
 * 
 * @param {Element} parentNode 
 */
function cleanNodes(parentNode) {
    [...parentNode.children].forEach(element => {
        if(element.nodeName !== 'TEMPLATE') {
            element.remove()
        }
    })
}