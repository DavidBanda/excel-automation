// Label file name for excel files

const inputExcelFiles = document.querySelector('#custom-input-excel');
const labelExcelFiles = document.querySelector('#custom-label-excel');

inputExcelFiles.addEventListener('change', (event) => {
    const filesNumber = event.target.files.length;

    if (filesNumber == 1) {
        labelExcelFiles.innerText = event.target.files.item(0).name;
        return;
    } else if (filesNumber == 0) {
        labelExcelFiles.innerText = "Choose excel file(s)";
        return;
    }

    labelExcelFiles.innerText = `${filesNumber} file(s) selected`;
})

// Label file name for template files

const inputLabelFiles = document.querySelector('#custom-input-template');
const labelTemplateFiles = document.querySelector('#custom-label-template');

inputLabelFiles.addEventListener('change', (event) => {
    const filesNumber = event.target.files.length;

    if (filesNumber >= 1) {
        labelTemplateFiles.innerText = event.target.files.item(0).name;
        return;
    } else {
        labelTemplateFiles.innerText = "Choose template file(s)";
        return;
    }
})