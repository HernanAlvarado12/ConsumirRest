import axios from 'axios';

const URLAxios = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers: { common: { 'X-API-KEY': 'live_rltugyOJ3NfZE8VnfH0SDUGWPJMFa65AWqYpySVRVVK9YufsGVqR9V8WZYVXNyfL' } },
})


const loagImages = async () => {
    const parentInsert = document.getElementById('sectionImage')
    const documentFragment = document.createDocumentFragment()
    const imageTemplate = document.getElementById('imageTemplate').content
    cleanNodes(parentInsert)
    URLAxios.get('/images/search?limit=4')
            .then(res => res.request)
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