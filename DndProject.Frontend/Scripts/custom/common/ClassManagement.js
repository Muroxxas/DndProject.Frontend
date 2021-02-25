function bindAddClassAbility() {
    $("#addClassAbility").off().on('click', function (e) {
        e.preventDefault();
        var index=0;
        var foundElements = $("[name='ClassAbilities.Index']");
        if (foundElements) {
            var lastElement = foundElements.last();
            index = parseInt(lastElement.val());
        }

        $.ajax({
            url: "/ClassSubclass/AddBlankClassAbility",
            type: "GET",
            data: { Index: index },
            success: function (data) {
                $("#classAbilityAccordion").append(data);
                $(".collapse").collapse();
                bindRemoveClassAbility();
            }

        });
    });
}

function bindAddSubclass() {
    $("#addSubclass").off().on('click', function (e) {
        e.preventDefault();
        var element;
        var subclassIndex;
        var subclasses = $(this).parent().children("#subclassAccordion").children()
        if (subclasses.length) {
            //This class has subclasses
            element = $("[name='Subclasses.Index']").last().val()
            subclassIndex = parseInt(element)
        }
        else {
            subclassIndex = parseInt(0)
        }

        $.ajax({
            url: "/ClassSubclass/AddBlankSubclass",
            type: "GET",
            data: { Index: subclassIndex },
            success: function (data) {
                $("#subclassAccordion").append(data);
                $(".collapse").collapse();
                bindRemoveSubclass();
                bindAddSubclassAbility();

            }
        });
    });
}

function bindAddSubclassAbility() {
    $(".addSubclassAbility").off().on('click', function (e) {
        e.preventDefault();
        var subclassElement = $(this).parent().children("[name='Subclasses.Index']").val();
        var subclassIndex = parseInt(subclassElement)
        var abilityIndex;
        var accordion = $(this).parent().children(".accordion");
        var abilities = accordion.children()
        if (abilities.length) {
            //This subclass has abilities. 
            var abilityElement = $("[name='Subclasses[" + subclassIndex + "].SubclassAbilities.Index']").last().val();
            abilityIndex = parseInt(abilityElement)

        }
        else {
            //There are no abilities for this subclass. This will be the first.
            abilityIndex = (parseInt(0)).toString();
        }

        $.ajax({
            url: "/ClassSubclass/AddBlankSubclassAbility",
            type: "GET",
            data:
            {
                SubclassIndex: subclassIndex,
                AbilityIndex: abilityIndex
            },
            success: function (data) {
                accordion.append(data);
                $(".collapse").collapse();
                bindRemoveSubclassAbility();
            }
        });
    });
}

$(document).ready(function () {
    bindAddClassAbility();
    bindAddSubclass();
    bindAddSubclassAbility();
})