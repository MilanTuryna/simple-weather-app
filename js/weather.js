const Weather = {
    set: function (city) {
        API.getResult(city.toLowerCase().strReplace(settings.diacritic), json => {
            Utils.createComponent(document.getElementById('weather-id'), 'weather--result', {
                '{{city}}': city,
                '{{country}}': json.sys.country || 'neznámá',
                '{{date}}': Utils.dateBuilder(),
                '{{temp}}': Math.round(json.main.temp),
                '{{status}}': json.weather[0].description
            });
            if(json.main.temp >= 16) document.getElementById('app').classList.add('warm');
            else document.getElementById('app').classList.remove('warm');
        });
    }
};

Utils.getLocation(response => Weather.set(response.city));
settings.search.addEventListener('keyup', e => {if(e.code === 'Enter' && settings.search.value.length > 0) Weather.set(settings.search.value);});

