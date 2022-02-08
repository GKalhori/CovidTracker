import "./App.css";
import { useState } from "react";
import SearchHistory from "./SearchHistory";
import { fetchCountryData } from "./SearchBar";
import Header from "./SearchBar";
import Container from "./Container";

function App() {
  const [found, setFound] = useState(false);
  const [countryName, setCountryName] = useState([]);
  const [buttonChoise, setButtonChoise] = useState(true);
  const [sort, setSort] = useState();
  const [Storage, addToStorage] = useState([]);

  // add new data to search history
  const UpdateStorage = (countryName) => {
    addToStorage((currentStorage) => [...currentStorage, countryName]);
    localStorage.setItem("c", Storage);
  };

  // clears seach history
  const ClearStorage = () => {
    addToStorage([]);
    localStorage.clear();
  };

  // determine which type of search is chosen
  const SearchType = (countryName, data = "") => {
    // radio button enabled
    if (countryName === "") {
      setButtonChoise(true);
      setSort(data);
    }
    // country name entered
    else {
      setButtonChoise(false);
      fetchCountryData(countryName).then((data) => CheckCountry(data));
    }
  };

  // check country name validation
  function CheckCountry(status) {
    // country not found
    if (status === "notFound") setFound(false);
    else {
      setFound(true);
      setCountryName(status);
    }
  }

  // returns search result
  function Result() {
    return (
      <div>
        {buttonChoise ? sort?.map((item) => ShowTopFive(item)) : ShowCountry()}
      </div>
    );
  }

  // top 5 countries based on chosen sort
  function ShowTopFive(item) {
    return (
      <Container
        name={item?.country}
        death={item?.todayDeaths}
        recovered={item?.todayRecovered}
        critical={item?.critical}
        today={item?.todayCases}
      />
    );
  }

  // information of entered country
  function ShowCountry() {
    if (found) {
      return (
        // change value of fields with fetched data
        <Container
          name={countryName?.country}
          death={countryName?.todayDeaths}
          recovered={countryName?.todayRecovered}
          critical={countryName?.critical}
          today={countryName?.todayCases}
        />
      );
    }
    // country not found alert
    else {
      return (
        <Container
          name="Country Not Found!"
          death="-"
          recovered="-"
          critical="-"
          today="-"
        />
      );
    }
  }

  return (
    <div className="App">
      <Header SearchType={SearchType} UpdateStorage={UpdateStorage} />
      <div>
        <SearchHistory ClearStorage={ClearStorage} Storage={Storage} />
      </div>
      <div>
        <Result />
      </div>
    </div>
  );
}

export default App;
