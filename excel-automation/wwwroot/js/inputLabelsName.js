// Input file name for excel files

const filesInputExcel = document.querySelector('.custom-input-excel');
const ExcelLabelFiles = document.querySelector('.custom-label-excel');

filesInputExcel.addEventListener('change', (event) => {
    const filesNumber = event.target.files.length;

    if (filesNumber == 1) {
        ExcelLabelFiles.innerText = event.target.files.item(0).name;
        return;
    } else if (filesNumber == 0) {
        ExcelLabelFiles.innerText = "Choose excel file(s)";
        return;
    }

    ExcelLabelFiles.innerText = `${filesNumber} file(s) selected`;
})

// Input file name for template files

const filesInputTemplate = document.querySelector('.custom-input-template');
const TemplateLabelFiles = document.querySelector('.custom-label-template');

filesInputTemplate.addEventListener('change', (event) => {
    const filesNumber = event.target.files.length;

    if (filesNumber >= 1) {
        TemplateLabelFiles.innerText = event.target.files.item(0).name;
        return;
    } else {
        ExcelLabelFiles.innerText = "Choose template file(s)";
        return;
    }
})