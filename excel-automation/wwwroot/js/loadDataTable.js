var table;

function loadDataTable() {
    let templateFileName = templateFile.target.files[0].name.split(".")[0];

    table = $('#data-table').DataTable({
        data: filesData["Head Count 30 Noviembre 2020"],
        columns: selectedColumns["userSelectedColumns"],
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
                title: templateFileName,
                className: 'btn-primary',
            },
            {
                extend: 'excel',
                title: templateFileName,
                className: 'btn-primary',
            },
            {
                extend: 'pdf',
                title: templateFileName,
                className: 'btn-primary',
            },
            {
                extend: 'print',
                title: templateFileName,
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


