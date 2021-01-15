var table;

function loadDataTable() {
    let arr = Object.keys(filesData["Head Count 30 Noviembre 2020"][0]);
    arr.forEach(function (part, index) {
        this[index] = { data: part };
    }, arr);

    table = $('#data-table').DataTable({
        data: filesData["Head Count 30 Noviembre 2020"],
        columns: selectedColumns,
        dom: "<'row dom_wrapper fh-fixedHeader col-sm col-md'B>" +
        "<'row mt-3'<'col-sm col-md'l><'col-sm col-md'f>>" +
        "<'row'<'col-sm col-md'tr>>" +
            "<'row mt-2'<'col-sm col-md'i><'col-sm col-md'p>>",
        buttons: [
            {
                extend: 'copy',
                header: false,
                title: null,
                className: 'btn-primary',
            },
            {
                extend: 'csv',
                title: templateFiles.target.files[0].name.split(".")[0],
                className: 'btn-primary',
            },
            {
                extend: 'excel',
                title: templateFiles.target.files[0].name.split(".")[0],
                className: 'btn-primary',
            },
            {
                extend: 'pdf',
                title: templateFiles.target.files[0].name.split(".")[0],
                className: 'btn-primary',
            },
            {
                extend: 'print',
                title: templateFiles.target.files[0].name.split(".")[0],
                className: 'btn-primary',
            },
            {
                text: 'Reload',
                action: function () {
                        location.reload();
                },
                className: 'btn-primary',
            },
        ],
        columnDefs: [{
            "targets": '_all',
            "defaultContent": ""
        }],
        language: {
            "emptyTable": "no data found"
        },
        scrollX: true,
        width: "100%"
    });
}

function columnsValues() {
    var table = document.getElementById('table-link');
    for (var opt = 0; opt < table.rows[1].cells.length; opt++) {
        console.log(table.rows[1].cells[opt]);
    }
}

