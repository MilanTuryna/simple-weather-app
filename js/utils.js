String.prototype.strReplace = function (map) {
    return this.replace(new RegExp("(" + Object.keys(map).map(
        function(i) {
            return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
        }).join("|") + ")", "g"),
        function(s) {
            return map[s]
        });
};

const Utils = {
    createComponent: (element, template, vars) => element.innerHTML = document.getElementById(template).innerHTML.strReplace(vars),
    getLocation: (cb) => fetch('http://ip-api.com/json/')
        .then(r => r.json())
        .then(r => cb(r)),
    dateBuilder: function () {
        let d = new Date();
        let months = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"];
        let days = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date}. ${month} ${year}`;
    }
};

