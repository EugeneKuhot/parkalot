import React, {ChangeEvent, useEffect, useRef, useState} from "react";


const Search = ({searchSpaces}: PropsType) => {
    const [searchResults, setSearchResults] = useState<Results | null>(null);
    const [searchRequestId, setSearchRequestId] = useState<number>(0);
    const [isError, setIsError] = useState<boolean>(false);

    const previousRequestIdRef = useRef<number>(0);

    useEffect(() => {
        previousRequestIdRef.current = searchRequestId;
    }, [searchRequestId]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIsError(false)
        const searchText = e.target.value;
        const currentRequestId = previousRequestIdRef.current + 1;
        setSearchRequestId(currentRequestId);
        searchSpaces(searchText)
            .then((results) => {
                if (currentRequestId === searchRequestId + 1) {
                    setSearchResults(results);
                }
            })
            .catch((error) => {
                console.error(error)
                setIsError(true)
            });
    }
    let items = searchResults ? Object.values(searchResults)[0] : null
    return (
        <div className="App">
            <input type="text" onChange={(e) => onChangeHandler(e)} />
            {isError && <p>Something went wrong. Please try again later.</p>}
            {!isError && items && (
                <ul>
                    {items.map((el: Space | Address, index: number) => (
                        <li key={index}>{Object.values(el)}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Search

type Results = ResultsSpaces | ResultsAddresses

type ResultsSpaces = {
    spaces: Space[];
};

type ResultsAddresses = {
    addresses: Address[];
};

type Space = {
    name: string;
};

type Address = {
    address: string;
    country: string;
}

type PropsType = {
    searchSpaces: (searchText: string) => Promise<Results>;
};