

// this script is NOT node.js
// it's browser (client-side) js
// the fetch api is a browser thing, can't use in node
// instead of callback function, fetch has ".then" method
// fetch('http://localhost:3000/weather?address=nyc').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')  // start with "#" to target an ID
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'


weatherForm.addEventListener('submit', (e) => {  // e for "event"
    e.preventDefault()  // stops browser from auto-refreshing on form submit

    const location = search.value 

    console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})