const categories = [
    'Consumer Electronics',
    'Home & Garden',
    'Machinery',
    'Apparel & Accessories',
    'Beauty & Personal Care',
    'Packaging & Printing',
    'Sports & Entertainment',
]

const services = [
    {
        title: 'Trade Assurance',
        subtitle: 'Built-in protection',
        color: 'blue',
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-.382-3.040z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
        ),
    },
    {
        title: 'Logistics Services',
        subtitle: 'Shipping worldwide',
        color: 'green',
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
        ),
    },
    {
        title: 'Fast Dispatch',
        subtitle: 'Ready to ship',
        color: 'purple',
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
        ),
    },
    {
        title: 'Global Sources',
        subtitle: 'Verified suppliers',
        color: 'orange',
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
        ),
    },
]

const colorMap = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
}

const HeroSection = () => {
    return (
        <main className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Categories */}
                <aside className="hidden lg:block w-72 flex-shrink-0 bg-white rounded-custom p-4 custom-shadow border border-gray-100">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        Categories
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        {categories.map((cat) => (
                            <li key={cat} className="flex items-center justify-between hover:text-brand cursor-pointer group">
                                <span>{cat}</span>
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </li>
                        ))}
                        <li className="flex items-center justify-between hover:text-brand cursor-pointer border-t pt-2 mt-4 font-semibold text-gray-900">
                            <span>All Categories</span>
                        </li>
                    </ul>
                </aside>

                {/* Main Banner Section */}
                <section className="flex-grow space-y-6">
                    {/* Primary Large Banner */}
                    <div className="relative bg-gradient-to-r from-orange-500 to-brand h-96 rounded-custom overflow-hidden flex items-center group">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
                        <div className="relative z-10 px-12 max-w-lg text-white">
                            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">Connecting Global Buyers &amp; Sellers</h1>
                            <p className="text-lg opacity-90 mb-8">Direct from factories. Fast delivery. Secure payments.</p>
                            <button className="bg-white text-brand font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform">
                                Join for Free
                            </button>
                        </div>
                        <div className="absolute right-10 bottom-0 top-0 hidden md:flex items-center">
                            <img
                                alt="Hero Banner Visual"
                                className="object-contain max-h-full drop-shadow-2xl"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN7brMP6g0GwwLVMhvm6EUg0zHRzNQJKWloETdRedRxF9DIFMwVWUS2Psl4JFJFCjHpsQwPKRtOYCbF5gfe9S34Wa2LJWlUisPACOL3jIRQ8SPgFdI_T5GeVNphc-RM6YV3QwDeADv-ZvCu5a5x9s_E4NmmiKBCNKBzffb3PAFXonpigtPkDzODopClc4htzYdo2BglaI5xXGw5VeM8us6wBMX6f_et5yg1fiIDF_WEr8fvGnS0EystC9WRghMZkefQMNRgdWdwg"
                            />
                        </div>
                    </div>

                    {/* Quick Access Services */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {services.map((svc) => (
                            <div key={svc.title} className="bg-white p-4 rounded-custom flex items-center gap-4 custom-shadow hover:bg-orange-50 cursor-pointer">
                                <div className={`${colorMap[svc.color].bg} p-2 rounded-full ${colorMap[svc.color].text}`}>
                                    {svc.icon}
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{svc.title}</p>
                                    <p className="text-xs text-gray-500">{svc.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default HeroSection
