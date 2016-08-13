$(function() {
    addRow();
});


function addRow() {
    var line=$('#formLine').clone().show().prop("id",'').insertBefore('#addRow');
    line.find('.removeRow').click( removeRow );

}

function removeRow( event ) {
    $(event.target.closest('.formLine')).remove();
}

function submit() {
    $.post(
        "",
        $('#addRelationForm').serialize(),
        function (data, status) {
            console.log("submit status: " + status + ", data: " + data);
            alert( data );
        }
    );
}

