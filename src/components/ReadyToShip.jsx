const items = [
    {
        id: 1,
        name: 'Portable Air Purifier with HEPA Filter',
        price: '$22.00',
        shipping: 'Ships in 24h',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKbCLdrhABrJrKtImcoECFceVDkuQBYkLvWwbWH4fsqPOMVluMOqBS1wQtZ2ASuDhZgfp2ri0KOOBFsM2I283XjWs8KCMpaQVxYeKSFqUAW_s6OeLNBcPw2dUw91-nauISz0HCNKCnc78HoLmUZ9rv0ys7XPwcXuXUfAnvh_J_PZbWgJWnGWxyQ9YRK7rR-_PXeAURYo8arYkR8NK6LVsi-XjPmKZu74_OO-9zNTfNGuRJU6JhamixpQAasari7rpoNraSbM1YHQ',
    },
    {
        id: 2,
        name: 'Mechanical Gaming Keyboard RGB',
        price: '$35.00',
        shipping: 'Ships in 48h',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEO8ozFpe1LkfgPp_zKbNrhf2yABQEPlxOFoJFdGUG6UtP-fl5Z85hCAZ62wRamvMM9cXXDvXsIHorER-s6YfG246s8H2JnT3GInaaeGyrlriNcXKaQfrvujCxcxCFhsbrsFma0JH8wnw98tQ7fplcRjqtD3hYJC6HIIPJTwjliBtZk-O1t1KnzWVXnFlKcErDIvJuDDbCgccL6GjgbX0t1M1LZZOdoYVha8VI_-iUJyQoMMBE40C_tTm_YA2Nji3BVK-AOdfudw',
    },
    {
        id: 3,
        name: 'Foldable Drone with 4K Camera',
        price: '$89.99',
        shipping: 'Ships in 24h',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCOzVq8jEM6MnYvbsO9RO1Isj2FcQIiSkRKt2SpHm_kbV55N-k03zuKmrHMnREatPm5g4NFZ0gQthGQWHT8AMP2SV-daH_moBgk2VezBX2DC1X6d2DvwBq5iQfDHOE-Eq0ldvEGas-1WiC4kvtCupGUxR2UTywYmqqL0n48hixRAEUmarSetev3BqlzEs711oYHjsC2BzUFXjM1pw4F_4Wx9mn2oKvatsbp2JWUJ_7x6zOkxi24A2O8O5-rnQrGLi8lTKBll7_kw',
    },
    {
        id: 4,
        name: 'Kitchen Spice Organizer 3-Tier',
        price: '$12.40',
        shipping: 'Ships in 48h',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdZcgoKT_kVaSeIedetvlVqcMm9lw9LR3SPaRp_29pDG2cpkbui1VdrRdo3t3OBxgy8RgHCN5foXw_AbaxajBCIXVh22qUAyq690p5TuscDnhBCEdDKrjE7z49LySI9cVc5vevdYajXDXbqkbUK9irlEz6W9nplD7IMfnUuhjOuMsbwFpyZkR4SPy9stO8dxMObB0LcihVmFJXqmS8wNNb80t7pZ8ei8Gh6awjpc4blzB5xRlz4TuGp4cKyU4NSxiB5Xf2nso3Jg',
    },
]

const ReadyToShip = () => {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-bold">Ready to Ship</h2>
                    <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-bold">Fast Delivery</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-custom hover:border-brand/30 transition-colors cursor-pointer">
                            <img alt="Item" className="w-24 h-24 object-cover rounded bg-gray-50" src={item.image} />
                            <div>
                                <h5 className="text-sm font-semibold line-clamp-2">{item.name}</h5>
                                <p className="text-brand font-bold mt-1">{item.price}</p>
                                <p className="text-[10px] text-green-600 font-bold uppercase mt-1">{item.shipping}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ReadyToShip
