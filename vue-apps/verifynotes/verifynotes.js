import $ from 'jquery'
import Vue from 'vue'
import App from './components/VerifyNote.vue'
import Pillbar from './components/Pillbar.vue'
var notes = new Vue({
  el: "#app",
  components: {
    pillbar: Pillbar,
    singlerow: App,
  },
  data()
  {
    return {
      original: [],
      list: [],
      subjects: [],
      show: false,
      noteshow: false,
      scanning: 0
    };
  },
  methods:
  {
    filterbranch: function (branch)
    {
      if (branch == "all")
        this.list = this.original;
      else
        this.list = this.original.filter(function (note)
        {
          return note.branch == branch;
        })
    },
    filtersubject: function (subject)
    {
      if (subject == "all")
      {
        this.list = this.original;
      }
      else
      {
        this.list = this.original.filter(function (note)
        {
          return note.subject == subject;
        })
      }
    },
    remove: function (id)
    {
      this.list = this.list.filter(function (el) { return el.id != id; });
    }
  },
  template: `
          <div v-if="show">
          <pillbar :subjects="subjects" :scanning="scanning" v-on:filterbranch="filterbranch" v-on:filtersubject="filtersubject"></pillbar>
          <div v-if="list.length>0">
          <div v-bind:key="value.id" v-if="noteshow" v-for="value in list">
          <singlerow :value="value" :show="show" v-on:remove="remove"></singlerow>
          </div>
          </div>
          <div v-else class="col-md-12 remove text-center" style="padding:30px;"><br><h2>No notes are available for verification.</h2>
          </div>
          </div>`
});
$(document).ready(function ()
{
  notes.show = false;
  notes.list = [];
  notes.original = [];
  $("div.remove").remove();
  var loader = '<div id="loader"></div>';
  $('body>*:not(#loading)').css("filter", "blur(3px)");
  $(loader).appendTo('body');
  fetch(`/backend/unverifiedfiles.php?type=1`)
    .then((resp) => resp.json())
    .then(function (Notes)
    {
      document.getElementById("loader").style.display = "none";
      $('#loader').remove();
      $('body>*:not(#loading)').css("filter", "");
      $('#container').css({
        'background-color': '#b3c6ff',
        'border-bottom-left-radius': '15px',
        'border-bottom-right-radius': '15px'
      });
      $("div.remove").remove();
      fetch(`/subjects.json?nocache=` + (new Date()).getTime())
        .then((resp) => resp.json())
        .then(function (Subjects)
        {
          fetch(`/backend/unverifiedfiles.php?type=2`)
            .then((resp) => resp.json())
            .then(function (Scanning)
            {
              notes.original = Notes;
              notes.list = Notes;
              notes.subjects = Subjects;
              notes.show = true;
              notes.scanning = Scanning;
              notes.noteshow = true;
            })
        })
    })
});