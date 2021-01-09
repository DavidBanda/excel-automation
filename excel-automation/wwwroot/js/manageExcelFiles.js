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
let filesData = {};

async function processData() {

    for (let i = 0; i < excelFiles.target.files.length; i++) {
        await handleFileSelect(excelFiles.target.files[i], excelFiles.target.className, excelFiles.target.files[i].name);
    }
    handleFileSelect(templateFiles.target.files[0], templateFiles.target.className, templateFiles.target.value);
    divTableLink.hidden = false;
    renderTableDiv.hidden = false;
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

function handleFileSelect(file, className, fileName) {

    return new Promise(resolve => {
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.,\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileName.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        resolve(ProcessExcel(e.target.result, className));
                    };
                    reader.readAsBinaryString(file);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        resolve(ProcessExcel(data, className));
                    };
                    reader.readAsArrayBuffer(file);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    });
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

    for (let sheetNumber = 0; sheetNumber < workbook.SheetNames.length; sheetNumber++) {
        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[sheetNumber];

        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

        filesData[firstSheet] = [];
        Object.keys(excelRows[0]).forEach(function (key) {
            filesData[firstSheet].push(key);
        });
    }


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

    for (const key of Object.keys(filesData)) {
        const optgroup = document.createElement("optgroup");
        optgroup.setAttribute("label", key);

        for (const value of filesData[key]) {
            const option = document.createElement("option");
            option.append(value);
            optgroup.appendChild(option);
        }
        select.appendChild(optgroup);
    }


    div.appendChild(select);

    return div
}
