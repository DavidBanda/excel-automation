﻿let createColumns = (strings) => {
    for (var key of strings) {
        addColumn(key['t']);
    }
}

function addColumn(columnName) {
    [...document.querySelectorAll('#tableLink tr')].forEach((row, i) => {
        const cell = document.createElement(i ? "td" : "th");
        if (i === 0) {
            cell.append(columnName);
        } else {
            cell.appendChild(optionsComponent());
        }
        row.appendChild(cell);
    });
}

let optionsComponent = () => {
    const div = document.createElement("div");
    div.setAttribute("class", "col-auto");
    const select = document.createElement("select");
    select.setAttribute("class", "custom-select");

    for (const fileName of Object.keys(filesObj)) {
        for (const key of Object.keys(filesObj[fileName])) {
            const optgroup = document.createElement("optgroup");
            optgroup.setAttribute("label", key);

            for (const value of filesObj[fileName][key]) {
                const option = document.createElement("option");
                option.append(value);
                optgroup.appendChild(option);
            }
            select.appendChild(optgroup);
        }
    }

    div.appendChild(select);

    return div
}