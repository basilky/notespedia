import Vue from 'vue'
import App from './components/Syllabus.vue'
var syllabus = new Vue({
    el: "#app",
    components: {
        syllabuslist: App
    },
    data()
    {
        return {
            list: [],
            show: false
        };
    },
    methods:
    {
    },
    template: `
          <div v-if="show">
          <syllabuslist :list="list"></syllabuslist>
          </div>`
});
var subject = {};
var sublist;
fetch("/subjects.json?nocache=" + (new Date()).getTime())
    .then((resp) => resp.json())
    .then(function (result)
    {
        sublist = result;
        $.each(sublist, function (index, value)
        {
            if (value['branch'] == "common" && value['semester'] == "common")
            {
                value['semester'] = "0";
            }
            if (subject.hasOwnProperty(value['branch']))
            {
                if (subject[value['branch']].hasOwnProperty(value['semester']))
                {
                    subject[value['branch']][value['semester']].push(value);
                }
                else
                {
                    subject[value['branch']][value['semester']] = [];
                    subject[value['branch']][value['semester']].push(value);
                }
            }
            else
            {
                subject[value['branch']] = {};
                subject[value['branch']][value['semester']] = [];
                subject[value['branch']][value['semester']].push(value);
            }
        });
        Object.keys(subject).sort().forEach(function (key)
        {
            var value = subject[key];
            delete subject[key];
            subject[key] = value;
        });
        syllabus.list = subject;
        syllabus.show = true;
    })