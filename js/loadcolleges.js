var Colleges;
$(document).ready(function ()
{
    fetch("collegelist.json")
        .then((resp) => resp.json())
        .then(function (result)
        {
            Colleges = result;
            $("#college").autocomplete({
                source: Colleges
            });
        })
});