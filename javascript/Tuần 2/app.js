var search = document.querySelector('.search');
var city = document.querySelector('.city');
var country = document.querySelector('.country');
var value = document.querySelector('.value');
var shortDesc = document.querySelector('.short-desc');
var visibility = document.querySelector('.visibility span');
var wind = document.querySelector('.wind span');
var sun = document.querySelector('.sun span');
var time = document.querySelector('.time');
var content = document.querySelector('.content');
var body = document.querySelector('.body');

async function changeWeatherUI() {
    let capitalSearch = search.value.trim()
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&units=metric&appid=3b6e0f6367f2b2dae76de9a9a74cab9a`
    let data = await fetch(apiUrl).then(res => res.json())

    if (data.cod == 200) {
        console.log(data)
        city.innerText = data.name
        country.innerText = data.sys.country
        visibility.innerText = data.visibility + 'm'
        wind.innerText = data.wind.speed + 'm/s'
        sun.innerText = data.main.humidity + '%'
        let temp = Math.round(data.main.temp) 
        value.innerText = temp
        shortDesc.innerText = data.weather[0].main
        time.innerText = new Date().toLocaleString('vi')

    }
    else {
        content.classList.add('hide')
    }
    
}

search.addEventListener('keypress', function(e) {
    if(e.code === 'Enter') {
        changeWeatherUI()
    }
})

