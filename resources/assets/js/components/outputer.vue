<template>
	<div class="outputer markdown-body" v-html='ripeTxt'></div>
</template>

<script>
  export default {
    data () {
      return {
        scrollTrigger: false
      }
    },
    computed: {
      ripeTxt () {
        return this.$store.getters.noteMD
      }
    }
  }
</script>

<style scoped lang="less">
	.outputer {
  	box-sizing: border-box;
  	height: 100%;
  	width: 50%;
    padding: 15px;
    resize: none;
    border: none;
    background-color: #F3F3F3;
    outline: none;
    font-family: inherit;
    font-size: 18px;
    color: #616161;
    white-space: normal;
    overflow-y: scroll;
    word-wrap: break-word;
	}
</style>