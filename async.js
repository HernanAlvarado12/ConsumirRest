'use strict'

const URLRooter = 'https://api.thecatapi.com/v1/images/search'
const querisParameters = ['limit=4', 'has_breeds=1']


document.addEventListener('click', event => {
    if(event.target.matches('#refresh')) {
        loadImage()
    }
})


async function loadImage() {
    const fragment = document.createDocumentFragment()
    const imageTemplate = document.getElementById('imageTemplate').content
    const parentNode = document.getElementById('sectionImage')
    const request = await fetch(addQueriesParameters(0))
    const json =  await request.json()
    for(let i = 0; i < 4; i++) {
        const cloneNode = document.importNode(imageTemplate, true)
        cloneNode.querySelector('img').setAttribute('src', json[i].url)
        fragment.append(cloneNode)
    }
    parentNode.append(fragment)
}
loadImage()


/**
 * 
 * @param  {...Number} limits 
 * @returns 
 */
function addQueriesParameters(...limits) {
    let URLQueries = `${URLRooter}?`
    limits.forEach(query => URLQueries += querisParameters[query])
    return URLQueries
}