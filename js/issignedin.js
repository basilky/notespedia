var baseurl = window.location.origin;
fetch("issignedin.php")
        .then((resp) => resp.text())
        .then(function (data)
        {
                if (data == "1")
                {
                        window.location.href = baseurl + "/home";
                }
        });