var table;

function loadDataTable() {
    table = $('#data-table').DataTable({
        data: filesData["Head Count 30 Noviembre 2020"],
        columns: [
            { data: 'No Work day' },
            { data: 'No SAP/KRONOS' },
            { data: 'NAME' },
            { data: 'HIRING DATE' },
            { data: 'SHIFT' },
            { data: 'CLASS' },
            { data: 'POSITION' },
            { data: 'JOB  NUMBER' },
            { data: 'JOB ' },
            { data: 'PS GROUP' },
            { data: 'CC' },
            { data: 'DEPARTAMENTO' },
            { data: 'CELULA' },
            { data: 'AGREEMENT' },
            { data: 'SUP´s ID' },
            { data: 'SUPERVISOR' },
            { data: 'CONTRACT END' },
            { data: 'ANTIGÜEDAD EN PUESTO ACTUAL' },
            { data: 'CUENTA DE CORREO' },
            { data: 'CUENTA NT' },
            { data: 'GENERO' },
            { data: 'EDAD' },
        ],
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


