import Vue from 'vue'

const specialWord = navigator.userAgent

// 客户端返回true   web端返回false
export default specialWord.indexOf('Bitman') === -1
