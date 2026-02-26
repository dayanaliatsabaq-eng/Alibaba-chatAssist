const regions = [
    {
        name: 'China',
        flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjCBXZbZmCgx5qiTZWgct9q3cRL2PAs2Qi8Ck-L4gxHQ_xXhD_yYiDMzpc7i_i3T3mkN0B87iWSFdUm81-aehw7dM3qnzgsgKJYB8rh-H8ISmAN8de7ZX8hRgKZ65_snE_U1sNxTXPAfgj9W8c4PDsZ9VM1zPFKChEzU_LrFzLXrg_9DDeC-hxePOBqanBeKBQdB1Rh8yeZcL8XEUvMaa0nAN8yF8yARfdw-Fq6odsY6ECo-29vieMZt9OMtPHoDeykvyN9ftnew',
    },
    {
        name: 'Vietnam',
        flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1rk8LFuQUAYOMKfssgSSVeOJA5VM92qUjauU2X1JxHC1Pw0YbR_Pz8uS6LYKzuTAKWfoFmth7wxZbR6ze34aZuTgGc-LQby5krHxEqh4AZ5TjTVwKTGIfYG2weEkxy8fBF0NaQyGS6JRSB4N6NepASTnWSTUvRB_2narD1k-5qOYetflI4avKxHGm8b6KLTXnVFIxUQIQdsH3r-THklCwqlY1P73pUkn_iM2C-2EPjXpYDd5RARYq_apy1rl5s_36XtkknINR-w',
    },
    {
        name: 'India',
        flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQeP5pwbJxZol7NUbC7SShMlwEBKBaiu2nbYAX3StpXHOEcQXrybLWPefqiJQ_xDRRvlt8SMoYxxMooc1Gd9o-sDARyVPM-57wq50R56npoSVwqDnWgHWaJPnTqEUMjOPSg2c5l0C-Uo7DvCa30ydhRHBj98sqd3uE-WQV5dfaGdgB5JzEGLKK_lum6KZxtXUdKA96VbEX2udlUWWYICQLWdjIypxBYYlzVFfdHLHX9YBMx9KKbRSgUFPlEAErHKd63U3UND6XdQ',
    },
    {
        name: 'Turkey',
        flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeYzpgUUAOp_I4Su16PTDVAD-FwZQtwlQz1uEXOlShmRha4lwVvfJbKOjVQA9CqHQ1xMDZfZCnKWhwitcFIOYmi25MwzORSZJtryA0myS0oVPOATaPjoUu4U451xaHQwjBKQCmUoVh-Ujw_nbwyIsNvvVwmWqdH3jbIAgpnmuVqo_aCwKQ7IQ8SrMQRAY2UWu0KvcHL_UNyg3gOYsxz7Sa9JbDb81vcfV1VzqUpSCiMghT70i5vW17NMVfzCAcBLuNpK8z_6nMVA',
    },
    {
        name: 'South Korea',
        flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvFgqv5R-9llGCF5uuN69GvPO2lasIxf6dCsWz0S8-6lscdL0cAWtpjmt8gh8RquLCpufIU5KB7ikLucZ5taj8XF0fb2_vqX0yQy0y5Gi0-2Y3aDln9HA15wVPKXY1-4FRJ2-N0brjis596wl-LmXkWevvLPVCT9pNTqu2Y4fms7MdHxRNA9_CsSkrrdcuevdaWaz0U0gYBfRkJ0Av10mqvVitnXYxY1YsU5onYWLJtZeQEXTNCISmLYB3YTejtPj0fXpDYR-cXw',
    },
    {
        name: 'USA',
        flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB632uwE73OokIYRTHhTOVXAcy-c4o0QTbIqOMMuvydn0H_xGaV5lw6FfbjYdd804B_m3G_NbKVt7I9Jd2x89AmIJ306efcaa8P7DK4CQYglBZzwSEjn_XPqkeplP6wVTSoaHvbnKwVc9iwS7_27kfZEisUJY9hfhAUkJYN1k3gPBOL0GYANMSNJyyEWqDPZEpB1U02n3XV2kO105qQVyE4OBrDtCKsvVwA3agvG9zCXLHsYPAGnBW4OkX8MnSG64W0_pKnvmiPRQ',
    },
]

const GlobalSuppliers = () => {
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="bg-slate-900 rounded-custom p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-8">Source from Top Regions</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {regions.map((region) => (
                            <div key={region.name} className="flex flex-col items-center gap-3 cursor-pointer group">
                                <div className="w-16 h-12 bg-white/10 rounded flex items-center justify-center group-hover:bg-brand transition-colors">
                                    <img alt={region.name} className="w-8 h-6 object-cover" src={region.flag} />
                                </div>
                                <span className="text-sm font-medium">{region.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand/10 rounded-full blur-3xl"></div>
            </div>
        </section>
    )
}

export default GlobalSuppliers
