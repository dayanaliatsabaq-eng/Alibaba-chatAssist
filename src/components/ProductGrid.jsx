const products = [
    {
        id: 1,
        name: '2024 New Ultra-Slim Smartwatch Waterproof Bluetooth Calling',
        price: '$12.50 - $18.20',
        minOrder: 'Min. Order: 10 pieces',
        badge: 'Hot',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZCuOZPSCpB6A4LRRl2v7q9febozAwcA7b-aPBzMSJefzROiFw6n_vTTKqCnUf1837Ciqx2ntZ4ZKZIcHbr9HizYD0lvsT5Kr2k9Mef8D5ZTRfxS5RY4CREXziEIThWZ-Vl-h5VMMhxzxYDdOjKWsx68SiLSVS7_P36WmPhuNdZs9-SBuf_RrlEfDUco1hhCAzKcVnNcereRua3Am_csxuwzOLEGQCxMYfIMSglHz07Qkw5GDEjorbITvZ8RfsbHOL1UlxC9d9gg',
    },
    {
        id: 2,
        name: 'Wireless Noise Cancelling Headphones Over Ear with Mic',
        price: '$8.99 - $12.00',
        minOrder: 'Min. Order: 50 pieces',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfJwCSO9tRU-VNA73OskhRG_hIb9bHNrJQE7XckMAQ4iSExG5EBEq1ATb4KROqOdZVwNK8BCISuiw12W53CiTznAzssMA2Wjn6UydMAvvWhcOcuG9mcopCiOcD3UqMqjVQT7WL0OI0gqjGU3N4sgYeG6YZ2HiSTwMep5atiVDaR7zfJU3QzgnGUO3STc_Db2mp5ETaV7DBp3KDgIE8wBK_QfGEP9sdzjEBzwL7LcsKMZLNOPeN6oxhN6HccF3tX3An2h0-SVP4kA',
    },
    {
        id: 3,
        name: '8-in-1 USB C Hub Docking Station for MacBook Pro',
        price: '$15.40',
        minOrder: 'Min. Order: 5 pieces',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMJWl0VJw-iWKqkgk4ux6HTatw0TjHOz_UxOS5V3gkBMWOko_Yg8muJRUlczukKuD7V8YOO82I5bXImZgscRyLS163Lk2veVld5oASRkElORVi1Hm_ziJX_X5ukaY3XKZtE8U-2tFIoWvSFO4Ir9beKFzGPv1Vv63kuJpNh9T8-Mdcl-UGZsY1gGYU1ovEbGZcn-npZh6LaYczyui7vPKp6z7Kv2QWm_a-IIVG6izd6cLeO0WnuO5RsCWBN8ojLn5C0T5iHf-ZlA',
    },
    {
        id: 4,
        name: 'Ergonomic Office Chair with Lumbar Support High Back',
        price: '$45.00 - $62.00',
        minOrder: 'Min. Order: 1 piece',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjwIsudpQp4xWxkC4Dr0BlISc5Efr7u1nHlrusKLrw7Nr0iSknftumgR_RZDLUxgrWq2vHMNWbfrf2M1udmbWiTPuV5r6BkDuLNbKv0cvH4Lmr9dvIsMC7UYfioa_x3Ctzn1gnlEqKpVh_kcPrkYhGh263dMflP5ZKahSvaAYzz4yZkSMiJkQn3Td_sn5Sw9aDLYxEMu3r4JHKIjhf4l6rsWYSWEvPhFYVKf4GKRx3P4319kopVpAISgiYtj4_ES_mqD-kyQexMA',
    },
    {
        id: 5,
        name: 'Smart Water Bottle with LED Temperature Display 500ml',
        price: '$3.20 - $5.50',
        minOrder: 'Min. Order: 100 pieces',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxKR5D98cK4O47tQlHuf45KI1GR2zeMJONdeeaoInm6zH7-gfTHlS2TUL8C2ESCOwIrDtIVGHswXZQnxXkco77nsgKJKHvdiCqfoyalEF_BA8xvDfKH4SLetmp29EN2mUYP3pkNofEIHk6-hk7hhKkHpZXXMUbrq1efWhj02n5rAN3hMDD3oYa7hBsnKF236KMoyffAOBvi1xNzN8ihCvyFDLhSPHEHagUmxBPnC8EGJODadGCJJ_nxdW8T66Q3KQQjx2XnCCZMg',
    },
    {
        id: 6,
        name: 'Shockproof Transparent Phone Case for iPhone 15 Pro Max',
        price: '$0.50 - $1.20',
        minOrder: 'Min. Order: 500 pieces',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD234oqHWQs-FoU3jHM7LqyAsHkwXCRb8TcSO7579Dze6TnFFgc_JbS3a17gv6VBACOEvx6YlCozbwJ3BfkbAg9Lb0D8Ht3m6-IA0xK8ygLuzFUCtGUuus4HDqwkaJcf6QReEzEXhQcnZyzaWiibNTn2aq6wr92EQICNbrZXYs2NoR8-qVxBiEKahJZKYvfHvYOtNDuBnsoQhPaxbSw4xKEDI8d8d1y71eC7Ru2rJlQLLBFzLS2V4PuEOG_IlV5tnDwLFixgAKFyA',
    },
]

const ProductCard = ({ product }) => (
    <div className="bg-white rounded-custom overflow-hidden product-card group cursor-pointer border border-gray-100">
        <div className="h-48 bg-gray-100 relative">
            <img alt="Product" className="w-full h-full object-cover" src={product.image} />
            {product.badge && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                    {product.badge}
                </div>
            )}
        </div>
        <div className="p-4">
            <h4 className="text-sm line-clamp-2 mb-2 group-hover:text-brand">{product.name}</h4>
            <p className="text-lg font-bold text-slate-900">{product.price}</p>
            <p className="text-xs text-gray-500 mt-1">{product.minOrder}</p>
        </div>
    </div>
)

const ProductGrid = () => {
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">New Arrivals &amp; Trending</h2>
                <a className="text-brand font-semibold text-sm hover:underline" href="#">View more</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default ProductGrid
