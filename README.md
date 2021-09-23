#FilMate
##Description
FilMate is a social media platform that gives users the opportunity to make decisions (watch or not) on movies, rate these movies and host events or viewing parties. Users are also able to communicate with eachother through live chat and follow other users based on similar interests. This project was created in order to get more familiar with fullstack web development whilst focusing on the back end. 
The aim of FilMate is to connect movie lovers and allow them to discuss their passion for film. 

##MVP
*Authentication and Authorization process allowing users to sign up and view the website.
*Home view including sign up and log in modals. 
*Profile view showing, movies, users interests, followers and events the user is attending. 
*Random movie view where users make decisions on movies. 
*Movie list view where users can rate moives they have previously made decisions on.
*Movie details view where users can see further details about each movie and follower other users who have liked this movie (enter a chat room to interact with these users).

##Backlog
*Events view allowing users to host and join events/viewing parties. 
*Chatroom to allow users to chat about certain movies. 

##Data Structure
###App.js and Routes 
All of the routes were handled in the app.js file with links to the routes folder for better organization
1.index.js
  This is a very simple inital route that directs the user to the home page of the app.
  
2.auth.routes.js 

3.profile.routes.js 
  The profile route file has a number of get and post routes. The initail get route renders information relevant infomration on the users profile including, user info, movie       info, user interests and user connections. The profile also makes use of several post routes allowing the user to unfollow other users, add interests to their profile and       delete these interests. 
   
4.randomMovie.routes.js
  This route has a get route that in combination with The Movie Data Base Api (TMDB) displays a list of random movies. Users can then decide to watch or chill for each movie.     There is also a post route that sends these decisions to the databse.
  
5.movieList.routes.js
  There are many get and post routes in this file. The initial get route renders the view with the movies the user has made decisions on as well as the users other interests.     The next get route allows user to apply filters including genre, decision and rank. The same view is rendered but the filters are applied to the list of movies. Users can also   give the movies a ranking  in this view, this in done through the use of a post route that updates the information in the database. Users can find connection in this view,       other users who have also made a decision on this movie are rendered through a get route. Given this infomration users can decide to follow other users with similar interests   which is sent to the databse through a post route. 
6.Eevents.routes.js

###Views 
The views for this app were created using handlebars. The initial views folder contains index.hbs, layout.hbs, error.hbs, not-found.hbs and thre folders, events, movies and private.
####Events

###Models

###Other files 



  
  




