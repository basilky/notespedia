import $ from 'jquery'
import Vue from 'vue'
import App from './components/Note.vue'
import Pillbar from './components/Pillbar.vue'
var VueStarRating = require('vue-star-rating');
Vue.component('star-rating', VueStarRating.default);
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
      show: false,
      noteshow: false,
      myRatings: [],
      loggedin: false
    };
  },
  methods:
  {
    repaint: function (val)
    {
      this.noteshow = false;
      if (val == "Downloads")
      {
        this.list = this.list.slice().sort(function (a, b)
        {
          return a.downloads - b.downloads;
        });
      }
      else if (val == "Rating")
      {
        this.list = this.list.slice().sort(function (a, b)
        {
          return b.rating - a.rating;
        });
      }
      else if (val == "Size")
      {
        this.list = this.list.slice().sort(function (a, b)
        {
          return a.size - b.size;
        });
      }
      else if (val == "Upload Date")
      {
        this.list = this.list.sort(function (a, b)
        {
          return +new Date(b.time) - +new Date(a.time);
        });
      }
      setTimeout(function ()
      {
        this.noteshow = true;
      }.bind(this), 100);
    },
    filtermodule: function (module)
    {
      if (module == "all")
        this.list = this.original;
      else
        this.list = this.original.filter(function (note)
        {
          return note.module == module;
        })
    },
    rated: function ()
    {
      setTimeout(function ()
      {
        fetch('/getratings.php').then((resp) => resp.json()).then(function (result)
        {
          this.myRatings = result;
        }.bind(this))
      }.bind(this), 3000);
    }
  },
  created: function ()    
  {
    fetch("/issignedin.php")
      .then(function (response)      
      {
        response.text().then(function (text)          
        {
          if (text == "1")
          {
            this.loggedin = true;
          }
        }.bind(this));
      }.bind(this))
  },
  template: `
          <div v-if="show">
          <pillbar v-on:sortby="repaint" v-on:filter="filtermodule"></pillbar>
          <div v-if="list.length>0">
          <div v-bind:key="value.id" v-if="noteshow" v-for="value in list">
          <singlerow :value="value" :myRatings="myRatings" :show="show" :loggedin="loggedin" v-on:rated="rated"></singlerow>
          </div>
          </div>
          <div v-else class="col-md-12 remove text-center" style="padding:30px;"><br><h2>No notes are available for given filter.</h2>
          </div>
          </div>`
});
$(document).ready(function ()
{
  fetch('/getratings.php').then((resp) => resp.json()).then(function (result)
  {
    notes.myRatings = result;
  })
  $("#go").click(function ()
  {
    if ($('#subject option:selected').val() == "hidden" || $('#branch option:selected').val() == "hidden" || $('#semester option:selected').val() == "hidden")
    {
      alert("Please complete required fields");
    } else
    {
      notes.show = false;
      notes.list = [];
      notes.original = [];
      $("#go").prop('disabled', true);
      $("div.remove").remove();
      var loader = '<div id="loader"></div>';
      $('body>*:not(#loading)').css("filter", "blur(3px)");
      $(loader).appendTo('body');
      var subject = $('#subject').val();
      var branch = $('#branch').val();
      fetch(`/list.php?type=1&subject=${subject}&branch=${branch}`)
        .then((resp) => resp.json())
        .then(function (Notes)
        {
          document.getElementById("loader").style.display = "none";
          $('#loader').remove();
          $('body>*:not(#loading)').css("filter", "");
          $('#container').css({
            'background-color': '#d7dfea',
            'border-bottom-left-radius': '15px',
            'border-bottom-right-radius': '15px'
          });
          $("div.remove").remove();
          $("#go").prop('disabled', false);
          if (Notes.length > 0)
          {
            notes.original = Notes;
            notes.list = Notes;
            notes.show = true;
            notes.noteshow = true;
          }
          else
          {
            var empty = '<div class="col-md-12 remove text-center" style="padding:30px;"><br><h2>No notes are available for given filter.</h2></div>';
            $(empty).appendTo('body');
          }
        })
    }
  })
});