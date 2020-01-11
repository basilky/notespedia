/* same for qp */

<template>
  <div>
    <div v-if="status==-1" v-on:click="checksignedin">
      <label style="margin-top:10px;cursor:pointer;color:blue;text-decoration:underline;">Rate Now!</label>
    </div>
    <div v-else-if="status==0" style="padding-top:8px;">
      <star-rating
        @rating-selected="setRating"
        :border-width="3"
        :inline="true"
        :star-size="24"
        :rounded-corners="true"
        :padding="0.5"
        :show-rating="false"
      ></star-rating>
    </div>
    <div v-else>
      <label style="margin-top:10px;font-size:16px;">Thanks.You rated this note {{rating}} stars!</label>
    </div>
  </div>
</template>
<script>
export default {
  name: "stars",
  props: ["id", "type", "issignedin"],
  data()  {
    return {
      rating: 0,
      status: -1
    };
  },
  methods:
  {
    setRating: function (rating)    
    {
      this.rating = rating;
      this.status = 1;
      var request = `/rating.php?rating=${this.rating}&id=${this.id}&type=${this.type}`;
      fetch(request)
        .then(function ()       
        {
          this.$emit("rated");
        }.bind(this));
    },
    checksignedin: function ()
    {
      if (!this.issignedin)
      {
        var baseurl = window.location.origin;
        window.location.href = baseurl + "/signin";
      }
      else
      {
        this.status = 0;
      }
    }
  }
};
</script>