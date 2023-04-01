import { useState, useMemo, useRef } from 'react';
import '../styles.css';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

const CountrySelector = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [pinnedCountries, setPinnedCountries] = useState(new Set());
  const inputRef = useRef();

  const getCountries = (query) => {
    if (query !== '') {
      fetch(`https://www.greatfrontend.com/api/questions/countries?search=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data?.countries);
        });
    } else {
      setSuggestions([]);
    }
  };

  const onCountryClick = (country) => {
    if (!pinnedCountries.has(country.name)) {
      const newSet = new Set(pinnedCountries);
      newSet.add(country.name);
      setPinnedCountries(newSet);
    }
    inputRef.current.value = '';
    setSuggestions([]);
  };

  const onCountryDelete = (country) => {
    const newSet = new Set(pinnedCountries);
    newSet.delete(country);
    setPinnedCountries(newSet);
  };

  const debounceOnChange = useMemo(() => debounce(getCountries, 300), []);

  return (
    <div className="container">
      <input
        ref={inputRef}
        className="country-text-input"
        placeholder="Search countries"
        onChange={(e) => debounceOnChange(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((country) => (
            <li className="list-country" key={country.code} onClick={() => onCountryClick(country)}>
              {country.name}
            </li>
          ))}
        </ul>
      )}
      <ul className="pinned-countries">
        {Array.from(pinnedCountries).map((pinnedCountry, index) => (
          <li className="pinned-country" key={index}>
            <div>{pinnedCountry}</div>
            <button onClick={() => onCountryDelete(pinnedCountry)}>&#x2715;</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountrySelector;
