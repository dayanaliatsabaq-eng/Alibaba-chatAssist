const TopNav = () => {
    return (
        <nav className="bg-white border-b border-gray-200 py-1 hidden lg:block">
            <div className="container mx-auto px-4 flex justify-between items-center text-xs text-gray-600">
                <div className="flex space-x-4">
                    <a className="hover:text-brand" href="#">Alibaba.com</a>
                    <a className="hover:text-brand" href="#">For Buyers</a>
                    <a className="hover:text-brand" href="#">For Suppliers</a>
                </div>
                <div className="flex space-x-4 items-center">
                    <span>English-USD</span>
                    <a className="hover:text-brand" href="#">Help Center</a>
                    <a className="hover:text-brand" href="#">Get the app</a>
                </div>
            </div>
        </nav>
    )
}

export default TopNav
