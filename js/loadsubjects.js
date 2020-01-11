var Subjects;
fetch('/subjects.json?nocache=' + (new Date()).getTime()).then((resp) => resp.json()).then(function (result)
{
  Subjects = result;
})
$(document).ready(function ()
{
  $('#semester').change(function ()
  {
    var val = $(this).val();
    var branch = $('#branch').find(':selected').val();
    ;
    if (branch == 'hidden')
    {
      $('#semester option[value="hidden"]').prop('selected', true);
      alert('Please select a branch');
    }
    else
    {
      var temp =
        '<option value="hidden" selected disabled hidden>Select Subject</option>';
      for (var i = 0; i < Subjects.length; i++)
      {
        if (((branch == Subjects[i].branch) && (val == Subjects[i].semester)) ||
          (branch == Subjects[i].branch) && (branch == 'common'))
        {
          temp = temp + '<option value=\'' + Subjects[i].shortname + '\'>' +
            Subjects[i].name + '</option>';
        }
      }
      $('#subject').html(temp);
      $('#subject').selectpicker('refresh');
    }
  });
  $('#branch').change(function ()
  {
    $('#subject').find('option').not(':first').remove();
    $('#semester option[value="hidden"]').prop('selected', true);
    $('#subject option[value="hidden"]').prop('selected', true);
    $('#semester').selectpicker('refresh');
    $('#subject').selectpicker('refresh');
  });
});