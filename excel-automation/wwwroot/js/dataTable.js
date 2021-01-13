function loadDataTable() {
    dataTable = $('#data-table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });
}


