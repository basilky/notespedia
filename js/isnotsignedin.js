var baseurl = window.location.origin;
fetch("issignedin.php")
        .then((resp) => resp.text())
        .then(function (data)
        {
                if (data == "0")
                {
                        window.location.href = baseurl + "/signin";
                }
        });