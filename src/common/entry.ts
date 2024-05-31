export class Entry {
    // Home
    public static readonly WebTitle: string = "Nike Plus";

    // Authentication
    public static readonly Login: string = "Nike Plus";

    public static readonly ErrorMessage_InputNumber: string = "Please input an integer.";

    // Marketplace
    // Sort Options
    public static readonly SortOptions = [
        { name: "Most Popular", href: "#", current: true },
        { name: "Best Rating", href: "#", current: false },
        { name: "Newest", href: "#", current: false },
        { name: "Price: Low to High", href: "#", current: false },
        { name: "Price: High to Low", href: "#", current: false },
    ];
    // Sub Categories
    public static readonly SubCategories = [
        { name: "Totes", href: "#" },
        { name: "Backpacks", href: "#" },
        { name: "Travel Bags", href: "#" },
        { name: "Hip Bags", href: "#" },
        { name: "Laptop Sleeves", href: "#" },
    ];
    // Filters
    public static readonly Filters = [
        {
            id: "color",
            name: "Color",
            options: [
                { value: "white", label: "White", checked: false },
                { value: "beige", label: "Beige", checked: false },
                { value: "blue", label: "Blue", checked: true },
                { value: "brown", label: "Brown", checked: false },
                { value: "green", label: "Green", checked: false },
                { value: "purple", label: "Purple", checked: false },
            ],
        },
        {
            id: "category",
            name: "Category",
            options: [
                { value: "new-arrivals", label: "Life Style", checked: false },
                { value: "sale", label: "Basketball", checked: false },
                { value: "travel", label: "Running", checked: true },
                { value: "organization", label: "Training", checked: false },
                { value: "accessories", label: "Tracking", checked: false },
            ],
        },
        {
            id: "size",
            name: "Size",
            options: [
                { value: "2l", label: "39", checked: false },
                { value: "6l", label: "40", checked: false },
                { value: "12l", label: "41", checked: false },
                { value: "18l", label: "42", checked: false },
                { value: "20l", label: "43", checked: false },
                { value: "40l", label: "44", checked: true },
            ],
        },
    ];
    // Footer Navigation
    public static readonly FooterNavigation = {
        account: [
            { name: "Manage Account", href: "#" },
            { name: "Saved Items", href: "#" },
            { name: "Orders", href: "#" },
            { name: "Redeem Gift card", href: "#" },
        ],
        service: [
            { name: "Shipping & Returns", href: "#" },
            { name: "Warranty", href: "#" },
            { name: "FAQ", href: "#" },
            { name: "Find a store", href: "#" },
            { name: "Get in touch", href: "#" },
        ],
        company: [
            { name: "Who we are", href: "#" },
            { name: "Press", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Terms & Conditions", href: "#" },
            { name: "Privacy", href: "#" },
        ],
        connect: [
            { name: "Instagram", href: "#" },
            { name: "Pinterest", href: "#" },
            { name: "Twitter", href: "#" },
        ],
    };
}
