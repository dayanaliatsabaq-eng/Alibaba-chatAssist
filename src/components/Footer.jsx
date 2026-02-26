const footerSections = [
    {
        title: 'Customer Care',
        links: ['Help Center', 'Contact Us', 'Report Abuse', 'Submit a Dispute', 'Policies & Rules'],
    },
    {
        title: 'About Alibaba.com',
        links: ['About Us', 'Careers', 'Press Center', 'Blog', 'Investors'],
    },
    {
        title: 'Sell on Alibaba.com',
        links: ['Supplier Memberships', 'Learning Center', 'Training Workshops', 'Partner Program'],
    },
    {
        title: 'Buy on Alibaba.com',
        links: ['All Categories', 'Request for Quotation', 'Logistics Service', 'Sales Tax & VAT'],
    },
]

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="font-bold text-gray-900 mb-6">{section.title}</h4>
                            <ul className="space-y-4 text-sm text-gray-500">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a className="hover:text-brand" href="#">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Follow Us & Payment */}
                    <div className="col-span-2 lg:col-span-1">
                        <h4 className="font-bold text-gray-900 mb-6">Follow Us</h4>
                        <div className="flex gap-4 mb-8">
                            {/* Facebook */}
                            <a className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-colors" href="#">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            {/* Twitter */}
                            <a className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-colors" href="#">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-colors" href="#">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.012 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.012 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.584-.071 4.85c-.055 1.17-.249 1.805-.415 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.056.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.015-4.85-.071c-1.17-.055-1.805-.249-2.227-.415a3.478 3.478 0 01-1.382-.896 3.458 3.458 0 01-.896-1.382c-.164-.422-.36-1.056-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.584.071-4.85c.055-1.17.249-1.805.415-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.056-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                        </div>
                        <p className="text-sm font-bold text-gray-900 mb-4">Payment Methods</p>
                        <div className="flex flex-wrap gap-2 opacity-60">
                            <div className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold">VISA</div>
                            <div className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold">MasterCard</div>
                            <div className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold">PayPal</div>
                            <div className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold">Apple Pay</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
                    <p>&copy; 1999-2024 Alibaba.com. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="hover:underline" href="#">Terms of Use</a>
                        <a className="hover:underline" href="#">Privacy Policy</a>
                        <a className="hover:underline" href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
