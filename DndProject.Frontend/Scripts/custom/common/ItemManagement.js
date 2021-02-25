function bindAddTagToItem() {
    $("#addTagButton").off().on('click', function (e) {
        e.preventDefault();
        var index = $("[name = 'Tags.Index']").last().val();

        index = parseInt(index);
        var testIfNan = Number.isNaN(index);
        if (testIfNan == true) {
            index = 0;
        }
        $.ajax({
            url: "/Items/AddBlankTag",
            type: "GET",
            data: { Index: index },
            success: function (data) {
                $(".card-body").append(data);
                bindRemoveTagFromItem();
            },

        })
    })
}