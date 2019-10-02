import BcelProductMain from '@/views/bcel-products/bcel_product_main.vue';
const router = [{
    path: 'product',
    name: 'bcel_products_root',
    component: BcelProductMain,
    children: [{
            path: 'product/type',
            name: 'bcel_product_type',
            component: () => import('@/views/bcel-products/bcel_product_type.vue')
        },
        {
            path: 'product',
            name: 'bcel_product',
            component: () => import('@/views/bcel-products/bcel_product.vue')
        },
        {
            path: 'atm-locator',
            name: 'bcel_atm_locator',
            component: () => import('@/views/bcel-products/bcel_product_review.vue')
        },
        {
            path: 'products',
            name: 'bcel_products',
            component: () => import('@/views/bcel-products/bcel_product.vue')
        },
        {
            path: 'product-review',
            name: 'bcel_product_review',
            component: () => import('@/views/bcel-products/bcel_product_review.vue')
        },
    ]
}]

export default router;