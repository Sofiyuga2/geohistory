import "./SearchBar.sass"

type SearchBarProps = {
    query: string;
    setQuery: (value: string) => void;
}

const SearchBar = ({ query, setQuery }: SearchBarProps) => {
    return (
        <input
            type="text"
            placeholder="Поиск..."
            name="name"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}

export default SearchBar;