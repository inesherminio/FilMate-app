#FilMate
##Description
FilMate is a social media platform that gives users the opportunity to make decisions (watch or not) on movies, rate these movies and host events or viewing parties.
users are also able to communicate with eachother through live chat and follow other users based on similar interests. This project was created in order to get more familiar
with fullstack web development whilst focusing on the back end.
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
1.Index route for the home screen.
  This is a very simple inital route that directs the user to the home page of the app.
2.Authetication route for sign up and log in. 

3.Profile route for the user profile one the user has logged in. 
   The profile route has a number of get and post routes. The initail get route renders information relevant infomration on the users profile including, user info, 
   movie info, user interests and user connections. The profile also makes use of several post routes allowing the user to unfollow other users, add interests to their profile
   and delete these interests. 
4.Random 




