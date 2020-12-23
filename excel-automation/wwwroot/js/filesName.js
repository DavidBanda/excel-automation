const filesInput = document.querySelector('.custom-file-input');
const labelFiles = document.querySelector('.custom-file-label')

filesInput.addEventListener('change', (event) => {
    if (event.target.files.length == 1) {
        labelFiles.innerText = event.target.files.item(0).name;
        return;
    }

    const filesNumber = event.target.files.length;
    labelFiles.innerText = `${event.target.files.length} files(s) selected`
})