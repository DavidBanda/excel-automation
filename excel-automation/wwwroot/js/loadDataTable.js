var dataTable2;

function loadDataTable() {
    dataTable2 = $('#data-table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "scrollX": true,
        "width": "100%"
    });
}


