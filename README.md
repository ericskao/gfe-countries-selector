# Countries Selector

Create an autocomplete text input that allows the user to search through a list of countries via a [country search API](https://www.greatfrontend.com/api/questions/countries?search=A) and add them to a bulleted list below the text input. The user can remove the added countries by clicking on an X on the right of each country list item (like a Todo list). Some HTML is provided for you as example contents.

## Requirements

- You will need to use a country search API to fetch list of countries. We have provided one [here](https://www.greatfrontend.com/api/questions/countries?search=A) that you can use to pass in a query and returns an array.
- Searching in the input should display a list of countries from the API. Clicking on one of the list options will add them to a list below.
- In the list below, each country has a X button on the right, which removes it from the list
- It is recommended to use a debounce function (create your own or use a package) to avoid making an API call after every letter input
