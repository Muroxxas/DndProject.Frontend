function bindRemoveClassAbility() {
    $(".removeClassAbility").off().on('click',function (e) {
        e.preventDefault();
        //Get the card that contains this class ability and destroy it.
        $(this).parents(".classAbilityCard").remove();
    });
}


function bindRemoveSubclass() {
    $(".removeSubclass").off().on('click',function (e) {
        e.preventDefault();
        $(this).parents(".subclassCard").remove();

    });
}

function bindRemoveSubclassAbility() {
    $(".removeSubclassAbility").off().on('click',function (e) {
        e.preventDefault();
        $(this).parents(".subclassAbilityCard").remove();
    });
}

$(document).ready(function () {
    bindRemoveClassAbility();
    bindRemoveSubclass();
    bindRemoveSubclassAbility();
});