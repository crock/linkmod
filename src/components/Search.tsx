
interface SearchProps {
    searchHandler: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const Search = ({ searchHandler }: SearchProps) => {

    return (
        <div className="flex flex-col justify-start items-start my-6">
          <label htmlFor="search" className="font-semibold text-base mb-1">
            Filter by Search Terms
          </label>
          <small className="leading-4 font-light text-sm mb-2">
            Enter a search term to filter the list of links.
          </small>
          <input
            name="q"
            id="search"
            type="text"
            className="form-input w-full"
            tabIndex={4}
            onChange={searchHandler}
          />
        </div>
    )
}

export default Search;