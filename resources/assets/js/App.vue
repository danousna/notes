<template>
  <div id="app" :class="[showMenu ? 'show-menu' : '', 'app']">
    <sideMenu />
    <main>
      <navBar /> 
      <section>
        <inputer />
        <outputer />
      </section>
    </main>
  </div>
</template>

<script>
import sideMenu from './components/sideMenu.vue'
import navBar from './components/navBar.vue'
import inputer from './components/inputer.vue'
import outputer from './components/outputer.vue'

export default {
  components: {
    sideMenu,
    navBar,
    inputer,
    outputer
  },
  mounted () {
    this.$store.dispatch('loadCache')
  },
  computed: {
    showMenu () {
      return this.$store.state.showMenu
    }
  }
}
</script>

<style lang="less">
  @import url('../less/markdown.less');
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    height: 100%;
    overflow: hidden;
    background-color: #e0e0e0;
  }
  .app {
    position: relative;
    left: -260px;
    height: 100%;
    &.show-menu {
      left: 0;
      main {
        section {
          padding-right: 260px;
        }
      }
    }
    main {
      margin-left: 260px;
      width: 100%;
      height: 100%;
      background-color: #e0e0e0;
      section {
        box-sizing: border-box;
        height: 100%;
        display: flex;
        justify-content: center;
      }
    }
    button:hover {
      cursor: pointer;
    }
  }

  *::-webkit-scrollbar {
      display: block;
      width: 5px;
      background: #FAFAFA;
  }
  *::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #E0E0E0;
  }
  *::-webkit-scrollbar-thumb:hover {
      background: #BDBDBD;
  }
</style>
