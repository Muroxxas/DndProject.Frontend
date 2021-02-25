function bindRemoveClassAbility() {
    $(".removeClassAbility").off().on("click", function (e) {
        e.preventDefault();
        var caller = $(this);
        //Check if we have an ID associated with this ability in DB.
        if ( $(this).parent().children().hasClass("classAbility_id") ){
            //Item probably exists in the DB. attempt to drop it.
            var class_id = $("[name='Class_id']").val();
            var classAbility_id = $(this).parent().children(".classAbility_id").val();
            var AFT = $("[name='__RequestVerificationToken']").val();
            $.ajax({
                url: "/ClassSubclass/DeleteClassAbility",
                type: "POST",
                data:
                {
                    Class_id: class_id,
                    ClassAbility_id: classAbility_id,
                    __RequestVerificationToken: AFT
                },
                success: function () {
                    caller.parents(".classAbilityCard").remove();
                    alert("Class ability successfully removed!");
                    
                },
                fail: function () {
                    alert("CLASS REMOVAL FAILED!");
                }
            })
        }
        else {
            //Item doesn't exist in DB. Just remove the card.
            caller.parents(".classAbilityCard").remove();
        }
    })
}

function bindRemoveSubclass() {
    $(".removeSubclass").off().on("click", function (e) {
        e.preventDefault();
        var caller = $(this);
        //Check if we have an id associated with this subclass
        if ($(this).parent().children().hasClass("subclass_id")) {
            //Subclass probably exists in DB. attempt to drop it.
            var class_id = $("[name='Class_id']").val();
            var subclass_id = $(this).parent().children(".subclass_id").val();
            var AFT = $("[name='__RequestVerificationToken']").val();
            $.ajax({
                url: "/ClassSubclass/DeleteSubclass",
                type: "POST",
                data:
                {
                    Class_id: class_id,
                    Subclass_id: subclass_id,
                    __RequestVerificationToken : AFT
                },
                success: function () {
                    caller.parents(".subclassCard").remove();
                    
                },
                fail: function () {
                    alert("SUBCLASS REMOVAL FAILED!");
                }
            })
        }
        else {
            //Subclass probably doesn't exist. Just remove the card.
            caller.parents(".subclassCard").remove();
        }
    })
}

function bindRemoveSubclassAbility() {
    $(".removeSubclassAbility").off().on("click", function (e) {
        e.preventDefault();
        var caller = $(this);
        //Check if we have an id for this subclass ability
        if ($(this).parent().children().hasClass("subclassAbility_id")) {
            var class_id = $("[name='Class_id']").val();
            var subclass_id = $(this).parents(".subclassCard").find(".subclass_id").val();
            var subclassAbility_id = $(this).parent().children(".subclassAbility_id").val();
            var AFT = $("[name='__RequestVerificationToken']").val();
            $.ajax({
                url: "/ClassSubclass/DeleteSubclassAbility",
                type: "POST",
                data:
                {
                    Class_id: class_id,
                    Subclass_id: subclass_id,
                    SubclassAbility_id: subclassAbility_id,
                    __RequestVerificationToken: AFT
                },
                success: function () {
                    caller.parents(".subclassAbilityCard").remove();
                    alert("Subclass ability successfilly removed!");
                    
                },
                fail: function () {
                    alert("SUBCLASS ABILITY REMOVAL FAILED!");
                }
            })
        }
        else {
            //subclass Ability probably doesn't exist. Just delete the card.
            caller.parents(".subclassAbilityCard").remove();
        }
    })
}


$(document).ready(function () {
    bindAddClassAbility();
    bindAddSubclass();
    bindAddSubclassAbility();

    bindRemoveClassAbility();
    bindRemoveSubclass();
    bindRemoveSubclassAbility();
})