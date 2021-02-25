function bindAddBlankCastableBy() {
    $("#addCastableButton").on("click", function (e) {
        e.preventDefault();

        var index = $("[name ='SpellCastableBy.Index']").last().val();

        index = parseInt(index);
        var testIfNan = Number.isNaN(index);
        if (testIfNan == true) {
            index = 0;
        }
        $.ajax({

            url: "/Spells/AddBlankCastableBy",
            type: "GET",
            data: { Index: index },
            success: function (data) {
                $("#castableCardBody").append(data);
                bindRemoveCastableBy();
            }
        })

    })
}

function bindMaterialsToggle() {
    $("#RequiresMaterial").click(function () {
        if ($("#MaterialCost").attr('disabled')) {
            $("#MaterialCost").removeAttr('disabled');
        }
        else {
            $("#MaterialCost").attr('disabled', 'disabled');
        }
    })
}