<template>
  <div>
    <div class="col-md-12 remove" style="background-color:white;height:5px">
      <br>
    </div>
    <div
      class="row remove"
      style="margin: auto;padding: 5px 50px;border-radius: 15px;background-color:#b3c6ff;"
    >
      <div class="col-md-12 flexbox">
        <h5>{{scanning[0]}} files pending virus scanning and compression.</h5>
      </div>
      <div class="col-md-6 flexbox">
        <select
          class="form-control"
          style="width:80%;"
          v-model="selectedbranch"
          name="branchfilter"
          id="branchfilter"
        >
          <option value="all" selected disabled>Filter by branch</option>
          <option value="common">Common Subject</option>
          <option value="me">Mechanical</option>
          <option value="cse">Computer Science</option>
          <option value="ce">Civil</option>
          <option value="eee">Electrical</option>
          <option value="ece">Electronics</option>
        </select>
      </div>
      <div class="col-md-6 flexbox">
        <select
          v-model="selectedsubject"
          class="form-control"
          style="width:80%;"
          name="subjectfilter"
          id="subjectfilter"
        >
          <option value="all" selected>All</option>
          <option
            v-for="subject in filtersubject(selectedbranch)"
            :value="subject.shortname"
            :key="subject.code"
          >{{subject.name}}</option>
        </select>
      </div>
    </div>
    <div class="col-md-12 remove" style="background-color:white;height:5px">
      <br>
    </div>
  </div>
</template>
 <script>
export default {
  props: ["subjects", "scanning"],
  data: function ()    
  {
    return {
      selectedbranch: "all",
      selectedsubject: "all"
    }
  },
  mounted()  {
    document.documentElement.style.setProperty(`--selected-color`, this.mainColor);
    document.documentElement.style.setProperty(`--active-color`, this.highlightColor);
  },
  methods: {
    select(option)    {
      this.$emit("sortby", option.name);
      if (option.group && !option.selected)      {
        this.$set(option, 'selected', !option.selected);
        for (let otherOption of this.options)        {
          if (otherOption.name !== option.name && option.group === otherOption.group)          {
            this.$set(otherOption, 'selected', false);
          }
        }
      }
      else if (!option.group)      {
        this.$set(option, 'selected', !option.selected);
      }
      this.$emit('change', this.options);
    }
  },
  computed:
  {
    filtersubject: function (branch) 
    {
      return this.subjects.filter(function (u)      {
        return u.branch == branch;
      });
    }
  },
  watch:
  {
    selectedbranch: function (newval)    
    {
      this.$emit('filterbranch', newval);
    },
    selectedsubject: function (newval)    
    {
      this.$emit('filtersubject', newval);
    }
  }
};
</script>
<style>
html,
body {
  margin: 0px;
  height: 100%;
}
.flexbox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
</style>
