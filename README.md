# Countries Selector

Create an autocomplete text input that allows the user to search through a list of countries via a [country search API](https://www.greatfrontend.com/api/questions/countries?search=A) and add them to a bulleted list below the text input. The user can remove the added countries by clicking on an X on the right of each country list item (like a Todo list). Some HTML is provided for you as example contents.

<img width="626" alt="Screen Shot 2023-04-07 at 10 04 00 PM" src="https://user-images.githubusercontent.com/7784705/230704147-e2dd6aae-a718-4357-9a55-16a6c7d29d1f.png">

## Requirements

- You will need to use a country search API to fetch list of countries. We have provided one [here](https://www.greatfrontend.com/api/questions/countries?search=A) that you can use to pass in a query and returns an array.
- Searching in the input should display a list of countries from the API. Clicking on one of the list options will add them to a list below.
- In the list below, each country has a X button on the right, which removes it from the list
- It is recommended to use a debounce function (create your own or use a package) to avoid making an API call after every letter input

## Solution
The focus of this question is fetching the list of countries via the country search API matching the query in the input tag.

### Initialization
We start by creating an input tag that will fire an onChange function that will make a backend request to the API with the search query. It is possible to save the query as a state variable in the component, but in this example we pass in the input target value directly to the onChange function. (We later use a ref to clear the search input values after a value has been selected). 

### Debounce
It is highly recommended to use a debounce function, which will wait a certain amount of time before the very last callback function is fired, or else we will be making a backend request after every key press. Here we have written a debounce function from scratch, but there are libraries like lodash that includes functional helpers.


### Making Back End API Requests
Our debounce function calls getCountries (`fetch(`https://www.greatfrontend.com/api/questions/countries?search=${query}`)`), a callback function that accepts the input query parameter; after the response (list of matching countries) is returned, we save `response.data.countries` as setSuggestions state to be rendered.

### State
We need a few states:
- `suggestions`: List of countries that is returned after passing in a query to the API. We use this to populate the unordered list below the text input.
- `pinnedCountries`: We need to keep track of all the clicked list of suggested countries from the unordered list. After clicking on a country in the autocomplete list, we append the country name to pinnedCountries. Here we use a Set, because we should not be able to pin duplicate countries to the list.
- You can initialize a default starting value for the text input value as `inputValue` and change the value on input onChange (and then fire the debounce function), but this is not necessary, as we keep track of the input value using the input's event target value.

### `onCountryClick`
Whether you decide to use an array or a set for pinnedCountries, we create a new Set/Array variable that has existing values (using spread operator) and append the clicked country. We then set the new variable with `setPinnedCountries`.

### `onCountryDelete`
Each country in our `pinnedCountries` list will have a delete button on the right. Clicking the button (onClick) will filter or delete the country from `pinnedCountries`.

### Rendering
Upon initialization, the text input will be empty and there will be no pinned countries. Hence we can add an empty state for no pinned countries. After searching for a text input, we should display the returned `suggestions` result in a new list (here we render a suggestion list with absolute positioning).
If `pinnedCountries` has any clicked countries, we display them in a list below.

## Test Cases
- Empty state
     - Text input should include a placeholder
     - Pinned countries list should have an empty state

- Searched input value
     - Autocomplete list should display returned results
     - Clicking on one of the results should pin it to the pinned countries list

- Pinned Countries
     - Should display list of clicked countries from the Autocomplete box
     - Each country should have a delete button which upon being clicked, will remove the country from the pinned countries list.

### Rendering
