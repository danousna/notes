<template>
	<div class="menu">
		<nav>
			<ul>
				<li>
					<button class="add-one-btn" @click='newArticle'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20C20,21.1 19.1,22 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M11,15V12H9V15H6V17H9V20H11V17H14V15H11Z"></path></svg></button>
				</li>
				<li>
					<button v-if='notes.length > 1' class="add-one-btn" @click='deleteNote()'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19C6,20.1 6.9,21 8,21H16C17.1,21 18,20.1 18,19V7H6V19Z"></path></svg></button>
				</li>
				<li>
					<button class="add-one-btn" @click='newArticle'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M 16.8363,2.73375C 16.45,2.73375 16.0688,2.88125 15.7712,3.17375L 13.6525,5.2925L 18.955,10.5962L 21.0737,8.47625C 21.665,7.89 21.665,6.94375 21.0737,6.3575L 17.895,3.17375C 17.6025,2.88125 17.2163,2.73375 16.8363,2.73375 Z M 12.9437,6.00125L 4.84375,14.1062L 7.4025,14.39L 7.57875,16.675L 9.85875,16.85L 10.1462,19.4088L 18.2475,11.3038M 4.2475,15.0437L 2.515,21.7337L 9.19875,19.9412L 8.955,17.7838L 6.645,17.6075L 6.465,15.2925"></path></svg></button>
				</li>
<!-- 				<li>
					<a :href='htmlDataUrl' :download='titleHtml' @mouseenter='createUrl("html")'><i class="fa fa-html5"></i></a>
				</li>
				<li>
					<a :href='mdDataUrl' :download='titleMd' @mouseenter='createUrl("md")'><i class="fa fa-download"></i></a>
				</li> -->
				<li class="close-menu">
					<button @click='showMenu'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg></button>
				</li>
			</ul>
		</nav>
		<ul class="files">
			<template v-for='i in notes.length'>
				<li :class='{"current": notes[i - 1].current}'>
					<span @click='show(i)'>{{ notes[i - 1].title }}</span>
				</li>
			</template>
		</ul>
		<div class="copy-right">		
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				htmlDataUrl: '',
      			mdDataUrl: ''
			}
		},
		created() {
			this.$store.dispatch('fetch')
		},
		computed: {
			notes () {
				return this.$store.getters.notes;
			}
		},
		methods: {
			showMenu () {
				this.$store.dispatch('showMenu')
			},
			newArticle () {
				let filesBox = document.querySelector('.files')
				this.$store.dispatch('newArticle')
				setTimeout(() => {
					filesBox.scrollTop = filesBox.scrollHeight + 180
				}, 100)
			},
			deleteNote () {
				this.$store.dispatch('deleteNote')
			},
			createUrl (mode) {
		      let self = this
		      let val = ''
		      if (mode === 'md') {
		        val = self.$store.getters.noteRaw
		        let blobObj = new Blob([val])
		        let objectURL = URL.createObjectURL(blobObj)
		        self.mdDataUrl = objectURL
		      } else {
		        val = self.$store.getters.noteMD
		        let blobObj = new Blob([val])
		        let objectURL = URL.createObjectURL(blobObj)
		        self.htmlDataUrl = objectURL
		      }
		    },
		    fetch() {
		    	this.$store.dispatch('fetch')
		    },
		    show(i) {
		    	this.$store.dispatch('show', i - 1)
		    }
		}
	}
</script>

<style scoped lang="less">
	.menu {
		box-sizing: border-box;
		position: relative;
		float: left;
		height: 100%;
		width: 260px;
		background-color: #DADADA;
		nav {
			box-sizing: border-box;
			position: relative;
			height: 45px;
			background-color: #C4C4C4;
			z-index: 20;
			text-align: center;
			ul {
				width: 100%;
				height: 45px;
				margin: 0;
				padding: 0;
				list-style: none;
				display: inline-block;
				li {
					height: 100%;
					padding: 4px;
					float: left;
					button, a {
						display: inline-block;
						width: 38px;
						height: 36px;
						border: none;
						background: none;
						outline: none;
						padding: 6px;
						background-color: transparent;
						opacity: .75;
						border-radius: 2px;
						margin-bottom: 20px;
						&:hover {
							opacity: 1;
							background-color: rgba(0,0,0,.1);
						}
						&:active {
							background: #00796B;
						}
						.fas {
							color: #B9B9B9;
						}
					}
				}
				.close-menu {
					position: absolute;
					right: 0;
				}
			}
		}
		h1 {
			font-size: 30px;
			margin: 20px;
			margin-bottom: 0;
			margin-left: 10px;
		}
		.files {
			padding: 0;
			margin: 0;
			max-height: 100%;
			list-style: none;
			overflow-y: scroll;
			li {
				position: relative;
				padding: 0;
				color: #9E9E9E;
				cursor: default;
				span {
					box-sizing: border-box;
					display: inline-block;
					width: 100%;
					height: 100%;
					padding: 0;
					padding: 2px 10px;
					white-space: normal;
					word-break: break-all;
				}
				&.current {
					color: black;
					background: #AFAFAF;
				}
				&:hover {
					color: black;
					background: #AFAFAF;
					.delete-btn {
						display: inline-block;
					}
				}
			}
		}
		.copy-right {
			position: absolute;
			bottom: 10px;
			width: 100%;
			font-size: 12px;
			text-align: center;
			color: #9E9E9E;
		}
	}
</style>