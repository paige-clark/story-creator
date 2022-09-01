## Readr App

READR is an app that allows you collaborate with other users to create new stories paragraph by paragraph! This project was made as midterm project for Lighthouse Labs.

## Screenshots

![homepage](https://github.com/paige-clark/story-creator/blob/master/doc/home.png?raw=true)
![mystories](https://github.com/paige-clark/story-creator/blob/master/doc/my_stories.png?raw=true)
![createstory](https://github.com/paige-clark/story-creator/blob/master/doc/create_story.png?raw=true)
![storyother](https://github.com/paige-clark/story-creator/blob/master/doc/story_other.png?raw=true)
![storyown](https://github.com/paige-clark/story-creator/blob/master/doc/story_own.png?raw=true)
![writeentry](https://github.com/paige-clark/story-creator/blob/master/doc/write_entry.png?raw=true)
![erd](https://github.com/paige-clark/story-creator/blob/master/doc/erd.png?raw=true)
![userstories](https://github.com/paige-clark/story-creator/blob/master/doc/user_stories.png?raw=true)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
6. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
7. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
