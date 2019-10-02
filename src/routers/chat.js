const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/auth/SignIn.vue')
import flexible from './flexible'
// import bcel_product from './bcel_product'

const route = [{
        path: '/',
        name: 'chat',
        component: Home,
        meta: {
            requiresAuth: true
        },
        children: flexible,
        // children: bcel_product
    },
    {
        path: '/signin',
        name: 'Signin',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("thor")) {
                next({
                    path: '/'
                })
            } else {
                next()
            }
        }
    }
]

export default route