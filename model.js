'use strict'

const URLRooter = 'https://api.thecatapi.com/v1'
const API_KEY = 'api_key=live_rltugyOJ3NfZE8VnfH0SDUGWPJMFa65AWqYpySVRVVK9YufsGVqR9V8WZYVXNyfL'


const typeRequest = {
    DEFAULT: `${URLRooter}/images/search?${API_KEY}&limit=4`,
    FAVORITES: `${URLRooter}/favourites?${API_KEY}`,
    DELETE: (id) => `${URLRooter}/favourites/${id}?${API_KEY}`
}


document.addEventListener('click', event => {
    /**
     * @type {Element}
     */
    const target = event.target
    if(target.matches('#refresh')) {
        loadImage()
    }else if(target.matches('button#addFavorite')) {
        const previousElement = target.previousElementSibling
        saveFavoriteImage(previousElement.getAttribute('data-id'))
    }else if(target.matches('button#deleteFavorite')) {
        const previousElement = target.previousElementSibling
        deleteFavoriteImage(previousElement.getAttribute('data-id'))
    }
})


document.addEventListener('DOMContentLoaded', () => {
    loadImage()
    loadFavoriteImages()
})


/**
 * @returns {void}
 */
function loadImage() {
    const parentNode = document.getElementById('sectionImage')
    const documentFragment = document.createDocumentFragment()
    const imageTemplate = document.getElementById('imageTemplate').content
    cleanNodes(parentNode)
    fetch(typeRequest.DEFAULT)
        .then(response => response.json())
        .then(json => loadImageTemplate(json, { templateContent: imageTemplate, documentFragment, parentInsert: parentNode }))
        .catch(error => console.log(`Ha ocurrido un error de tipo ${error}`))
}


/**
 * @returns {void}
 */
function loadFavoriteImages() {
    const parentNode = document.getElementById('sectionFavorite')
    const documentFragment = document.createDocumentFragment()
    const imageTemplate = document.getElementById('favoriteTemplate').content
    fetch(typeRequest.FAVORITES)
        .then(response => response.json())
        .then(json => loadImageTemplate(json, { templateContent: imageTemplate, documentFragment, parentInsert: parentNode }))
        .catch(error => console.log(error))
}


/**
 * @param {String} imagePath
 * @returns {void}
 */
function saveFavoriteImage(imagePath) {
    fetch(typeRequest.FAVORITES, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            'image_id': imagePath
        })         
    })
    .then(json => json.json())
    .catch(error => console.log(error))
}


/**
 * @param {String} idImage
 * @returns {void}
 */
function deleteFavoriteImage(idImage) {
    fetch(typeRequest.DELETE(idImage), { method: 'DELETE' })
        .then(json => json.json())
        .catch(error => console.log(error))

}


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


/**
 * 
 * @param {Array<Object>} arrayJson 
 * @param {appendItemsTemplate} appendItemsTemplate
 * @typedef {Object} appendItemsTemplate
 * @property {Element} imageTemplate
 * @property {DocumentFragment} documentFragment
 * @property {Element} parentInsert
 */
function loadImageTemplate(arrayJson, { templateContent, documentFragment , parentInsert }) {
    arrayJson.forEach(element => {
        const { image: { url = null ?? (element.url) } = {}, id } = element
        const cloneNode = document.importNode(templateContent, true)
        const image = cloneNode.querySelector('img')
        image.setAttribute('src', url ?? '')  
        image.setAttribute('data-id', id)
        documentFragment.append(cloneNode)
    })
    parentInsert.appendChild(documentFragment);
}

