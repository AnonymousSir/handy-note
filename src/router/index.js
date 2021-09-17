import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import label from '../views/label.vue'
import stati from '../views/stati.vue'
import addLabel from '../components/addLabel.vue'
import edit from '../components/editLabel.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/label',
    name: 'label',
    component: label
  },
  {
    path: '/stati',
    name: 'stati',
    component: stati
  }
]

const router = new VueRouter({
  routes
})


export default router
