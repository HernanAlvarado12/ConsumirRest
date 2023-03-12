'use strict'

const URLRooter = 'https://api.thecatapi.com/v1'
const API_KEY = 'live_rltugyOJ3NfZE8VnfH0SDUGWPJMFa65AWqYpySVRVVK9YufsGVqR9V8WZYVXNyfL'


const typeRequest = {
    DEFAULT: `${URLRooter}/images/search?limit=4`,
    FAVORITES: `${URLRooter}/favourites`,
    DELETE: (id) => `${URLRooter}/favourites/${id}`,
    UPLOAD: `${URLRooter}/images/upload`
}


document.addEventListener('click', event => {
    /**
     * @type {Element}
    */
   const target = event.target
   if(target.matches('#refresh')) {
       loadImage()
    }else if(target.matches('button#addFavorite')) {
        saveFavoriteImage(target.getAttribute('data-id'))
    }else if(target.matches('button#deleteFavorite')) {
        deleteFavoriteImage(target.getAttribute('data-id'))
    }else if(target.matches('input[name ="submit"]')) {
        event.preventDefault()
        uploadPhoto()
    }
})


document.addEventListener('DOMContentLoaded', () => {
    loadImage()
    loadFavoriteImages()
})


document.addEventListener('change', event => {
    /**
     * @type {Element}
    */
    const target = event.target
    if(target.matches('#formFile')) {
        const image = document.getElementById('formImage')
        const inputFile = document.getElementById('formFile')
    }
})

/**
 * @returns {void}
 */
function loadImage() {
    const parentNode = document.getElementById('sectionImage')
    const documentFragment = document.createDocumentFragment()
    const imageTemplate = document.getElementById('imageTemplate').content
    cleanNodes(parentNode)
    fetch(typeRequest.DEFAULT, { method: 'GET', headers: { 'X-API-KEY': API_KEY } })
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
    cleanNodes(parentNode)
    fetch(typeRequest.FAVORITES, { method: 'GET', headers: { 'X-API-KEY': API_KEY } })
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
        headers: { 'Content-Type': 'application/json', 'X-API-KEY': API_KEY },
        body: JSON.stringify({
            'image_id': imagePath
        })         
    })
    .then(json => json.json())
    .then(loadFavoriteImages)
    .catch(error => console.log(error))
}


/**
 * @param {String} idImage
 * @returns {void}
 */
function deleteFavoriteImage(idImage) {
    fetch(typeRequest.DELETE(idImage), { method: 'DELETE', headers: { 'X-API-KEY': API_KEY } })
        .then(loadFavoriteImages)
        .catch(error => console.log(error))
}


/**
 * @returns {void}
 */
async function uploadPhoto() {
    const form = document.getElementById('formUpload')
    const formData = new FormData(form);
    fetch(typeRequest.UPLOAD, {
        method: 'POST',
        headers: { 'X-API-KEY': API_KEY },
        body: formData
    })
    .then(json => json.json())
    .then(json => saveFavoriteImage(json.id))
    .catch(error => error)
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
 * @typedef {Object} appendItemsTemplate
 * @property {Element} imageTemplate
 * @property {DocumentFragment} documentFragment
 * @property {Element} parentInsert
 * @param {Array<Object>} arrayJson 
 * @param {appendItemsTemplate} appendItemsTemplate
 * @returns {void}
 */
function loadImageTemplate(arrayJson, { templateContent, documentFragment , parentInsert }) {
    arrayJson.forEach(element => {
        const { image: { url = null ?? (element.url) } = {}, id } = element
        const cloneNode = document.importNode(templateContent, true)
        cloneNode.querySelector('img').setAttribute('src', url)  
        cloneNode.querySelector('button').setAttribute('data-id', id)
        documentFragment.append(cloneNode)
    })
    parentInsert.appendChild(documentFragment);
}

