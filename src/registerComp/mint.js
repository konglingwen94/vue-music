import Vue from 'vue'
// 引入mint组件
import { Progress, Search, Button, Cell, Navbar, Header } from 'mint-ui'

// 全局注册mint组件
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Header.name, Header);
Vue.component(Navbar.name, Navbar);
Vue.component(Search.name, Search);
Vue.component(Progress.name, Progress);
// Vue.component(Toast.name, Toast);
