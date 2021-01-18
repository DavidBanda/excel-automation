const renderFileButton = document.querySelector('#render-file-button');
const renderTableButton = document.querySelector('#render-table-button');
const originalColumnTable = document.getElementById("table-link").innerHTML;

//set toastr options
toastr.options.closeButton = true;
toastr.options.newestOnTop = true;

// variable to store the selected columns for the user to fill in the datatable
let selectedColumns = {
    userSelectedColumns: [],
    fileNameWithColumnName: [],
};

//variable to store the excel files (unprocessed)  
let excelFiles;
let templateFile;

inputExcelFiles.addEventListener('change', addExcelFiles, false);
inputTemplateFile.addEventListener('change', addTemplateFiles, false);

renderFileButton.addEventListener('click', processData, false);
renderTableButton.addEventListener('click', renderTableData, false);

function addExcelFiles(evt) {
    excelFiles = evt;
    enableRenderButton();
};

function addTemplateFiles(evt) {
    templateFile = evt;
    enableRenderButton();
};

function enableRenderButton() {
    const divDataTable = document.querySelector('#div-data-table');

    if (excelFiles && templateFile && divDataTable.hidden === true) {
        renderFileButton.disabled = false;
    }
}

function renderTableData() {
    const divDataTable = document.querySelector('#div-data-table');

    loadDataTable();

    //show the data table div
    divDataTable.hidden = false;

    //disable the render buttons 
    renderFileButton.disabled = true;
    renderTableButton.disabled = true;

    toastr.success("The table has been rendered successfully!")
}

//process the data of each excel file and the template file and store it in the
//columnsData and filesData variables
async function processData() {

    const divTableLink = document.querySelector('#div-table-link');
    const divRenderButton = document.querySelector('#div-render-button');
    const tableLink = document.getElementById("table-link");

    //hide the render table button, the table link and set to null the columnsData variable
    //until the process excel files finish again 
    if (divTableLink.hidden === false) {
        divTableLink.hidden = true;
        divRenderButton.hidden = true;
        tableLink.innerHTML = originalColumnTable;
        columnsData = {};
    }

    //process the excel files data using async await
    for (let i = 0; i < excelFiles.target.files.length; i++) {
        //process excel files. 
        await handleFileSelect(excelFiles.target.files[i], excelFiles.target.id, excelFiles.target.files[i].name);
    }
    //process template file.
    await handleFileSelect(templateFile.target.files[0], templateFile.target.id, templateFile.target.files[0].name);

    toastr.success("The files has been loaded successfully!")
 
    divTableLink.hidden = false;
    divRenderButton.hidden = false;
}

function getValue(idx) {
    let strOptionName = event.target.value;
    const objOptionName = JSON.parse(strOptionName);
    for (key in objOptionName) strOptionName = objOptionName[key];

    selectedColumns["fileNameWithColumnName"][idx] = objOptionName;
    selectedColumns["userSelectedColumns"][idx] = { data: strOptionName };
}

