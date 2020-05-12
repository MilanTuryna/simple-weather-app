const API = {
    key: '90096f81c276b2300244b9b57249a713',
    getResult:
        (query, callback) => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${API.key}&lang=${settings.lang}`)
            .then(r => r.json())
            .then(json => callback(json)),
};

const settings =  {
    keypress: 'Enter',
    search: document.getElementById('search-bar'),
    lang: 'cz',
    diacritic: {
        'á': 'a',
        'č': 'c',
        'ď' : 'd',
        'é': 'e',
        'ě': 'e',
        'í': 'i',
        'ň': 'n',
        'ó': 'o',
        'ř': 'r',
        'š': 's',
        'ť': 't',
        'ú': 'u',
        'ů': 'u',
        'ý': 'y',
        'ž': 'z'
    }
};