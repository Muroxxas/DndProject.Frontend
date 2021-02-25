function bindRemoveCastableBy() {
    $(".castableByRemove").off().on('click', function (e) {
        e.preventDefault();
        $(this).parents(".castableRow").remove();
    })
}

$(document).ready(function () {
    bindAddBlankCastableBy();
    bindRemoveCastableBy();
    bindMaterialsToggle();
})