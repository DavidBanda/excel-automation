const uploadButton = document.querySelector('.upload-button');
const divTable = document.querySelector('.divTable');
const dataTable = document.querySelector('#DT_load');

filesInputExcel.addEventListener('change', handleFileSelect, false);
filesInputTemplate.addEventListener('change', loadColumnsDT, false);


function loadColumnsDT(evt) {
    divTable.hidden = false;
    $('#DT_load').DataTable({
        "scrollX": true,
    });
    handleFileSelect(evt);
}

function handleFileSelect(evt) {

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(evt.target.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result, evt.target.className);
                };
                reader.readAsBinaryString(evt.target.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data, evt.target.className);
                };
                reader.readAsArrayBuffer(evt.target.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
}

function ProcessExcel(data, fileInputName) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    if (fileInputName.includes("custom-input-template")) {
        for (var key of workbook.Strings) {
            $("#DT_load>thead>tr").append(`<th>${key['t']}</th>`);
            $("#DT_load>tbody>tr").append(`<td>
                                             <div class="col-auto mx-5">
                                               <select class="custom-select mr-5" id="inlineFormCustomSelect">
                                                 <option selected>Columns</option>
                                               </select>
                                             </div>
                                           </td>`);
        }
        return;
    }

    ////Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.

    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    ////console.log(Object.keys(excelRows[0]));

};
