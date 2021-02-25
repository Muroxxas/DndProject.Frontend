
function bindRemoveTagFromItem() {
    $(".removeTagButton").click(function (e) {
        e.preventDefault();
        $(this).parents(".tag-row").remove();
    })
}

$(document).ready(function () {
    bindAddTagToItem();
    bindRemoveTagFromItem();
})