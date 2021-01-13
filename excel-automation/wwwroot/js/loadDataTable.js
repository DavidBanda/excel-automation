var dataTable2;

function loadDataTable() {
    dataTable2 = $('#data-table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'copy',
                header: false,
                title: null
            },
            {
                extend: 'csv',
                title: templateFiles.target.files[0].name.split(".")[0]
            },
            {
                extend: 'excel',
                title: templateFiles.target.files[0].name.split(".")[0]
            },
            {
                extend: 'pdf',
                title: templateFiles.target.files[0].name.split(".")[0]
            },
            {
                extend: 'print',
                title: templateFiles.target.files[0].name.split(".")[0]
            },
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "scrollX": true,
        "width": "100%"
    });
}


