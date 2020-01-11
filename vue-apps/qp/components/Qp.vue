<template>
  <div>
    <div class="row remove text-center single">
      <div class="col-12 col-sm-12 col-md-1 flexbox remove">
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

      <div class="col-md-4 col-12 col-sm-12 flexbox smallpadding">
        <h6>
          <strong>{{value.college}}</strong>
        </h6>
        <b style="text-align: center">
          <b>{{ value.subject.replace(/[0-9]/g, '').toUpperCase() +' > '+ type(value.type) }}</b>
        </b>
        <br />
        <p style="text-align: center">
          Exam Date: {{value.date}} &nbsp;&nbsp;&nbsp;&nbsp;Uploaded by
          <a
            v-bind:href="getprofileurl(value.user)"
          >{{ value.user}}</a>
        </p>
      </div>
      <div class="col-md-2 col-6 col-sm-4 flexbox">
        <h6>
          <strong>Downloads</strong>
          <br />
          <strong>{{value.downloads}}</strong>
        </h6>
        <h6>
          <b>
            Total Ratings
            <br />
            {{value.rates}}
          </b>
        </h6>
        <h6>
          <b>{{(value.size/ Math.pow(1024,2)).toFixed(2)}} MB</b>
        </h6>
      </div>
      <div class="col-md-2 col-6 col-sm-4 flexbox">
        <label style="font-size:15px;">User Rating</label>
        <star-rating
          inactive-color="#e1bad9"
          active-color="#cc1166"
          :border-width="3"
          :inline="true"
          :rating="value.rating"
          :increment="0.01"
          :star-size="24"
          :rounded-corners="true"
          :show-rating="false"
          :read-only="true"
          :padding="0.5"
        ></star-rating>
        <div v-if="myRatings.hasOwnProperty(value.id)" style="text-align:center">
          <label style="margin-top:10px;font-size:15px;">Your Rating</label>
          <star-rating
            inactive-color="#e1bad9"
            active-color="#cc1166"
            :border-width="3"
            :inline="false"
            :rating="myRatings[value.id]"
            :increment="0.01"
            :star-size="24"
            :rounded-corners="true"
            :show-rating="false"
            :read-only="true"
            :padding="0.5"
          ></star-rating>
        </div>
        <div v-else style="width:100%">
          <ratenow :id="value.id" :issignedin="loggedin" :type="2" v-on:rated="rated($event)"></ratenow>
        </div>
      </div>
      <div class="col-md-3 col-12 col-sm-4 flexbox">
        <a
          v-bind:href="view(value.location,value.subject.replace(/[0-9]/g, ''),value.type,value.extension)"
          target="_blank"
          class="btn btn-success"
          style="margin:10px;width:70%;border-radius: 25px;background-color:rgb(80, 107, 144);"
        >View</a>
        <a
          v-bind:href="downloadurl(value.location)"
          :ref="value.id"
          @click="download(value.id,value.location)"
          class="btn btn-success"
          style="width:70%;border-radius: 25px;background-color:rgb(80, 107, 144);"
        >Download</a>
      </div>
    </div>
    <div class="col-md-12 remove gap">
      <br />
    </div>
  </div>
</template>

<script>
import Ratenow from "../../notes/components/Star.vue";

export default
  {
    name: "app",
    props: ["value", "show", "myRatings", "loggedin"],
    components: { ratenow: Ratenow },
    data: function ()    
    {
      return {
      }
    },
    methods:
    {
      rated: function ()        
      {
        this.$emit("rated");
      },
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
      type: function (value)
      {
        switch (value)        {
          case 'first': return 'First Internal Exam';
          case 'second': return 'Second Internal Exam';
          case 'main': return 'KTU Exam';
          case 'assignment': return 'Assignment Test';
        }
      },
      download: function (id, location)
      {
        //console.log(this.$refs)
        this.$refs[id].innerText = 'Downloading...'
        setTimeout(() =>          
        {
          this.$refs[id].href = '#download'
        }, 1000);
        fetch("//" + window.location.hostname + "/downloadfile.php?id=" + location);
      },
      getprofileurl: function (username)
      {
        if (this.loggedin)
          return '//forum.' + window.location.hostname + '/u/' + username;
        else return "/signin";
      }
    }
  };
</script>
<style>
.smallpadding {
  padding-top: 15px;
}
label {
  font-size: 18px;
  margin-bottom: 0px; /* bootstrap 4 problem */
}
.gap {
  background-color: white;
  height: 5px;
}
.single {
  margin: auto;
  border-radius: 20px;
  background-color: #d7dfea;
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
