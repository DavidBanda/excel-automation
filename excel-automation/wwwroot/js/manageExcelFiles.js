const uploadButton = document.querySelector('.upload-button');
const btnAddColumn = document.querySelector('#addColumn');
const divTableLink = document.querySelector('.divTableLink');
const renderTableDiv = document.querySelector('.renderTableDiv');

filesInputExcel.addEventListener('change', excelVerifyFiles, false);
filesInputTemplate.addEventListener('change', templateVerifyFiles, false);
uploadButton.addEventListener('click', processData);

let excelVerify = false;
let templateVerify = false;
let excelFiles;
let templateFiles;

function processData() {
    divTableLink.hidden = false;
    renderTableDiv.hidden = false;
    handleFileSelect(templateFiles);
    handleFileSelect(excelFiles);
}

function excelVerifyFiles(evt) {
    excelVerify = true;
    excelFiles = evt;
    enableRenderButton();
};

function templateVerifyFiles(evt) {
    templateVerify = true;
    templateFiles = evt;
    enableRenderButton();
};

function enableRenderButton() {
    if (excelVerify && templateVerify) {
        uploadButton.disabled = false;
    }
}

function handleFileSelect(file) {

    //Validate whether File is valid Excel file.

    console.log(file.target.value.toLowerCase());
    var regex = /^([a-zA-Z0-9\s_\\.,\-:])+(.xls|.xlsx)$/;
    if (regex.test(file.target.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result, file.target.className);
                };
                reader.readAsBinaryString(file.target.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data, file.target.className);
                };
                reader.readAsArrayBuffer(file.target.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
}

function ProcessExcel(data, fileInputName) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    if (fileInputName.includes("custom-input-template")) {
        for (var key of workbook.Strings) {
            addColumn(key['t']);
        }
        return;
    }

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[1];

    //Read all rows from First Sheet into an JSON array.

    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    Object.keys(excelRows[0]).forEach(function (key) {
        console.log(key);
    });

};

function addColumn(columnName) {
    [...document.querySelectorAll('#tableLink tr')].forEach((row, i) => {
        const cell = document.createElement(i ? "td" : "th");
        if (i === 0) {
            cell.append(columnName);
        } else {
            cell.appendChild(createComponent());
        }
        row.appendChild(cell);
    });
}

let createComponent = () => {
    const div = document.createElement("div");
    div.setAttribute("class", "col-auto");
    const select = document.createElement("select");
    select.setAttribute("class", "custom-select");
    const option = document.createElement("option");
    option.append("Choose");

    select.appendChild(option);
    select.appendChild(option2);
    div.appendChild(select);

    return div
}

let createOptionsComponent = () => {

}