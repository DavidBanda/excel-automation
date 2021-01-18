// Label the input for the excel files

const inputExcelFiles = document.querySelector('#custom-input-excel');

inputExcelFiles.addEventListener('change', (event) => {
    const filesNumber = event.target.files.length;
    const labelExcelFiles = document.querySelector('#custom-label-excel');

    if (filesNumber === 1) {
        labelExcelFiles.innerText = event.target.files.item(0).name;
        return;
    } else if (filesNumber === 0) {
        labelExcelFiles.innerText = "Choose excel file(s)";
        return;
    }

    labelExcelFiles.innerText = `${filesNumber} file(s) selected`;
})

// Label the input for the template file

const inputTemplateFile = document.querySelector('#custom-input-template');

inputTemplateFile.addEventListener('change', (event) => {
    const filesNumber = event.target.files.length;
    const labelTemplateFiles = document.querySelector('#custom-label-template');

    if (filesNumber === 1) {
        labelTemplateFiles.innerText = event.target.files.item(0).name;
        return;
    }

    labelTemplateFiles.innerText = "Choose template file";
})