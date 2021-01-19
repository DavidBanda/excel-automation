//store the columns of each excel input file
let columnsData = {};
//store the proccessed data of each excel input file
let filesData = {};

function handleFileSelect(file, inputName, fileName) {

    return new Promise(resolve => {
        //Validate whether File is valid Excel file.
        let regex = /^([a-zA-Z0-9\s_\\().,\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileName.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                let reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        resolve(ProcessExcel(e.target.result, inputName, fileName));
                    };
                    reader.readAsBinaryString(file);
                } else {
                    //For IE Browser. 
                    reader.onload = function (e) {
                        let data = "";
                        let bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        resolve(ProcessExcel(data, inputName, fileName));
                    };
                    reader.readAsArrayBuffer(file);
                }
            } else {
                toastr.warning("This browser does not support HTML5.");
            }
        } else {
            toastr.warning("Please upload a valid Excel file.");
        }
    });
}

function ProcessExcel(data, inputName, fileName) {
    //Read the Excel File data.
    let workbook = XLSX.read(data, {
        type: 'binary'
    });

    //create the columns of the template file.
    if (inputName.includes("custom-input-template")) {
        createColumns(workbook.Strings);
        return;
    }

    //Fetch the name of First Sheet. 
    let firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array. 
    let excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    // store the data of the excel file 
    filesData[firstSheet] = excelRows;

    console.log(`${fileName} processed`);

    //store the columns of the excel file  
    columnsData[firstSheet] = [];
    Object.keys(excelRows[0]).forEach(function (key) {
        columnsData[firstSheet].push(key);
    });
};

