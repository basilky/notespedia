function Reset()
{
    $('#submit').prop('disabled', true);
    var current = $('#current').val().trim();
    var password = $('#password').val().trim();
    var confirm = $('#confirm_password').val().trim();
    $.post('changepassword.php',
        { 'current': current, 'password': password, 'confirm': confirm },
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
                alert("Please check current password.");
            }
            else
            {
                alert("Something went wrong.");
            }
            $('#submit').prop('disabled', false);
        });
}