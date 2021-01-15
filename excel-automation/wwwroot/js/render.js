﻿const renderFileButton = document.querySelector('#render-file-button');
const renderTableButton = document.querySelector('#render-table-button');
const dataTable = document.getElementById('data-table');
const originalColumnTable = document.getElementById("table-link").innerHTML;
let selectedColumns = [];

inputExcelFiles.addEventListener('change', addExcelFiles, false);
inputLabelFiles.addEventListener('change', addTemplateFiles, false);
renderFileButton.addEventListener('click', processData);
renderTableButton.addEventListener('click', renderTableData, false);

toastr.options.closeButton = true;
toastr.options.newestOnTop = true;

function addExcelFiles(evt) {
    excelFiles = evt;
    enableRenderButton();
};

function addTemplateFiles(evt) {
    templateFiles = evt;
    enableRenderButton();
};

function enableRenderButton() {
    if (excelFiles && templateFiles && document.querySelector('#render-table-div').hidden === true) {
        renderFileButton.disabled = false;
    }
}

function renderTableData() {
    loadDataTable();
    document.querySelector('#render-table-div').hidden = false;

    renderFileButton.disabled = true;
    renderTableButton.disabled = true;
    toastr.success("The table has been rendered successfully!")
}

async function processData() {

    if (document.querySelector('#div-table-link').hidden === false) {
        document.querySelector('#div-table-link').hidden = true;
        document.querySelector('#render-table-div').hidden = true;
        document.querySelector('#div-render-button').hidden = true;
        document.getElementById("table-link").innerHTML = originalColumnTable;
        columnsData = {};
    }

    for (let i = 0; i < excelFiles.target.files.length; i++) {
        //process excel files.
        await handleFileSelect(excelFiles.target.files[i], excelFiles.target.id, excelFiles.target.files[i].name);
    }
    //process template file.
    handleFileSelect(templateFiles.target.files[0], templateFiles.target.id, templateFiles.target.files[0].name);

    toastr.success("The files has been loaded successfully!")

    document.querySelector('#div-table-link').hidden = false;
    document.querySelector('#div-render-button').hidden = false;
}

function getValue(evt) {
    const id = evt.target.id;
    const nameColumn = evt.target.value.split("|")[1];
    selectedColumns[id] = { data: nameColumn };
}

