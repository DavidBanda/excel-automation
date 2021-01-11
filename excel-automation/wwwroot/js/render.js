const uploadButton = document.querySelector('.upload-button');

inputExcelFiles.addEventListener('change', addExcelFiles, false);
inputLabelFiles.addEventListener('change', addTemplateFiles, false);
uploadButton.addEventListener('click', processData);

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
        uploadButton.disabled = false;
    }
}

async function processData() {

    for (let i = 0; i < excelFiles.target.files.length; i++) {
        //process excel files
        await handleFileSelect(excelFiles.target.files[i], excelFiles.target.className, excelFiles.target.files[i].name);
    }
    //process template files
    handleFileSelect(templateFiles.target.files[0], templateFiles.target.className, templateFiles.target.value);
    document.querySelector('.divTableLink').hidden = false;
    document.querySelector('.renderTableDiv').hidden = false;
}