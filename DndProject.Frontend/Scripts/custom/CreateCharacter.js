function bindClassSelection(/* ??? */) {
    //on change of value of SelectedClassX,
    //unobtrusive AJAX GET request to server
    //GET all subclasses that the class has.
    //delete SelectedSubclassX's dropdown menu.
    //insert a new dropdown menu in it's place.
}

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
    $(".removeClass").off.on('click',function (e) {
        e.preventDefault();
        $(this).parent().remove();
    })
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
        $(this).parent().remove();

    });
};

function bindRemoveItemFromInventory() {
    $(".removeItemFromInventoryButton").off().on('click', function (e) {
        e.preventDefault();

        var caller = $(this);

        caller.parents("tr").remove();
    })
}

$(document).ready(function () {
    bindRemoveItemFromInventory();
    bindNewNote();
    bindNewClass();

});