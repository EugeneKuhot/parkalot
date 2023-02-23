import React from "react";
import "./App.css";
import Search from "./components/Search";
import {searchSpaces} from "./service/search";
import {searchAddresses} from "./service/searchAddress";

function App() {
    return (
        <>
            <h3>Variant of search component which works with search.ts</h3>
            <Search searchSpaces={searchSpaces} />
            <hr/>
            <h3>Variant of search component which works with searchAddresses.ts</h3>
            <Search searchSpaces={searchAddresses} />
        </>
    )
}

export default App;
