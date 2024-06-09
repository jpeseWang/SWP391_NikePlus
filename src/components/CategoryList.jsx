import React from 'react'
const navigation = {
    icons: [
        { name: "Air Force 1", href: "#" },
        { name: "Huarache", href: "#" },
        { name: " Air Max 90", href: "#" },
        { name: "Air Max 95", href: "#" },
    ],
    shoes: [
        { name: "All Shoes ", href: "#" },
        { name: "Custom Shoes", href: "#" },
        { name: "Jordan Shoes", href: "#" },
        { name: " Running Shoes", href: "#" },
    ],
    clothing: [
        { name: "All Clothing", href: "#" },
        { name: "Modest Wear", href: "#" },
        { name: "Hoodies & Pullovers", href: "#" },
        { name: " Shirts & Tops", href: "#" },
    ],
    kids: [
        { name: "Infant & Toddler Shoes", href: "#" },
        { name: "Kids' Shoes", href: "#" },
        { name: "Kids' Jordan Shoe", href: "#" },
        { name: "Kids' Basketball Shoes", href: "#" },
    ],
};
export default function CategoryList() {
    return (
        <div>     <div className="md:grid md:grid-cols-1 md:gap-8">
            <div>
                <h3 className="text-lg font-semibold leading-6 ">Clothing</h3>
                <ul role="list" className="mt-6 space-y-4">
                    {navigation.clothing.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                className="text-regular leading-6 text-gray-500 hover:text-black"
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
                <div>
                    <h3 className="text-lg font-semibold leading-6 ">Kids</h3>
                    <ul role="list" className="mt-6 space-y-4">
                        {navigation.kids.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className="text-regular leading-6 text-gray-500 hover:text-black"
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div></div>
    )
}
