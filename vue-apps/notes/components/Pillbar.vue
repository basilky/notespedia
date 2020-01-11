<template>
  <div>
    <div class="col-md-12 remove gap">
      <br>
    </div>
    <div class="row remove filterrow">
      <div class="col-md-1 flexbox">
        <label>Sort by :</label>
      </div>
      <div class="col-md-5 flexbox">
        <div class="linear-pillbar" style="width:100%;">
          <button
            class="option"
            v-for="option of options"
            :key="option.name"
            :class="{selected:option.selected, equal: equalWidth}"
            @click="select(option)"
          >
            <i class="material-icons" v-if="option.icon">{{option.icon}}</i>
            <div v-else>{{option.name}}</div>
          </button>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-1 flexbox">
        <label>Filter by :</label>
      </div>
      <div class="col-md-3 flexbox">
        <select
          class="form-control"
          style="width:80%;"
          v-model="selected"
          name="modulefilter"
          id="modulefilter"
        >
          <option value="all" selected>All</option>
          <option value="1">Module 1</option>
          <option value="2">Module 2</option>
          <option value="3">Module 3</option>
          <option value="4">Module 4</option>
          <option value="5">Module 5</option>
          <option value="6">Module 6</option>
        </select>
      </div>
    </div>
    <div class="col-md-12 remove gap">
      <br>
    </div>
  </div>
</template>
 <script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [
        { name: 'Downloads', group: 'type' },
        { name: 'Rating', group: 'type' },
        { name: 'Size', group: 'type' },
        { name: 'Upload Date', group: 'type' },]
    },
    equalWidth: {
      type: Boolean,
      default: false
    },
    mainColor: {
      type: String,
      default: '#106cc8'
    },
    highlightColor: {
      type: String,
      default: '#1e86ed'
    }
  },
  data: function ()    
  {
    return {
      selected: "all"
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
  watch:
  {
    selected: function (newval)    
    {
      this.$emit('filter', newval);
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
.linear-pillbar {
  font-family: "Roboto", Arial;
  display: flex;
  border: 1px solid #106cc8;
  border: 1px solid var(--selected-color);
  position: relative;
  border-radius: 3px;
}
.linear-pillbar .option {
  outline: none;
  font-size: 1em;
  background: transparent;
  border: none;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #106cc8;
  border-right: 1px solid var(--selected-color);
  color: #106cc8;
  color: var(--selected-color);
  cursor: pointer;
}
.linear-pillbar .option.equal {
  flex: 1;
}
.linear-pillbar .option:hover,
.linear-pillbar .option:focus,
.linear-pillbar .option:active {
  color: #1e86ed;
  color: var(--active-color);
}
.linear-pillbar .option.selected {
  background: #106cc8;
  background: var(--selected-color);
  color: #fff;
  border-right: 1px solid #fff;
}
.linear-pillbar .option.selected:hover,
.linear-pillbar .option.selected:focus,
.linear-pillbar .option.selected:active {
  background: #1e86ed;
  background: var(--active-color);
}
.linear-pillbar .option:last-child {
  border-right: none;
}
.color-input {
  display: flex;
  flex-direction: column;
  width: 300px;
}
.flexbox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
.gap {
  background-color: white;
  height: 5px;
}
.filterrow {
  margin: auto;
  padding: 5px 0px;
  border-radius: 15px;
  background-color: #d7dfea;
}
label {
  font-size: 18px;
  margin-bottom: 0px; /* bootstrap 4 problem */
}
</style>
