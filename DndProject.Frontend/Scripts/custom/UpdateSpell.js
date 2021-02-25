function bindRemoveCastableBy() {
    var caller = $(".castableByRemove");
    $(caller).off().on('click', function (e) {
        e.preventDefault();

        var spell_id = $("#Spell_id").val();
        var class_id_field = $(caller).parent().children(".class_id");
        var AFT = $("[name='__RequestVerificationToken']").val();

        var class_id;
        if (class_id_field.length > 0) {
            class_id = class_id_field.val();
        }
        else {
            class_id = null;
        }

        $.ajax({
            url: "/Spells/RemoveCastableBy",
            type: "POST",
            data: {
                Spell_id: spell_id,
                Class_id: class_id,
                __RequestVerificationToken: AFT
            },
            success : function() {
                $(caller).parents(".castableRow").remove();
            }

        })

    })
}

function bindDeleteSpell() {
    $(".deleteSpellButton").click(function (e) {
        e.preventDefault();

        var spell_id = $(".Spell_id").val();
        var AFT = $("[name='__RequestVerificationToken']").val();

        $.ajax({
            url: "/Spells/DeleteSpell",
            type: "POST",
            data: {
                Spell_id: spell_id,
                
                __RequestVerificationToken: AFT
            },
            success: function (result) {
                window.location.href = result
            }
        })
    })
}
$(document).ready(function () {
    bindAddBlankCastableBy();
    bindMaterialsToggle();
    bindRemoveCastableBy();
    bindDeleteSpell();
})
