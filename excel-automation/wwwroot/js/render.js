const renderButton = document.querySelector('#render-button');
const originalColumnTable = document.getElementById("table-link").innerHTML;

inputExcelFiles.addEventListener('change', addExcelFiles, false);
inputLabelFiles.addEventListener('change', addTemplateFiles, false);
renderButton.addEventListener('click', processData);

function addExcelFiles(evt) {
    excelFiles = evt;
    enableRenderButton();
};

function addTemplateFiles(evt) {
    templateFiles = evt;
    enableRenderButton();
};

function enableRenderButton() {
    if (excelFiles && templateFiles) {
        renderButton.disabled = false;
    }
}

async function processData() {

    if (document.querySelector('#div-table-link').hidden === false) {
        document.querySelector('#div-table-link').hidden = true;
        document.querySelector('#render-table-div').hidden = true;
        document.getElementById("table-link").innerHTML = originalColumnTable;
        filesObj = {};
    }

    for (let i = 0; i < excelFiles.target.files.length; i++) {
        //process excel files.
        await handleFileSelect(excelFiles.target.files[i], excelFiles.target.id, excelFiles.target.files[i].name);
    }
    //process template file. 
    handleFileSelect(templateFiles.target.files[0], templateFiles.target.id, templateFiles.target.files[0].name);

    toastr.options.closeButton = true;
    toastr.success("The files has been loaded successfully!")

    document.querySelector('#div-table-link').hidden = false;
    document.querySelector('#render-table-div').hidden = false;
}