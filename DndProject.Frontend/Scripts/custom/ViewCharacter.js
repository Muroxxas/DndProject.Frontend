function bindNewClass() {
    //On click of add a class button,
    $("#AddClassButton").off().on('click',function (e) {
        e.preventDefault();
        //find the hidden ClassSelection input that has the highest index value. Take that, and increment.
        var element = $("[name='SelectedClasses.Index']").last().val();
        var index = (parseInt(element) + 1).toString();

        //Stack Overflow says not to access model via jQuery as it becomes messy during maintenance. Looks like we'll need to call an AJAX method instead
        $.ajax({
            url: "/Character/AddBlankCCSC",
            type: "GET",
            data: { Index: index },
            success: function (data) {
                $("#CharacterClassCard").append(data);
                bindRemoveClass();
            }
        });
    });


}
function bindRemoveClass() {
    $(".removeClass").off().on('click',function (e) {
        e.preventDefault();
        //Check if we have a ID associated with this CCSC item.
        if ($(this).parent().children().hasClass("CCSC_id")) {
            //item probably exists in DB. Attempt to drop it.
            var character_id = $("[name='Character_id']").val();
            var ccsc_id = $(this).parent().children().hasClass("CCSC_id").val();
            var AFT = $("[name='__RequestVerificationToken']").val();

            $.ajax({
                url: "/Character/DeleteCCSC?" + $.param({
                    "Character_id": character_id,
                    "CCSC_id": ccsc_id,
                    __RequestVerificationToken: AFT
                }),
                type: "POST",
                success: function () {
                    alert("Class successfully removed!");
                    $(this).parent().remove();
                },
                failure: function () {
                    alert("CLASS REMOVAL FAILED!");
                }

            })

        }
        else {
            //record doesn't exist in the DB. Just remove the field.
            $(this).parent().remove();
        }
    });
}

function bindNewNote() {
    //On click of add a note button,
    $("#AddNoteButton").off().on('click',function (e) {
        e.preventDefault();

        //find the hidden Notes input that has the highest index value. Take that, and increent.
        var element = $("[name='Notes.Index']").last().val();
        var index = (parseInt(element) + 1).toString();

        //Add a new note entry section to the form.
        $.ajax({
            url: "/Character/AddBlankNote/",
            type: "GET",
            data: { Index: index },
            success: function (data) {
                $("#NotesCard").append(data);
                bindRemoveNote();
            }
        })

    });
}
function bindRemoveNote() {
    $(".removeNote").off().on('click',function (e) {
        e.preventDefault();

        //check if we have an ID associated the note.
        if ($(this).parent().children().hasClass("Note_id")) {
            //item probably exists in DB, so we may be able to drop it.
            var character_id = $("[name='Character_id']").val();
            var note_id = $(this).parent().children().hasClass("Note_id").val();
            var AFT = $("[name='__RequestVerificationToken']").val();
            $.ajax({
                url: "/Character/DeleteNote?" + $.param({
                    "Character_id": character_id,
                    "Note_id": note_id,
                    __RequestVerificationToken : AFT
                }),
                type: "POST",
                success: function () {
                    alert("Note successfully removed!");
                    $(this).parent().remove();
                },
                failure: function () {
                    alert("NOTE REMOVAL FAILED!");
                }

            });
        }
        else {
            //record doesnt exist in DB. just remove field.
            $(this).parent().remove();
        }
    });
}

//who knows if this function will work properly.
function bindUpdateItemInInventory() {
    var changesTimer;
    var doneEditingInterval = 5000; //time in ms to wait until sending changes to server.

    $(".itemRow :input").off().on('change', function (e) {
        e.preventDefault();

        //restart timer when a change event fires.
        clearTimeout(changesTimer);

        //run fireInventoryUpdateToServer when the timer expires.
        changesTimer = setTimeout(fireInventoryUpdateToServer,doneEditingInterval)


    })
}

function fireInventoryUpdateToServer() {
    var caller = $(this);

    alert($(this).html() + "Called!");

}
function bindRemoveItemFromInventory() {
    $(".removeItemFromInventoryButton").off().on('click', function (e) {
        e.preventDefault();

        var caller = $(this);
        var character_id = $("#Character_id").val();
        var AFT = $("[name='__RequestVerificationToken']").val();
        var item_id = caller.parent().children("[name='Item_id']").val();

        $.ajax({
            url: "/Character/RemoveItemFromInventory",
            type: "POST",
            data: {
                Character_id: character_id,
                Item_id: item_id,
                __RequestVerificationToken: AFT
            },
            success: function () {
                caller.parents("tr").remove();
            }
        })

        caller.parents("tr").remove();
    })
}

$(document).ready(function () {
    bindRemoveItemFromInventory();

    bindNewClass();
    bindNewNote();
    bindRemoveClass();
    bindRemoveNote();
})