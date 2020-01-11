var isfile = 0;
var done = 0;
var oldfile = "0";
var filelist = [];
var hash;
fetch("getfilelist.php")
  .then((resp) => resp.json())
  .then(function (result)
  {
    filelist = result;
  })
$(document).ready(function ()
{
  $(function ()
  {
    $('#drag-and-drop-zone').dmUploader({
      url: '/receivenote.php',
      queue: false,
      maxFileSize: 26214400,
      multiple: false,
      auto: false,
      allowedTypes: 'application\/*|text\/plain',
      extFilter: ['pdf', 'doc', 'docx', 'pptx', 'txt', 'ppt', 'odt', 'odp', 'zip'],
      extraData: function ()
      {
        return {
          'branch': $('#branch').val(),
          'semester': $('#semester').val(),
          'module': $('#module').val(),
          'subject': $('#subject').val(),
          'description': $('#description').val(),
          'college': $('#college').val()
        };
      },
      onDragEnter: function ()
      {
        this.addClass('active');
      },
      onDragLeave: function ()
      {
        this.removeClass('active');
      },
      onInit: function ()
      {
        this.find('input[type="text"]').val('');
      },
      onComplete: function () { },
      onNewFile: function (id, file)
      {
        var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
          chunkSize = 2097152,
          chunks = Math.ceil(file.size / chunkSize),
          currentChunk = 0,
          spark = new SparkMD5.ArrayBuffer(),
          fileReader = new FileReader();
        fileReader.onload = function (e)
        {
          spark.append(e.target.result);
          currentChunk++;
          if (currentChunk < chunks)
          {
            loadNext();
          } else
          {
            hash = spark.end();
            if (!filelist.includes(hash))
            {
              isfile = 1;
              if (oldfile != "0")
              {
                $('#drag-and-drop-zone').dmUploader('cancel', oldfile);
              }
              oldfile = id;
              ui_single_update_status(
                $('#drag-and-drop-zone'), 'File added.Click on submit to upload', 'success');
            }
            else
              alert("This file is already available on Notespedia.");
          }
        };
        fileReader.onerror = function ()
        {
          console.warn('error');
        };
        function loadNext()
        {
          var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }
        loadNext();
      },
      onBeforeUpload: function (id)
      {
        ui_single_update_progress(this, 0, true);
        ui_single_update_active(this, true);
        ui_single_update_status(this, 'Uploading...');
      },
      onUploadProgress: function (id, percent)
      {
        ui_single_update_progress(this, percent);
      },
      onUploadSuccess: function (id, data)
      {
        ui_single_update_active(this, false);
        if (data['status'] == 'success')
        {
          this.find('input[type="text"]')
            .val(
              'File Uploaded Successfully, it will Appear After Verification');
          ui_single_update_status(this, 'Upload completed.', 'success');
        } else if (data['status'] == 'present')
        {
          this.find('input[type="text"]')
            .val('File Already Present in our Database');
          ui_single_update_status(this, 'Upload completed.', 'success');
        } else if (data['status'] == 'virus')
        {
          this.find('input[type="text"]')
            .val('File Contained a Virus and was Rejected');
          ui_single_update_status(this, 'Upload completed.', 'success');
        } else
        {
          this.find('input[type="text"]')
            .val('Something went Wrong.Error has been reported');
          ui_single_update_status(this, 'Upload completed.', 'danger');
        }
        $('#submit').attr('disabled', false);
        $('#submit').html('Done');
        done = 1;
      },
      onUploadError: function (id, xhr, status, message)
      {
        // Happens when an upload error happens
        ui_single_update_active(this, false);
        ui_single_update_status(
          this,
          'Error: ' +
          'Something Went Wrong',
          'danger');
      },
      onFallbackMode: function ()
      {
        // When the browser doesn't support this plugin :(
      },
      onFileSizeError: function (file)
      {
        ui_single_update_status(
          this, 'File excess the size limit (Max 30MB)', 'danger');
      },
      onFileTypeError: function (file)
      {
        ui_single_update_status(
          this, 'File type is not allowed.See instructions', 'danger');
      },
      onFileExtError: function (file)
      {
        ui_single_update_status(this, 'File extension not allowed', 'danger');
        isfile = 0;
      }
    });
    $('#submit').click(function (e)
    {
      if (done == 1)
      {
        window.location.href = '/uploadnote';
      }
      else if (
        $('#subject').val() == null || $('#branch').val() == null ||
        $('#semester').val() == null || $('#module').val() == null ||
        $.trim($('#college').val()) == '')
      {
        alert('Please complete required fields');
      }
      else
      {
        if (isfile == 0)
        {
          alert('choose file');
        } else
        {
          $('#submit').attr('disabled', true);
          $('#drag-and-drop-zone').dmUploader('start');
        }
      }
    });
  });
});