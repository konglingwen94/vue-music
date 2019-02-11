import Vue from 'vue'
// 引入mint组件
import { Swipe, SwipeItem, Toast, Actionsheet, Range, Progress, Search, Button, Cell, Navbar, Header, Spinner, MessageBox } from 'mint-ui'
// 全局注册mint组件
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Header.name, Header);
Vue.component(Navbar.name, Navbar);
Vue.component(Search.name, Search);
Vue.component(Progress.name, Progress);
Vue.component(Range.name, Range);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Spinner.name, Spinner);
Vue.component(Actionsheet.name, Actionsheet);
Vue.prototype.Toast = Toast
Vue.prototype.MessageBox = MessageBox
