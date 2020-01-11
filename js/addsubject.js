var xmlhttp2 = new XMLHttpRequest();
xmlhttp2.onreadystatechange = function ()
{
    if (this.readyState == 4 && this.status == 200)
    {
        myObj2 = JSON.parse(this.responseText);
    }
};
xmlhttp2.open("GET", "subjects.json?nocache=" + (new Date()).getTime(), false);
xmlhttp2.send();
$(document).ready(function ()
{
    $('form').submit(function ()
    {
        checked = $("input[type=checkbox]:checked").length;
        if (!checked)
        {
            alert("You must check at least one semester.");
            return false;
        }
        else
        {
            $("#submit").html('Please Wait...');
            $(this).find("button[type='submit']").prop('disabled', true);
        }
    });
    jQuery('#code').on('input', function ()
    {
        var code = document.getElementById("code").value;
        for (var i = 0; i < myObj2.length; i++)
        {
            console.log(i);
            console.log(myObj2[i].branch, myObj2[i].semester);
            if (code == myObj2[i].code)
            {
                alert("subject already added");
                document.getElementById("code").value = "";
            }
        }
    });
});