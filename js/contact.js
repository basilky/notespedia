function Reset()
{
    $('#submit').prop('disabled', true);
    var name = $('#name').val().trim();
    var email = $('#email').val().trim();
    var message = $('#message').val().trim();
    $.post('message.php',
        { 'name': name, 'email': email, 'message': message },
        function (data)
        {
            if (data == 1)
            {
                swal(
                    'Thank You!',
                    'Message sent successfully! We will get back to you soon.',
                    'success',
                )
                    .then(function ()
                    {
                        window.location.href = '/home';
                    });
            }
        })
}