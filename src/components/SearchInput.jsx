const SearchInput = ({
    txtSearch,
    setTxtSearch,
    searchRef,
    search
}) => {
    return (
        <div className="el-input">
            <input
                ref={searchRef}
                className="el-input__inner"
                type="text"
                name="slots-search"
                placeholder="Buscar..."
                onChange={(event) => {
                    setTxtSearch(event.target.value);
                }}
                onKeyUp={(event) => {
                    search(event);
                }}
                value={txtSearch}
            />
        </div>
    );
};

export default SearchInput;