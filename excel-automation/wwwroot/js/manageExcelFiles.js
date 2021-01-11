let excelFiles;
let templateFiles;
let filesData = {};

function handleFileSelect(file, inputFileName, fileName) {

    return new Promise(resolve => {
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.,\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileName.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        resolve(ProcessExcel(e.target.result, inputFileName));
                    };
                    reader.readAsBinaryString(file);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        resolve(ProcessExcel(data, inputFileName));
                    };
                    reader.readAsArrayBuffer(file);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    });
}

function ProcessExcel(data, inputFileName) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    if (inputFileName.includes("custom-input-template")) {
        createColumns(workbook.Strings);
        return;
    }

    for (let sheetNumber = 0; sheetNumber < workbook.SheetNames.length; sheetNumber++) {
        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[sheetNumber];

        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

        filesData[firstSheet] = [];
        Object.keys(excelRows[0]).forEach(function (key) {
            filesData[firstSheet].push(key);
        });
    }
};

