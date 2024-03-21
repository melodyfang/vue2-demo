import Vue from 'vue'

import Tree from 'ant-design-vue/lib/tree';
// import 'ant-design-vue/dist/antd.css';

import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue'

Vue.component(Tree.name, Tree);

Vue.component(Button.name, Button);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
