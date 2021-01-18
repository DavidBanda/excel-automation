let createColumns = (strings) => {
    //create the columns of each table, the table link and the datatable
    let columnNumber = 0;
    for (var key of strings) {
        selectedColumns["userSelectedColumns"].push(0);
        selectedColumns["fileNameWithColumnName"].push(0);
        // add a column th for each string to the data table 
        $("#data-table>thead>tr").append(`<th>
                                            <div class="cell-size">${key['t']}</div>
                                          </th>`);
        // add columns th and td to the table link
        addColumn(key['t'], columnNumber);
        columnNumber++;
    }
}

function addColumn(columnName, columnNumber) {
    // add a column in the last position to the table
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
    select.setAttribute("class", "custom-select");
    select.addEventListener('change', getValue.bind(event, columnNumber), false);

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
            option.setAttribute("value", `{ "${key}": "${value}" }`);

            option.append(value);
            optgroup.appendChild(option);
        }
        select.appendChild(optgroup);
    }

    div.appendChild(select);

    return div
}