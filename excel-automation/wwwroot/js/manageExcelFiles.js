const uploadButton = document.querySelector('.upload-button');
const divTable = document.querySelector('.divTable');

filesInputExcel.addEventListener('change', handleFileSelect, false);
filesInputTemplate.addEventListener('change', loadColumnsDT, false);

//add columns to the table
//$("#DT_load>thead>tr").append("<th>Actions</th>");

function loadColumnsDT(evt) {
    divTable.hidden = false;
    $("#DT_load>thead>tr").append("<th>name</th>");
    $("#DT_load>thead>tr").append("<th>size</th>");
    $("#DT_load>thead>tr").append("<th>actions</th>");
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
}

var ExcelToJSON = function () {

    this.parseExcel = function (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            workbook.SheetNames.forEach(function (sheetName) {
                // Here is your object

                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var json_object = JSON.stringify(XL_row_object);
                console.log(JSON.parse(json_object));
                jQuery('#xlx_json').val(json_object);
            })
        };

        reader.onerror = function (ex) {
            console.log(ex);
        };

        reader.readAsBinaryString(file);
    };
};



