import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const highlight = require('highlight.js');
const marked = require('marked');

marked.setOptions({
	highlight: function (code) {
		return highlight.highlightAuto(code).value;
	}
});

Vue.use(Vuex);

const createID = () => {
	let t = ''
  for(let i = 0; i < 15; i++) { 
      t += Math.floor(Math.random() * 10) 
  }
  return t
}

const saveID = (state) => {
	let idArr = []
	for (let i = 0, len = state.articleList.length; i < len; i++) {
		idArr.push(state.articleList[i].id)
		localStorage.setItem('idArr', idArr.join(','))
	}
}

export default new Vuex.Store({
	state: {
		showMenu: true,
		notes: []
	},
	mutations: {
		SHOW_MENU (state) {
			state.showMenu = !state.showMenu
		},
		FETCH (state, notes) {
			axios({
				method: 'get',
				url: '/api'
			}).then(function (response) {
				response.data.map((obj) => {obj.current = false; return obj;})
				response.data[0].current = true;
				state.notes = response.data;
			}).catch(function (error) {
				console.log(error);
			}); 
		},
		SHOW (state, index) {
			for (let i = 0, len = state.notes.length; i < len; i++) {
				state.notes[i].current = false
			}
			state.notes[index].current = true
		},
		INPUT (state, txt) {
			for (let i = 0, len = state.notes.length; i < len; i++) {
				if (state.notes[i].current) {
					state.notes[i].content = txt
				}
			}
		},
		POST_NOTE (state) {
			for (let i = 0, len = state.notes.length; i < len; i++) {
				if (state.notes[i].current) {
					axios({
						method: 'post',
						url: '/api',
						data: {
							title: 'Untitled',
							content: 'Something'
						}
					}).then(function (response) {
						for (let i = 0, len = state.notes.length; i < len; i++) {
							state.notes[i].current = false
						}
						response.data.current = true
						state.notes.push(response.data)
					}).catch(function (error) {
						console.log(error.message)
					});
				}
			}
		},
		PUT_NOTE (state) {
			for (let i = 0, len = state.notes.length; i < len; i++) {
				if (state.notes[i].current) {
					axios({
						method: 'put',
						url: '/api/' + state.notes[i].id,
						data: {
							title: state.notes[i].title,
							content: state.notes[i].content
						}
					}).then(function (response) {
					}).catch(function (error) {
						console.log(error.message);
					});
				}
			}
		},
		DELETE_NOTE (state) {
			for (let i = 0, len = state.notes.length; i < len; i++) {
				if (state.notes[i].current) {
					axios({
						method: 'delete',
						url: '/api/' + state.notes[i].id,
					}).then(function (response) {
						state.notes[i].current = false
						state.notes.splice(i, 1)
						state.notes[i-1].current = true
					}).catch(function (error) {
						console.log(error.message);
					});
				}
			}
		}
	},
	actions: {
		showMenu ({ commit }) {
			commit('SHOW_MENU')
		},
		fetch ({ commit }) {
			commit('FETCH')
		},
		save ({ commit }) {
			commit('PUT_NOTE')
		},
		show ({ commit }, index) {
			commit('SHOW', index)
		},
		input ({ commit }, txt) {
			commit('INPUT', txt)
		},
		newNote ({ commit }) {
			commit('POST_NOTE')
		},
		deleteNote ({ commit }) {
			commit('DELETE_NOTE')
		}
	},
	getters: {
		notes: state => {
			return state.notes;
		},
		noteRaw: state => {
			let content = ''
			for (let i = 0, len = state.notes.length; i < len; i++) {
				if (state.notes[i].current) {
					content = state.notes[i].content
				}
			}
			return content;
		},
		noteMD: (state, getters) => {
			return marked(getters.noteRaw);
		}
	}
})