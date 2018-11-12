# Express test-suite

Proyect for the FullStack Bootcamp where we are building an API with NodeJS and ExpressJS, while we learn the different perks of this technology.

## Under the hood

The API retrieves the data from the `model/` folder, where we can find two files:

* movies.json
* users.json

Both files are uploaded when the user connects to the URI.

## API interaction

### GET methods

* Retrieve all the movies -> `/api/movies`
* Retrieve all the users -> `/api/users`
* Retrieve a specific movie -> `/api/movies/{query}` where query takes the form _key=value+to+search_.  
  * **Key** options:
    * id
    * title
    * director
    * likes _(yet-to-be-fixed)_ - DON'T USE

### POST methods

The parameters specified in the following lines must be declared as a JSON object in the body request.

* Add a movie defining the _title_ and the _director_ -> `/api/movies/add`
* Add an user defining the _username_ and _password_ -> `/api/users/add`

### Updates

* Update the data of an already existing movie through its id -> `/api/movies/update/{id}, where we have to define the title and director in the request body.
* Add likes to a certain movie -> `/api/movies/like/{id}`

### Delete

* Remove the specified movie through its _id_ -> `/api/movies/delete/{id}, Taking into account that it must be done through Postman