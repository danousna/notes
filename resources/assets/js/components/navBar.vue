<template>
	<nav>
		<ul>
			<li><button @click='showMenu'><i class="fas fa-folder"></i></button></li>
			<li><button @click='insert("\n# ")'><i class="fas fa-heading"></i></button></li>
			<li><button @click='insert("**Bold**")'><i class="fas fa-bold"></i></button></li>
			<li><button @click='insert("*Italic*")'><i class="fas fa-italic"></i></button></li>
			<li><button @click='insert("\n\n---\n\n")'><i class="fas fa-underline"></i></button></li>
			<li><button @click='insert("\n- ")'><i class="fas fa-list-ul"></i></button></li>
			<li><button @click='insert("[Link](http://example.com/)")'><i class="fas fa-link"></i></button></li>
			<li><button @click='insert("\n> ")'><i class="fas fa-quote-left"></i></button></li>
			<li><button @click='insert("`code`")'><i class="fas fa-code"></i></button></li>
			<li><button @click='insert("![Img](http://example.com/)")'><i class="fas fa-image"></i></button></li>
			<li><button @click='insert("\n\n| title | title | title |\n| --- | --- | --- |\n| item | item | item |")'><i class="fas fa-table"></i></button></li>
		</ul>
	</nav>
</template>

<script>
	const setContent = (inputer, oldContent, newContent, content, endPosition, start, end) => {
		newContent = oldContent.substring(0, endPosition) + content + oldContent.substring(endPosition, oldContent.length)
		inputer.value = newContent
		inputer.setSelectionRange(endPosition + start, endPosition + content.length - end)
		return newContent
	}

	const upDateContent = (inputer, oldContent, newContent, startPosition, endPosition, symbol1, symbol2) => {
		newContent = oldContent.substring(0, startPosition) + symbol1 + oldContent.substring(startPosition, endPosition) + symbol2 + oldContent.substring(endPosition, oldContent.length)
		inputer.value = newContent
		let len = newContent.length
		inputer.setSelectionRange(len, len)
		return newContent
	}

	export default {
		methods: {
			showMenu () {
				this.$store.dispatch('showMenu')
			},
			insert (content) {
				let inputer = document.querySelector('#inputer')
				let startPosition = inputer.selectionStart
				let endPosition = inputer.selectionEnd
				let oldContent = inputer.value
				
				inputer.focus()

				let newContent = ''

				if (startPosition === endPosition) {
					switch (content) {
						case '**Bold**':
							newContent = setContent(inputer, oldContent, newContent, content, endPosition, 2, 2)
							break
						case '*Italic*':
							newContent = setContent(inputer, oldContent, newContent, content, endPosition, 1, 1)
							break
						case '[Link](http://example.com/)':
							newContent = setContent(inputer, oldContent, newContent, content, endPosition, 7, 1)
							break
						case '`code`':
							newContent = setContent(inputer, oldContent, newContent, content, endPosition, 1, 1)
							break
						case '![Img](http://example.com/)':
							newContent = setContent(inputer, oldContent, newContent, content, endPosition, 7, 1)
							break
						default:
							newContent = oldContent.substring(0, endPosition) + content + oldContent.substring(endPosition, oldContent.length)
							inputer.value = newContent
							break
					}
				} else {
					switch (content) {
						case '**Bold**':
							newContent = upDateContent(inputer, oldContent, newContent, startPosition, endPosition, '**', '**')
							break
						case '*Italic*':
							newContent = upDateContent(inputer, oldContent, newContent, startPosition, endPosition, '*', '*')
							break
						case '`code`':
							newContent = upDateContent(inputer, oldContent, newContent, startPosition, endPosition, '`', '`')
							break
						case '[Link](http://example.com/)':
							newContent = upDateContent(inputer, oldContent, newContent, startPosition, endPosition, '[', '](http://example.com/)')
							break
						case '![Img](http://example.com/)':
							newContent = upDateContent(inputer, oldContent, newContent, startPosition, endPosition, '![', '](http://example.com/)')
							break
						default:
							return false
							break
					}
				}

				if (newContent.length) {
					this.$store.dispatch('textInput', newContent)
				}
			},
			redirect (url) {
				window.open(url, '_blank')
			}
		}
	}
</script>

<style scoped lang="less">
	nav {
		box-sizing: border-box;
		position: relative;
		height: 45px;
		background-color: #323232;
		z-index: 20;
		ul {
			height: 45px;
			min-width: 1000px;
			padding: 0;
			margin: 0;
			list-style: none;
			li {
				height: 45px;
				float: left;
				button {
					height: 45px;
					width: 45px;
					border: none;
					background: none;
					outline: none;
					&:hover {
						background: #474747;
						.fas {
							color: #fff;
						}
					}
					&:active {
						background: #00796B;
					}
					.fas {
						color: #B9B9B9;
						font-size: 16px;
					}
					.fa-folder {
						font-size: 26px;
					}
				}
			}
		}
	}
</style>