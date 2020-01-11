<template>
  <div>
    <div
      class="row remove text-center"
      style="margin: auto;border-radius: 20px;background-color:#b3c6ff;padding: 10px 0px;"
    >
      <div class="col-md-2 remove">
        <i
          v-if="value.mime.indexOf('pdf') != -1"
          class="fas fa-file-pdf fa-8x icon"
          style="color:#F97255;"
        ></i>
        <i
          v-else-if="(value.mime.indexOf('word') != -1) || (value.mime.indexOf('opendocument') != -1)"
          class="fas fa-file-word fa-8x icon"
          style="color:#e57373;"
        ></i>
        <i
          v-else-if="(value.mime.indexOf('powerpoint') != -1)||(value.mime.indexOf('presentation') != -1)"
          class="fas fa-file-powerpoint fa-8x icon"
          style="color:#e57373;"
        ></i>
        <i v-else class="fas fa-question-circle fa-7x" style="color:#00897B;"></i>
      </div>

      <div class="col-md-6 flexbox smallpadding">
        <h6>
          <strong>{{value.college}}</strong>
        </h6>
        <b style="text-align: center">
          <b>{{ value.subject.replace(/[0-9]/g, '').toUpperCase() + ' > ' + type(value.type) }}</b>
          <br />
          <b>Exam Date: {{value.date}}</b>
        </b>
        <p style="text-align: center">Uploaded by {{ value.user}}</p>
      </div>

      <div class="col-md-2 flexbox smallpadding">
        <a
          v-bind:href="view(value.location,value.subject.replace(/[0-9]/g, ''),value.type,value.extension)"
          target="_blank"
          class="btn btn-success"
          style="width:70%;border-radius: 25px;background-color:rgb(80, 107, 144);"
        >View</a>
        <br />
        <a
          v-bind:href="downloadurl(value.location)"
          class="btn btn-success"
          style="width:70%;border-radius: 25px;background-color:rgb(80, 107, 144);"
        >Download</a>
      </div>
      <div class="col-md-2 flexbox smallpadding">
        <a
          :ref="value.id"
          v-on:click.once="accept(value.id)"
          target="_blank"
          class="btn btn-success"
          style="width:70%;border-radius: 25px;background-color:rgb(80, 107, 144);"
        >Accept</a>
        <br />
        <a
          :ref="value.id+'r'"
          v-on:click.once="reject(value.id)"
          target="_blank"
          class="btn btn-danger"
          style="width:70%;border-radius: 25px;"
        >Reject</a>
      </div>
    </div>
    <div class="col-md-12 remove" style="background-color:white;height:5px">
      <br />
    </div>
  </div>
</template>

<script>

export default
  {
    name: "app",
    props: ["value", "show"],
    methods:
    {
      downloadurl: function (id)        
      {
        return "//drive.google.com/uc?export=download&id=" + id;//.slice(2);
      },
      view: function (id, subject, type, extension)  
      {
        var title = subject.toUpperCase() + "-" + type + '.' + extension;
        var url = "//" + window.location.hostname + "/view.html?title=" + title + "&id=" + id;//.slice(2);
        return url;
      },
      accept: function (id)       
      {
        this.$refs[id].innerText = "Pending..."
        this.$refs[id].className = "btn btn-success"
        fetch(`/backend/acceptfile.php?type=2&id=${id}`).then((resp) => resp.json()).then(function (data)
        {
          if (data != 1)            
          {
            this.$refs[id].innerText = "Error"
            this.$refs[id].className = "btn btn-danger"
          }
          else            
          {
            this.$refs[id].innerText = "Done"
          }
        }.bind(this))
      },
      reject: function (id)       
      {
        this.$refs[id + 'r'].innerText = "Pending..."
        fetch(`/backend/rejectfile.php?type=2&id=${id}`).then((resp) => resp.json()).then(function (data)
        {
          if (data != 1)            
          {
            this.$refs[id + 'r'].innerText = "Error"
          }
          else            
          {
            this.$refs[id + 'r'].innerText = "Done"
          }
        }.bind(this));
      }
      ,
      type: function (value)
      {
        switch (value)        {
          case 'first': return 'First Internal';
          case 'second': return 'Second Internal';
          case 'main': return 'Main Exam';
          case 'assignment': return 'Assignment Test';
        }
      }
    }
  };
</script>
<style>
.flexbox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
.smallpadding {
  padding-top: 15px;
}
.icon {
  font-size: 9vw;
}
@media screen and (min-width: 1490px) {
  .icon {
    font-size: 125px;
  }
}
</style>
