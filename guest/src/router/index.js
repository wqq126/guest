import Login from '@/components/login'
import Region from '@/components/region'
import Main from '@/components/main'
import Home from '@/components/home'
import BlogFriend from '@/components/blogFriend'
import Info from '@/components/Info'
import EditInfo from '@/components/EditInfo'

const routes = [
      {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/region',
      name: 'Region',
      component: Region
    },{
      path:'/guest',
      name:'main',
      component:Main,
      redirect:{name:'home'},
      children:[
        {
          path:'/guest/home',
          name:'home',
          component:Home
        },{
          path:'/guest/blogFriend',
          name:'blogFriend',
          component:BlogFriend
        },{
          path:'/guest/info',
          name:'info',
          component:Info
        },{
          path:'/guest/EditInfo',
          name:'EditInfo',
          component:EditInfo
        }
      ]
    }
]
export default {
  routes
}
