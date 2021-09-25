# FilMate
## Description
FilMate is a social media platform that gives users the opportunity to make decisions (watch or not) on movies, rate these movies and host events or viewing parties. Users are also able to communicate with eachother through live chat and follow other users based on similar interests. This project was created in order to get more familiar with fullstack web development whilst focusing on the back end.
The aim of FilMate is to connect movie lovers and allow them to discuss their passion for film.

## MVP
* Authentication and Authorization process allowing users to sign up and view the website.
* Home view including sign up and log in modals.
* Profile view showing movies, users interests, users followed and events the user is attending.
* Random movie view where users make decisions on movies.
* Movie list view where users can rate movies they have previously made decisions on.
* Movie details view where users can see further details about each movie, see other users who have liked this movie, follow these users and enter a chat room to interact with these users.
* Events view where users can create and host an event (through a form showed in a modal), see all future events hosted by themselves or users they follow and choose to attend or unattend those events.

## Backlog
* Events view allowing users to host and join events/viewing parties.
* Chatroom to allow users to chat about certain movies.

## Data Structure
### App.js and Routes
All of the routes were handled in the app.js file with links to the routes folder for better organization
#### 1. index.js
This is a very simple inital route that directs the user to the home page of the app.

#### 2. auth.routes.js
This file hosts the necessary routes to allow for user sign up, login and logout. Since there is no specific view for any of them, but the homepage, all of them only have a post route each. In the sign up post route were applied the following validators: check if all required fields are filled, check email format, check password strength, check if password and passwordCheck match and check if username and email are unique. Aditionally, password is encrypted and the user is create in the database. For the login route, it's also checked if all required information has been filled, if the user exists in the database and if the password matches. Then, the user is authenticated. At the same time, an auth middleware was created in order to create all necessary authentication needed for the app function.

#### 3. profile.routes.js
The profile route file has a number of get and post routes. The initial get route renders relevant infomration on the users profile including, user info, movie info, user interests and user connections. The profile also makes use of several post routes allowing the user to unfollow other users, add interests to their profile and delete these interests.

#### 4. randomMovie.routes.js
This route has a get route that in combination with The Movie Data Base Api (TMDB) displays a list of random movies. Users can then decide to watch or chill for each movie. There is also a post route that sends these decisions to the databse.

#### 5. movieList.routes.js
The initial get route renders the view with the movies the user has made decisions on as well as the users other interests. The next get route allows user to apply filters including genre, decision and rank. The same view is rendered but the filters are applied to the list of movies. Users can also give the movies a ranking in this view, this in done through the use of a post route that updates the information in the database. Users can find connections in this view, other users who have also made a decision on this movie are rendered through a get route. Given this infomration users can decide to follow other users with similar interests which is sent to the databse through a post route.

#### 6. events.routes.js
The main route in this file is the basic get route that renders the events view, with all future events hosted by the loggedInUser or any of it's connections. For that,  a filter is applied on the Movie model, searching all of the user's movies, a filter on the User model, in order to get the array of users that the loggedInUser follows, and a filter on the Event model, filtering only events hosted by the user and a user on its following array, as well as events occuring later than the present date, all sorted by date. There is also 3 aditional post routes, one to create/host events, using a form passed on req.body, one to attend events and one to unattend events, both updating the attendees array on the Event model.

### Views
The views for this app were created using handlebars. The initial views folder contains _index.hbs_, layout.hbs, error.hbs, not-found.hbs and thre folders, events, movies and private.

#### Private
  This folder contains one handlebards file, _profile.hbs_. This file is the view that is rendered for the user profiles. 

#### Movies
  The movies folder contains random-movies.hbs, movie-list.hbs and movie-details.hbs. 
  * _random-movie.hbs_ is the view that is rendered when users are making decision on movies 
  * _movie-list.hbs_ is the view that is rendererd when users want to see all the movies they have made decisions on. They are also able to rate movies in this view.
  * _movie-details.hbs_ is a view that is rendered directly from the movie-lit.hbs file. It is the view that provides more information on each movie as well as allwoing users to follow other users and chat with them in the chatroom.

#### Events
  The events folder contains the _events-list.hbs_ file used to render the list of events hosted by users. 

### Models
* User.model.js - Schema for user information
* Moive.model.js - Schema for storing movies from the API (TMDB)
* Interest.model.js - Schema to store user interests data
* Connection.model.js - Schema for storing connections made between users 
* Event.model.js - Schema storing events created by users 
* Chat.model.js - Schema to store chat history

### Other files

#### Middlewares 
* auth.config.js - contains all authentication middleware
* cloudinary.config.js - contains cloudinary middleware to load images
* socket.config.js - contains all middleware for live chat 

#### Public
* Images 
* Js - contains script.js and chat.js 
* Stylesheets - style.css

### Links 
https://trello.com/b/LNPhLayu/filmate
https://docs.google.com/presentation/d/1kmGy47blzlRrIrDVe5I7m6XwseSKcLbLwrZF3qS_4RQ/edit?usp=sharing

