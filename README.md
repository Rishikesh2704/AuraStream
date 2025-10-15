## Project Overview

Aurastream is a responsive and robust anime streaming web application built using  _Nextjs_. It includes user Authentication, dynamic anime details and smooth UI animation for good user Experience 

**Live Demo:** [https://aurastreams.vercel.app/](https://aurastreams.vercel.app/)
 
 > ⚠️**Note:** The episodes don't work

## Screenshots

### Homepage

  <p align="center">
    <img src='/screenshots/Heropage.png'>
 </p>

### Anime Details

  <p align="center">
    <img src='/screenshots/AnimeInfo Modal.png'>
 </p>

### Episode Streampage

  <p align="center">
    <img src='/screenshots/AnimeEpisode StreamPage.png'>
 </p>

## Features

- Anime Details shown in modal
- Multiple server for episodes
- Infinite Scroll feature for pagination
- Google Authentication
- Favorites page feature to store favorite anime of the user

## How It's Made

**Techstack**: _Nextjs_, _Redux_, _RTK Query_, _Firebase_

I used Nextjs to leverage _SSR_, _Image optimization_, _Font optimization_ and _Routing_ features. Used RTK query for api calls, caching, hydration of the data, Redux for state management. Integrated Firebase for user Authentication. Created modal component for anime details and infinite scroll feature for better user experience.It uses animation on interaction to create smooth user experience

## Optimization

 <p align="center">
    <img src='/screenshots/Lighthouse Score.png'>
 </p>

**Performance Improved :** From **49 -> 90+** (Lighthouse)

**Techniques Used :**

 + SSR for homepage along with Redux hydration improve FCP
 + Priority attribute to Main Image 
 + Defined width and height of Images to reduce layoutShifts.
 + Preload and defer for 3rd party library. 
 + Lazy loaded the components below the page fold.
 + Followed best practices to improve performance

## Installation & Usage

```
 git clone https://github.com/Rishikesh2704/AnimeApp.git
 cd AnimeApp
 npm install

 npm run dev
```
