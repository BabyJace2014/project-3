# PROJECT3 for Rutger's Coding Bootcamp
## Bookwormz App

This is a full-stack React App, relying on a Node/Express server, a mongoDB database and the GoodReads API.

### General Overview
The purpose of this app is to be a Book Club management tool, for people who are part of a book group that meets in person to discuss their reading selections. Members of a Book Club created in this app can set schedules for upcoming meetings and invite other members to attend. They can see the reading history of the group and use the app to pull rating information from Goodreads.com to help them select a book for the meeting's discussion.

User accounts are authenticated via email address & password.

This single page app starts on a Landing Page, where the user can either Sign Up for a new account on the app, or Sign In with an existing account's credentials.

The user comes into the app on their Profile page, where they can create a new Book Club or see their existing clubs and any upcoming events any of their clubs are hosting. If a user creates a new club, they are assigned as the administrator for that club and become members of that club.  From their Profile page, users can access the Club page for any of the clubs they are members of.

From the Club page, the administrator can generate a subscription email to send out to invite people to join the club.  All users can see that club's activities on the Club page: history of books read, history of hosted events and any upcoming events. A user can also choose to host an event and send an invitation to other members to join them.
Book details and ratings are retrieved from Goodreads via their hosted API.

### Hosting
This app is hosted on Heroku and can be accessed [here](https://intense-ridge-63205.herokuapp.com)