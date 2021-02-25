function bindRemoveTagFromItem() {
    $(".removeTagButton").off().on('click', function (e) {
        e.preventDefault();

        var caller = $(this);
        var item_id = $("[name='Item_id']").val();
        var tag_id = caller.parent().children(".TagID").val();
        var AFT = $("[name='__RequestVerificationToken']").val();
        if (tag_id != null) {
            $.ajax({
                url: "/Items/RemoveTagFromItem",
                type: "POST",
                data: {
                    Item_id: item_id,
                    Tag_id: tag_id,
                    __RequestVerificationToken: AFT
                },
                success: function () {
                    caller.parents(".tag-row").remove();
                },
                fail: function () {
                    alert("TAG REMOVAL FAILED!");
                }
            })
        }
        else {
            caller.parents(".tag-row").remove();
        }
    })
}

function bindDeleteItem() {
    $("#deleteItemButton").click(function (e) {
        e.preventDefault();
        var item_id = $("[name='Item_id']").val();
        var AFT = $("[name='__RequestVerificationToken']").val();

        $.ajax({
            url: "/Items/DeleteItem",
            type: "POST",
            data: {
                Item_id: item_id,
                __RequestVerificationToken: AFT
            },
            success: function (result) {
                window.location.href = result
            }
        })
    })
}
$(document).ready(function () {
    bindAddTagToItem();
    bindRemoveTagFromItem();
    bindDeleteItem();
})