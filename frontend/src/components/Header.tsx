export default function Header() {
    const navLinks = [
        { name: "My Lists", path: "/" },
        { name: "Create", path: "/shoppinglist" },
        { name: "Shop", path: "/shopping/:id" },
    ];

    return (
        <header className="backdrop-blur-md bg-white/30 p-6 text-gray-800
        {/*[box-shadow:0px_6px_12px_rgba(244,67,54,0.2)]*/}
        ">
            <div className="container flex justify-between h-16 mx-auto">
                <a
                    rel="noopener noreferrer"
                    href="/"
                    aria-label="Back to homepage"
                    className="flex items-center"
                >
                    {/* App Logo */}
                    <img
                        src="/app-logo.png"
                        alt="App Logo"
                        className="w-16 h-16 object-contain"
                    />
                    {/* App Name */}
                    <img
                        src="/app-name.png"
                        alt="App Name"
                        className="ml-4 hidden md:block h-24 object-contain"
                    />
                </a>

                {/* Navigation */}
                <ul className="items-stretch hidden space-x-3 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.name} className="flex">
                            <a
                                rel="noopener noreferrer"
                                href={link.path}
                                className="flex items-center px-4 -mb-1 border-b-2 border-transparent hover:border-gray-800"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button className="flex justify-end p-4 md:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>
        </header>
    );
}
