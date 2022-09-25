const marker = document.getElementById('iss-location');
let markerLeft = marker.style.left.replace("px", "");
let markerTop = marker.style.top.replace("px", "");

document.querySelector('#start').addEventListener('click', startFetch)
document.querySelector('#stop').addEventListener('click', stopLoop)

let stop
function stopLoop(){
    stop = true;
}

function startFetch() {
    fetch("http://api.open-notify.org/iss-now.json")
        .then(res => res.json())
        .then(data => {
            // Re-positions ISS Location on Map
            const issLeftPos = (600 / 180 * data.iss_position.longitude + 600 - 50).toFixed(2);
            const issTopPos = (-300 / 90 * data.iss_position.latitude + 300 - 50).toFixed(2);
            marker.style.left = `${issLeftPos}px`;
            marker.style.top = `${issTopPos}px`;
        
            // Logs Longitude, Latitude positions
            console.log(`Left: ${issLeftPos}, Top: ${issTopPos}`);

            // Add details to DOM
            const li = document.createElement('li');
            li.textContent = `Longitude: ${data.iss_position.longitude}, Latitude: ${data.iss_position.latitude}, Time: ${Date()}`
            document.querySelector('ul').appendChild(li)
        
            // Update JSON
            const updateJSON = (url, body) => {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
            }
        
            const newEntry = {
                "time-stamp": `${Date()}`,
                "longitude": Number(`${data.iss_position.longitude}`),
                "latitude": Number(`${data.iss_position.latitude}`)
            }
        
            updateJSON("http://localhost:3000/position", newEntry)
        
        })
}



