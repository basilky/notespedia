$(document).ready(function ()
{
    fetch("quotes.json")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data)
        {
            var i = Math.floor(Math.random() * data.length) + 0;
            $("#quote").html(`<p style="font-size:20px;font-style: bold;">${data[i][0]}</p><p style="font-style: italic;font-size:20px"> &#8212; ${data[i][1]}</p>`);
        });
    var a = document.getElementById('forum');
    a.href = "https://forum." + window.location.hostname;
});