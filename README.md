# Express test-suite

Proyect for the FullStack Bootcamp where we are building an API with NodeJS and ExpressJS, while we learn the different perks of this technology.

## Under the hood

The API retrieves the data from the `model/` folder, where we can find two files:

-   movies.json
-   users.json

Both files are uploaded when the user connects to the URI.

## API interaction

### GET methods

-   Retrieve all the movies -> `/api/movies`
-   Retrieve all the users -> `/api/users`
-   Retrieve a specific movie -> `/api/movies/{query}` where query takes the form _key=value+to+search_.
    -   **Key** options:
        -   id
        -   title
        -   director
        -   likes _(yet-to-be-fixed)_
