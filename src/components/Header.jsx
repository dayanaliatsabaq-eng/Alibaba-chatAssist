const Header = () => {
    return (
        <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-6">
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center gap-2">
                    <div className="bg-brand text-white p-2 rounded-custom font-extrabold text-2xl tracking-tighter">
                        A<span className="text-white opacity-80">.</span>
                    </div>
                    <span className="text-2xl font-black text-slate-900 hidden sm:block">Alibaba.com</span>
                </div>

                {/* Search Bar */}
                <div className="flex-grow max-w-3xl flex items-center">
                    <div className="relative w-full flex items-center">
                        <input
                            className="w-full border-2 border-brand rounded-l-full py-2 px-6 focus:outline-none focus:ring-0"
                            placeholder="What are you looking for..."
                            type="text"
                        />
                        <button className="bg-brand text-white font-bold py-[10px] px-8 rounded-r-full hover:bg-brand-dark transition-colors flex items-center gap-2">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                            </svg>
                            <span className="hidden md:inline">Search</span>
                        </button>
                    </div>
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-6 text-gray-700">
                    <div className="hidden xl:flex flex-col items-center cursor-pointer hover:text-brand">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </svg>
                        <span className="text-[10px] mt-1">Sign In</span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer hover:text-brand">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </svg>
                        <span className="text-[10px] mt-1">Orders</span>
                    </div>
                    <div className="relative flex flex-col items-center cursor-pointer hover:text-brand">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </svg>
                        <span className="text-[10px] mt-1">Cart</span>
                        <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">0</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
