import { Search } from 'lucide-react'
import { useState } from 'react';
const SerchFoodInput = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            <div className="w-full max-w-md mx-auto flex items-center rounded-full bg-[#F48C05] shadow-md overflow-hidden">
                <input
                    id="food-search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search momo, pizza, burger..."
                    className="flex-1 min-w-0 bg-transparent px-5 py-4 text-sm md:text-base font-cinzel text-[#F5F2EB] placeholder:text-[#F5F2EB]/70 focus:outline-none"
                />
                <div className="flex items-center justify-center pr-5 text-[#F5F2EB]">
                    <Search size={20} />
                </div>
            </div>
        </>
    )
}

export default SerchFoodInput
