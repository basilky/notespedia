<template>
  <div class="just-padding">
    <div v-for="branch in Object.keys(list)" :key="branch" class="list-group list-group-root well">
      <a
        :href="'#'+branch"
        class="list-group-item list-group-root list-group-item-action"
        data-toggle="collapse"
        v-on:click="changeclass(branch)"
      >
        <i :ref="branch" class="fa fa-caret-right"></i>
        {{getsubject(branch)}}
      </a>
      <div :id="branch" class="collapse" style="padding-left:2%;">
        <div v-for="semester in Object.keys(list[branch])" :key="semester" class="list-group">
          <a
            :href="'#'+branch+semester"
            class="list-group-item list-group-item-action"
            data-toggle="collapse"
            v-on:click="changeclass(branch+semester)"
          >
            <i :ref="branch+semester" class="fa fa-caret-right"></i>
            <label v-if="semester=='0'&&branch=='common'">First Year</label>
            <label v-else>Semester {{semester}}</label>
          </a>
          <div :id="branch+semester" class="collapse">
            <div
              v-for="(subject) in list[branch][semester]"
              :key="subject.code"
              style="padding: 0.5% 3%;background-color: #EEEEEE;overflow:auto;"
            >
              &#9679;
              <label
                v-if="subject.elective==1"
                style="margin-top:8px;color:#2980b9;"
              >{{subject.name+" (E)"}}</label>
              <label v-else style="margin-top:8px;color:#2980b9;">{{subject.name}}</label>
              <section style="display:inline-block;float:right;width: auto;">
                <a
                  :href="downloadurl(subject.location)"
                  class="btn btn-success"
                  style="border-radius: 25px;background-color:rgb(80, 107, 144);"
                >Download</a>&nbsp;
                <a
                  v-bind:href="view(subject.location,subject.name)"
                  target="_blank"
                  class="btn btn-success"
                  style="border-radius: 25px;background-color:rgb(80, 107, 144);"
                >&nbsp;&nbsp;&nbsp; View &nbsp;&nbsp;&nbsp;</a>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default
  {
    name: "app",
    props: ["list"],
    data: function ()    
    {
      return {
        branch: [],
        semester: [],
        subject: []
      }
    },
    methods:
    {
      downloadurl: function (id)        
      {
        return "//drive.google.com/uc?export=download&id=" + id;
      },
      view: function (id, subject)  
      {
        var title = subject;
        var url = "//" + window.location.hostname + "/view.html?title=" + title + "&id=" + id;
        return url;
      },
      getsubject: function (x)
      {
        switch (x)
        {
          case "cse": return "Computer Science";
          case "me": return "Mechanical Engineering";
          case "ce": return "Civil Engineering";
          case "eee": return "Electrical & Electronics Engineering";
          case "ece": return "Electronics Engineering";
          case "common": return "Common for All Branches";
        }
      },
      changeclass: function (id)
      {
        if (this.$refs[id][0].className == "fa fa-caret-right")
        {
          this.$refs[id][0].className = "fa fa-caret-down";
        }
        else 
        {
          this.$refs[id][0].className = "fa fa-caret-right";
        }
      }
    }
  };
</script>
<style>
.just-padding {
  padding: 15px;
}

.list-group.list-group-root {
  padding: 0;
  overflow: hidden;
}

.list-group.list-group-root .list-group {
  margin-bottom: 0;
}

.list-group.list-group-root .list-group-item {
  border-radius: 0;
  border-width: 1px 0 0 0;
}

.list-group.list-group-root > .list-group-item:first-child {
  border-top-width: 0;
}

.list-group.list-group-root > .list-group > .list-group-item {
  padding-left: 40px;
}

.list-group.list-group-root > .list-group > .list-group > .list-group-item {
  padding-left: 55px;
}

.list-group-item .fa {
  margin-right: 5px;
}

.collapse {
  display: none;
}

.show {
  display: block;
}
</style>