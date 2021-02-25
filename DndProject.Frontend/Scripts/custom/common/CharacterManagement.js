function bindAddBlankNote() {
    $("#addNoteButton").click(function (e) {
        var index = $("[name='Model.Notes.Index']").last().val();

        index = parseInt(index);
        var testIfNan = Number.isNaN(index);
        if (testIfNan == true) {
            index = 0;
        }

        $.ajax({
            url: "/Character/AddBlankNote",
            type: "GET",
            data: { Index: index },
            success: function (data) {
                $("#notesInnerTab").append(data.noteTabPartialView);
                $("#notesInnerTabContents").append(data.noteContentsPartialView);

                bindRemoveNote();
            }
        })
    })
}

function bindFindItems() {
    $(".findNewItemsButton").click(function (e) {
        e.preventDefault();

        var SearchString = $("#newItemSearchBox").val();
        var GetItemsBy = $("input[name='itemSearchBy']:checked").val();
        var index = $("[name='Model.Inventory.Items.Index']").last().val();

        index = parseInt(index);
        var testIfNan = Number.isNaN(index);
        if (testIfNan == true) {
            index = 0;
        }

        $.ajax({
            url: "/Character/FindItems",
            type: "GET",
            data: {
                searchString: SearchString,
                getItemsBy: GetItemsBy,
                Index : index
            },
            success: function (data) {
                $("#characterModal").html(data);
                $("#characterModal").modal('show');
                bindSelectNewItem();
            }
        })
    })
}

function bindSelectNewItem() {
    $(".addItemButton").click(function (e) {
        e.preventDefault();
        var caller = $(this);

        var character_id;
        if ($("#Character_id").Length) {
            character_id = $("#Character_id").val();
        }
        else {
            character_id = "00000000-0000-0000-0000-000000000000";
        }

        var AFT = $("[name='__RequestVerificationToken']").val();
        var item_id = caller.parent().children("[name='Item_id']").val();

        var index = $("[name='Model.Inventory.Items.Index']").last().val();
        index = parseInt(index);
        var testIfNan = Number.isNaN(index);
        if (testIfNan == true) {
            index = 0;
        }

        $.ajax({
            url: "/Character/AddItemToInventory",
            type: "POST",
            data: {
                __RequestVerificationToken: AFT,
                Character_id: character_id,
                Item_id, item_id,
                Index, index
            },
            success: function (data) {
                $("#inventoryTable").append(data);
                bindRemoveItemFromInventory();
            }

        })
    })
}

function bindSpellMoreInfo() {
    $(".spellMoreInfoButton").off().on('click', function (e) {
        e.preventdefault();
        var caller = $(this);

        var spell_id = caller.parent().children("[name='Spell_id']").val();
        $.ajax({
            ur: "/Character/GetSpellDetails",
            type: "GET",
            data: { Spell_id: spell_id },
            success: function (data) {
                $("#characterModal").html(data);
                $("#characterModal").modal('show');
            }
        })
               
    })
}