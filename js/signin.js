function fopen(x)
{
    var obj = document.getElementById(x);
    obj.style.WebkitTransition = 'width 0.4s';
    obj.style.MozTransition = 'width 0.4s';
    obj.style.border = '1px solid rgb(0,130,240)';
    obj.style.width = "100%";
}
function fclose(x)
{
    var obj = document.getElementById(x);
    obj.style.border = '0px solid rgb(0,130,240)';
    obj.style.width = "0";
}
function Verify()
{
    $("#submit").prop("onclick", null).off("click");
    $("#submit").text('Signing in...');
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    $.post("signincheck.php", { "username": username, "password": password }, function (data)
    {
        if (data != 1)
        {
            $("#submit").text('Sign in');
            setTimeout(function ()
            {
                alert("Username and Password doesn't match. ");
            }, 100);
        }
        else
        {
            window.location.href = "home";
        }
    });
}
function Forgot()
{
    $('#reset').prop('disabled', true);
    var email = $('#email').val().trim();
    $.post('forgot.php',
        { 'email': email },
        function (data)
        {
            if (data == 1)
            {
                swal(
                    'Check email!',
                    'If account exists, password reset link has been sent to given email.',
                    'success',
                )
                    .then(function ()
                    {
                        window.location.href = '/';
                    });
            }
        })
}
function googlesignin()
{
    fetch("//" + window.location.hostname + "/getgoogleurl.php")
        .then((resp) => resp.text())
        .then(function (data)
        {
            window.location.href = data;
        });
}