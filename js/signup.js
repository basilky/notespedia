function fopen(x)
{
  var obj = document.getElementById(x);
  obj.style.WebkitTransition = 'width 0.4s';
  obj.style.MozTransition = 'width 0.4s';
  obj.style.border = '1px solid rgb(0,130,240)';
  obj.style.width = '100%';
}
function fclose(x)
{
  var obj = document.getElementById(x);
  obj.style.border = '0px solid rgb(0,130,240)';
  obj.style.width = '0';
}
function Verify()
{
  var status = -1;
  $('#submit').text('Signing up.');
  $('#submit').prop('disabled', true);
  var username = $('#username').val().trim();
  var email = $('#email').val().trim();
  var password = $('#password').val().trim();
  $.post(
    'verify.php', { 'username': username, 'email': email, 'password': password },
    function (data)
    {
      status = 1;
      if (data != 1)
      {
        setTimeout(function ()
        {
          $('#submit').text('Sign up');
          $('#submit').prop('disabled', false);
          switch (+data)//tonumber
          {
            case 2:
              alert('User already exists.');
              break;
            case 4:
              alert('Check username');
              break;
            case 5:
              alert('Please provide a valid email.');
              break;
            case 6:
              alert('Please provide a valid email.');
              break;
            case 7:
              alert('Check Password');
              break;
            default:
              alert('Something went wrong');
              break;
          }
        }, 200);
      } else
      {
        swal(
          'Activate Now!',
          'Verification link has been sent to email.Check spam folder also.',
          'success',
        )
          .then(function ()
          {
            window.location.href = '/';
          });
      }
    });
  function wait()
  {
    if (status == -1)
    {
      setTimeout(function ()
      {
        if (status == -1) $('#submit').text('Signing up..');
        setTimeout(function ()
        {
          if (status == -1) $('#submit').text('Signing up...');
          setTimeout(function ()
          {
            if (status == -1)
            {
              $('#submit').text('Signing up.');
              wait();
            }
          }, 700);
        }, 700);
      }, 700);
    } else if (status != 1)
    {
      $('#submit').text('Error');
    }
  }
  wait();
}