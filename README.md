# JumpIt NYC

## Description

Our side-scrolling single-level javascript game, JumpIt NYC, was made through a wonderfully seamless, collaborative effort. Our game started out with only a sprite-sheet attached to its assets folder and a dream attached to our hearts. But with a team willing to put in the work over a straight week, we built our game from scratch, debugging every syntax issue that came across our path. We started out with creating and fleshing out the game's database models for the User and Score, defining the relationships between them, and tackling the routes to retrieve and post our user's data input. The toughest part of the whole endeavor was by far making and testing our routes. Many, many times it was syntax, but going over our code step-by-step helped our team figure out what we might have missed. Our second biggest issue turned into linking each handlebar page to its appropriate fetch request, making sure the button was redirecting properly on the front end. We then had to control site access, ensuring that only authorized users- here, any user who is properly logged in using a username and password- were able to access the game. We adopted a WithAuth middleware seen elsewhere in the course for our purposes. Last, but absolutely not least in the slightest, we had to build a functional, 80's-era-inspired, pixelated, side-scrolling game! One brave member of our team tackled this hurdle solo, and blew way past our beginner expectations. This meant learning how to use canvas, an entirely new technology to us. We were able to meet our initial expectations for JumpIt NYC's gameplay, and even add in some extras! As noted in this README's credits section, we followed the guidlines provided by Frank's Laboratory tutorial throughout development. Adding gameplay music, power-up and game-over sound effects, plus the functionality of the power-up itself, really pushed this game to the next level. Not only can players jump over the advancing rats, but they can earn double the points while doing so! Our last issue was making sure our leaderboard handlebar page displayed the player name and score in a descending order. We referenced past class activities, as well as the documentation, to find our solution- syntax! (Syntax remains the advancing oversized rat to our team, our toughest enemy...). This was our team's first effort with making a game, and we hope you enjoy it playing it as much as we enjoyed watching our work come to life!

Future improvements include: 
- Choose a character from various sprites and save it to user profile
- Game can end without player failure (introduce a running clock to get to the end of the level)
- Use the y-axis for obstacles/enemies as well (swimming or flying enemies)
- Other power-up options: fighting enemies with fireballs
- Add more sophisticated game stats for leaderboard differentiation
- Fight a boss at the level's end
- Add more than 1 level
- Continue adding mobile functionality

## Installation

No installation is necessary to play JumpIt NYC from its deployed location! 

To host JumpIt NYC locally, once the gitHub repository has been cloned, open the integrated node terminal to download all included node packages in the project's package.json file by running the `npm i` command. Lastly, run node server.js and open your browser to the https://localhost3001/ to play! 

![GIF of application running on terminal](<assets/images/Untitled_ Aug 14, 2023 12_19 AM.gif>)

https://drive.google.com/file/d/1Px8O7c55ys8aPrudAiBWCi4mH0ImNBWV/view

## Database Creation & Seeding

We created our inter-relational database with two tables for scoring user's credentials and scores. 

![schematic representation of the sidescroller database](<assets/images/database-schema.jpg>)

Although no seeding of the database is necessary to play and enjoy JumpIt NYC, seeding and modeling files were included in the project for testing purposes, and can be accessed by users who create a .env file locally  and input their mysql credentials. Users should also run the `SOURCE db/schema.sql;` command once mysql has been opened in the terminal to initially drop and create anew the sidescroller database. 

## Usage

![GIF of gameplay and leaderboard page](<assets/images/Untitled_ Aug 14, 2023 3_39 PM.gif>)

https://drive.google.com/file/d/1GWs2iOQHL8MzSv1T7tkQOlJMZJKC1yE7/view

https://shielded-sierra-32207-ce4eacbcd6c6.herokuapp.com/

To access the game, an existing user must be logged in, otherwise a new user must sign up, using a password that must be 8 or more characters. When the user is logged in, they're redirected to a homepage with three options: Start Game, access Leaderboards, or Log Out, as well on the following instructions on how to play the game: hit the left or right arrow keys to move your character around the game screen, as well as jumping up to dodge rats and acquire pizza power-ups for double the points! Once a player loses, they are redirected to the game over screen, which allows them to restart the game, look at the leaderboards, or log out and let another player try their hand at beating your score! Only the top 5 highest scores are displayed on the leaderboards, good luck!

## Credits

We would never have been able to find a starting point to building our game without referencing   [Frank's Laboratory tutorial](https://www.youtube.com/watch?v=7JtLHJbm0kA) throughout development. 

Many thanks to Frank, honorary member of the JumpIt NYC devs.

## Art 

The art used in JumpIt NYC can be found below: 

- [Background art](https://craftpix.net/freebies/free-pixel-art-street-2d-backgrounds/)
- [Character sprite](https://craftpix.net/freebies/free-3-cyberpunk-characters-pixel-art/?num=1&count=525&sq=cyberpunk%20characters&pos=3)
- [Rat sprites](https://craftpix.net/freebies/free-street-animal-pixel-art-asset-pack/) 
- [Cheesy NY pizza](https://opengameart.org/content/food-items-16x16)

## License
A [MIT license](https://github.com/Valeriereds/Side-scroller/blob/main/LICENSE) was used for this project.
