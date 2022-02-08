import React, { useState } from "react";

// --------------------------- API Handler ---------------------------
const API = "https://corona.lmao.ninja/v2/countries";

export const fetchCountryData = async (countryName) => {
  const response = await fetch(
    `${API}/${countryName}?yesterday=${true}&strict=${true}&query%20`
  );
  return response.status === 404 ? "notFound" : response.json();
};

const fetchTopFiveCountryData = async (sort) => {
  const response = await fetch(`${API}?${false}&sort=${sort}`);
  const data = await response.json();
  return data;
};

// --------------------------- Header of the App ---------------------------
const Header = ({ SearchType, UpdateStorage }) => {
  const [countryName, setCountryName] = useState("");
  const [data, setData] = useState([]);

  // when user clicks on go button
  const clickOnGo = () => {
    SearchType(countryName, data);
    fetchCountryData(countryName).then((data) => {
      if (data !== "notFound") UpdateStorage(countryName);
    });
  };

  // when user's choice if radio butttons changed
  const changeToken = (e) => {
    fetchTopFiveCountryData(e.target.value).then((data) => {
      const fiveCountry = data.slice(0, 5);
      setData(fiveCountry);
    });
  };

  return (
    <div className="App-header">
      {/* app title */}
      <a a href="https://www.sbu.ac.ir/" htmlFor="country" className="title">
        SBU Covid
      </a>

      {/* country name box */}
      <input
        className="input"
        type="text"
        value={countryName}
        placeholder="Country Name"
        onChange={(e) => setCountryName(e.target.value)}
      />

      {/* search button */}
      <button className="goButton" onClick={clickOnGo}>
        Go
      </button>

      {/* radio buttons */}
      <ul className="radio" onChange={(e) => changeToken(e)}>
        <input className="ch" type="radio" name="opt" value="todayCases" />
        <label htmlFor="case">Today Cases</label>
        <input className="ch" type="radio" name="opt" value="todayDeaths" />
        <label htmlFor="death">Today Deaths</label>
        <input className="ch" type="radio" name="opt" value="todayRecovered" />
        <label htmlFor="recoverd">Today Recoverd</label>
      </ul>
    </div>
  );
};

export default Header;
