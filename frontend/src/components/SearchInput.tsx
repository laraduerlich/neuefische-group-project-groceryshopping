type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: SearchInputProps) {
    return (
        <div className="relative flex-grow w-full">
            <input
                type="text"
                placeholder="Search for a list"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-12 p-3 pl-4 pr-10 text-md bg-transparent border-2 rounded-lg outline-none border-red-500 placeholder-red-500 focus:ring-2 focus:ring-red-600"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-red-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6 0 7.5 7.5 0 0010.6 0z"
                    />
                </svg>
            </div>
        </div>
    );
}
