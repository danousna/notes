<template>
	<div>
		<textarea id="inputer" :value='rawTxt' @input='inputting' @scroll='syncStroll' @drop.stop.prevent='dragging' autofocus></textarea>
	</div>
</template>

<script>
	export default {
		computed: {
			rawTxt () {
				return this.$store.getters.noteRaw
			}
		},
		methods: {
			inputting (e) {
				this.$store.dispatch('input', e.target.value)
				//this.$store.dispatch('saveToCache')
			},
			syncStroll (e) {
				let outputer = document.querySelector('.outputer')
				outputer.scrollTop = e.target.scrollTop
			},
			dragging (e) {
				let self = this
				let dt = e.dataTransfer;
				let files = dt.files;
				let fileReader = new FileReader();
				fileReader.readAsText(files[0], 'UTF-8');
				fileReader.onloadend = function (e) {
					let value = e.target.result
					self.$store.dispatch('input', value)
					//self.$store.dispatch('saveToCache')
				}
			}
		}
	}
</script>

<style scoped lang="less">
	div {
		width: 50%;
		height: 100%;
		textarea {
			box-sizing: border-box;
			height: 100%;
			width: 100%;
	    vertical-align: top;
	    padding: 15px;
	    resize: none;
	    border: none;
	    background-color: #fff;
	    outline: none;
	    font-family: inherit;
	    font-size: 18px;
	    color: #616161;
	    transition: all ease .3s;
		}
	}
</style>