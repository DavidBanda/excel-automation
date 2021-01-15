let createColumns = (strings) => {
    let columnNumber = 0;
    for (var key of strings) {
        selectedColumns.push(0);
        $("#data-table>thead>tr").append(`<th>
                                            <div class="cell-size">${key['t']}</div>
                                          </th>`);
        addColumn(key['t'], columnNumber);
        columnNumber++;
    }
}

function addColumn(columnName, columnNumber) {
    [...document.querySelectorAll('#table-link tr')].forEach((row, i) => {
        const cell = document.createElement(i ? "td" : "th");
        if (i === 0) {
            cell.append(columnName);
        } else {
            cell.appendChild(optionsComponent(columnNumber));
        }
        row.appendChild(cell);
    });
}

let optionsComponent = (columnNumber) => {
    const div = document.createElement("div");
    div.setAttribute("class", "col-auto");
    const select = document.createElement("select");
    select.setAttribute("id", `${columnNumber}`);
    select.setAttribute("class", "custom-select");
    //select.setAttribute("onchange", "getValue(this)");
    select.addEventListener('change', getValue, false);

    const defaultOption = document.createElement("option");
    defaultOption.append("-- Select Column --");
    defaultOption.setAttribute("selected", "true");
    defaultOption.setAttribute("disabled", "disabled");

    select.appendChild(defaultOption);

    for (const key of Object.keys(columnsData)) {
        const optgroup = document.createElement("optgroup");
        optgroup.setAttribute("label", key);

        for (const value of columnsData[key]) {
            const option = document.createElement("option");
            option.setAttribute("value", `${key}|${value}`);

            option.append(value);
            optgroup.appendChild(option);
        }
        select.appendChild(optgroup);
    }

    div.appendChild(select);

    return div
}