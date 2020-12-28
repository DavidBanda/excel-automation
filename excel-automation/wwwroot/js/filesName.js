// Input file name for excel files

const filesInputExcel = document.querySelector('.custom-input-excel');
const ExcelLabelFiles = document.querySelector('.custom-label-excel')

filesInputExcel.addEventListener('change', (event) => {
    if (event.target.files.length == 1) {
        ExcelLabelFiles.innerText = event.target.files.item(0).name;
        return;
    }

    const filesNumber = event.target.files.length;
    ExcelLabelFiles.innerText = `${event.target.files.length} files(s) selected`
})

// Input file name for template files

const filesInputTemplate = document.querySelector('.custom-input-template');
const TemplateLabelFiles = document.querySelector('.custom-label-template')

filesInputTemplate.addEventListener('change', (event) => {
    if (event.target.files.length == 1) {
        TemplateLabelFiles.innerText = event.target.files.item(0).name;
        return;
    }

    const filesNumber = event.target.files.length;
    TemplateLabelFiles.innerText = `${event.target.files.length} files(s) selected`
})