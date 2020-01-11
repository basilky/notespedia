function Reset()
{
    $('#submit').prop('disabled', true);
    var password = $('#password').val().trim();
    var confirm = $('#confirm_password').val().trim();
    $.post('resetpassword.php',
        { 'code': code, 'password': password, 'confirm': confirm },
        function (data)
        {
            if (data == 1)
            {
                swal(
                    'Done!',
                    'Password reset successfully!',
                    'success',
                )
                    .then(function ()
                    {
                        window.location.href = '/home';
                    });
            }
            else if (data == 2)
            {
                alert("Please check new password.");
            }
            else
            {
                alert("Link expired or something went wrong.");
            }
            $('#submit').prop('disabled', false);
        });
}