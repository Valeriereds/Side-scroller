# Side-scroller

## Descriptions

Our game, JumpIt NYC, was made through a wonderfully seamless, collaborative effort. Our game started out with only a sprite-sheet attached to it's assets folder, and a dream attached to our hearts. But with a team willing to put in the work over a straight week, we built our game from scratch, debugging every syntax issue that came across our path. We started out with creating and fleshing out the game's database models for the User and Scores, defining the relationships between them, and tackling the routes to retrieve and post our user's data input. The toughest part of the whole endeavor was by far making and testing our routes. Many, many times it was syntax, but going over our code step-by-step helped our team figure out what we might have missed. Our second biggest issue turned into linking each handlebar page to it's appropriate fetch request, making sure the button was redirecting properly on the front end, as well as only letting the authorized user(one who's logged in) go past the initial log in page. Using the WithAuth middleware, the application prevents anyone who's not logged in to access any secure pages, so it was a no-brainer using it for our routes. Last, but absolutely not least in the slightest, we had to build a functional, 80's era inspired, pixelated, side-scrolling game! One brave member of our team tackled this hurdle solo, and blew way past our beginner expectations, while also learning how to use canvas, as this was the starting point in creating our game. He referenced the Frank's Laboratory tutorial throughout development of this game, which helped pave the way for him to not only build a working game, but include a few extra features as well! Adding gameplay music, power-up and game-over sound effects, plus the functionality of the power-up itself, really pushed this game to the next level. Not only can you dodge an attack, now you can earn double the points as well! Our last issue was making sure our leaderboard handlebar page displayed the User name and score in a descending order. We referenced past class activities, as well as the documentation, to find our solution. Which turned out to be incorrect syntax, our toughest enemy. This was our team's first effort with making a game, and we hope you enjoy it playing it as much as we enjoyed watching our work come to life!

Future improvements include: 
- Choose a character from various sprites and save it to user profile
- Game can end without player failure (introduce a running clock to get to the end of the level)
- Use the y-axis for obstacles/enemies as well (swimming or flying enemies)
- Other power-up options: fighting enemies with fireballs
- Add more sophisticated game stats for leaderboard differentiation
- Fight a boss at the level's end
- Add more than 1 level

## Installation

![GIF of application running on terminal](<assets/images/Untitled_ Aug 14, 2023 12_19 AM.gif>)

https://drive.google.com/file/d/1Px8O7c55ys8aPrudAiBWCi4mH0ImNBWV/view

*Use these instructions if the game url doesn't deploy properly*
To run the game on local host, first run and log in to mysql in your terminal, run "SOURCE db/schema.sql;" to acquire the database, quit mysql and return to the bash terminal. From here run the seeds file by inputting "node seeds/seed.js". Once it's seeded, run the server with "node server.js", input the address: "localhost:3001" into your browser and you'll be redirected to our game's login/signup page!

## Usage



To access the game, an existing user must be logged in, otherwise a new user must sign up, using a password that must be 8 or more characters. When the user is logged in, they're redirected to a homepage with three options: Start Game, access Leaderboards, or Log Out, as well on the following instructions on how to play the game: hit the left or right arrow keys to move your character around the game screen, as well as jumping up to dodge rats and acquire pizza power-ups for double the points! Once a player loses, they are redirected to the game over screen, which allows them to restart the game, look at the leaderboards, or log out and let another player try their hand at beating your score! Only the top 5 highest scores are displayed on the leaderboards, good luck!

## Credits

We would never have been able to find a starting point to building our game without referencing this Frank's Laboratory tutorial throughout: 

https://www.youtube.com/watch?v=7JtLHJbm0kA

Many thanks to Frank, honorary member of the JumpIt NYC devs.

## License
A [MIT license](https://github.com/Valeriereds/Side-scroller/blob/main/LICENSE) was used for this project.
