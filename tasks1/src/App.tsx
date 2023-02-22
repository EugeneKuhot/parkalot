import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {Results, searchSpaces} from "./service/search";
import "./App.css";

function App() {
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

  return (
    <div className="App">
      <input type="text" onChange={(e) => onChangeHandler(e)} />
        {isError && <p>Something went wrong. Please try again later.</p>}
        {!isError && searchResults && (
            <ul>
                {searchResults.spaces.map((space, index) => (
                    <li key={index}>{space.name}</li>
                ))}
            </ul>
        )}
    </div>
  );
}

export default App;
