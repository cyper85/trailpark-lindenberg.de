function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("trails.json", function(text){
    const data = JSON.parse(text);
    const trailtable = document.body.querySelector('#trailtable');

    console.log(data);

    // Empty Table
    trailtable.innerHTML = "";

    // Table Head
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const tr_head = document.createElement("tr");
    const th_city = document.createElement("th");
    const th_zone = document.createElement("th");
    const th_trail = document.createElement("th");
    const th_state = document.createElement("th");
    th_city.innerHTML = "City";
    th_zone.innerHTML = "Zone";
    th_trail.innerHTML = "Trail";
    th_state.innerHTML = "State";

    tr_head.appendChild(th_city);
    tr_head.appendChild(th_zone);
    tr_head.appendChild(th_trail);
    tr_head.appendChild(th_state);
    thead.appendChild(tr_head);
    trailtable.appendChild(thead);
    trailtable.appendChild(tbody);
    var current_tr = document.createElement("tr");
    tbody.appendChild(current_tr);
    for (city in data) {
        const city_td = document.createElement("td");
        city_td.classList.add("city");
        city_td.innerHTML = city;
        var rowspan = 0;
        for(zone in data[city]) { rowspan += Object.keys(data[city][zone]).length; }
        city_td.setAttribute("rowspan",rowspan);
        current_tr.appendChild(city_td);

        for(zone in data[city]) {
            const zone_td = document.createElement("td");
            zone_td.classList.add("zone");
            zone_td.innerHTML = zone;
            zone_td.setAttribute("rowspan",Object.keys(data[city][zone]).length);
            current_tr.appendChild(zone_td);

            for(trail in data[city][zone]) {
                const trail_td = document.createElement("td");
                trail_td.classList.add("trail");
                trail_td.innerHTML = trail;
                current_tr.appendChild(trail_td);
                const state_td = document.createElement("td");
                current_tr.appendChild(state_td);
                state_td.classList.add("state");

                if (data[city][zone][trail]['status'] == "ACTIVE") {
                    trail_td.classList.add("bg-success");
                    state_td.classList.add("bg-success");
                } else if (data[city][zone][trail]['status'] == "WARNING") {
                    trail_td.classList.add("bg-warning");
                    state_td.classList.add("bg-warning");
                    trail_td.classList.add("text-black");
                    state_td.classList.add("text-black");
                } else if (data[city][zone][trail]['status'] == "DESTROYED") {
                    trail_td.classList.add("bg-danger");
                    state_td.classList.add("bg-danger");
                    state_td.innerHTML = "&#9760;";
                } else {
                    trail_td.classList.add("bg-danger");
                    state_td.classList.add("bg-danger");
                }

                if (data[city][zone][trail]['message']) {
                    state_td.innerHTML = data[city][zone][trail]['message'];
                }

                current_tr = document.createElement("tr");
                tbody.appendChild(current_tr);
            }
        }
    }


});