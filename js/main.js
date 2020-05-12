String.prototype.strReplace = function (map) {
    return this.replace(new RegExp("(" + Object.keys(map).map(
        function(i) {
            return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
        }).join("|") + ")", "g"),
        function(s) {
            return map[s]
        });
};

function dateBuilder() {
    let d = new Date();
    let months = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"];
    let days = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}. ${month} ${year}`;
}

function createComponent(element, template, variables) {
    element.innerHTML = document.getElementById(template).innerHTML.strReplace(variables);
}

function getLocation(cb) {
    fetch('http://ip-api.com/json/')
        .then(r => r.json())
        .then(r => cb(r));
}

function set(city) {
    API.getResult(city.toLowerCase().strReplace(settings.diacritic), json => {
        createComponent(document.getElementById('weather-id'), 'weather--result', {
            '{{city}}': city,
            '{{country}}': json.sys.country || '..',
            '{{date}}': dateBuilder(),
            '{{temp}}': Math.round(json.main.temp),
            '{{status}}': json.weather[0].description
        });
        if(json.main.temp > 16) document.getElementById('app').classList.add('warm');
        else document.getElementById('app').classList.remove('warm');
    });
}

settings.search.addEventListener('keyup', e => {if(e.code === 'Enter' && settings.search.value.length > 0) set(settings.search.value);});
getLocation(response => set(response.city));
