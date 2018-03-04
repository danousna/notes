import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const api = '/api';
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
		NEW_ARTICLE (state) {
			for (let i = 0, len = state.articleList.length; i < len; i++) {
				state.articleList[i].current = false
			}
			
			let newOne = {
				id: createID(),
				title: 'Untitled',
				content: 'Untitled\n---',
				current: true
			}

			state.articleList.push(newOne)
		},
		// NEW
		FETCH (state, notes) {
			state.notes = notes;
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
		DELETE_NOTE (state) {
			for (let i = 0, len = state.notes.length; i < len; i++) {
				if (state.notes[i].current) {
					console.log(state.notes[i].id);
				}
			}
		}
	},
	actions: {
		showMenu ({ commit }) {
			commit('SHOW_MENU')
		},
		newArticle ({ commit }) {
			commit('NEW_ARTICLE')
			//commit('SAVE_TO_CACHE')
		},
		// NEW
		fetch ({ commit }) {
			axios.get('/api')
				.then(function (response) {
					response.data.map((obj) => {obj.current = false; return obj;})
					response.data[0].current = true;
					commit('FETCH', response.data)
				}).catch(function (error) {
					console.log(error);
				}); 
		},
		show ({ commit }, index) {
			commit('SHOW', index)
		},
		input ({ commit }, txt) {
			commit('INPUT', txt)
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