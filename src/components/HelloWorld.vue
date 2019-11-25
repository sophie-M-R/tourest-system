<template>
  <div class="hello">
    {{msg}}
    <div class="div1">11111
        <div class="div2" >22222
          <div class="div3" >33333</div>
        </div>

        <div class="h1" >22222
          <div class="h2" >33333</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
$lightColor:#fff;
$redColor:red;
$darkColor:#000;
$width:600px;
.div1 {
  color:lighten($darkColor,80%);
  border:1px solid $darkColor;
  width:$width/2;
  margin-left:10px+10px/2;
  .div2 {
    color:$redColor;
    &.div3 {
      color:$redColor;
    }
  }
  .h1 {
    .h2 {
      
    }
  }
}
</style>
