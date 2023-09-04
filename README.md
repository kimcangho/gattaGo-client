<<<<<<< HEAD
# gattaGo-client

> gattaGo is a dragonboat team coaching tool designed to track teams, manage athletes and build boat lineups.

NOTE: for back-end documentation, see [here](https://github.com/kimcangho/gattaGo-server#readme).

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Next Steps](#next-steps)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## General Information

- Dragonboating is a flatwater canoe sport where teams of 22 (1 drummer, 20 paddlers and 1 steersperson) race each over a given distance.
- Traditional means of managing teams vary from tactile pen-and-paper to spreadsheet and print-out implementations.
- gattaGo aims to provide a web application alternative of tracking dragonboat teams, athlete details and boat lineups.
- This project was conceived to reinforce full-stack web development practices and to address a niche opportunity within an amateur sport.

## Technologies Used

- React.js - version 18.2.0
- TailwindCSS - version 3.3.2
- Typescript - version 5.0.2
- Vite.js - version 4.3.9

## Notable Libraries Used

- axios - version 1.4.0
- chart.js - version 4.3.3
- dnd-kit - version 6.0.8
- framer-motion - version 10.15.2
- react-chart-js-2 - version 5.2.0
- react-hook-form - version 7.44.3

## Features

- Login/Signup with custom API using JWT
- Create, edit and delete teams and view high-level data via dashboard.
- Create, edit and delete athletes and sort/filter by paddler skills and stats.
- Create, edit and delete boat lineups by using drag-and-drop functionality.
- Generate a sample team with 30 athletes and 1 lineup (for demo purposes).

## Screenshots

Empty Overview Page
![Empty Overview Page](https://res.cloudinary.com/di7kiyj3y/image/upload/v1692409325/gattago-empty-overview_miszyl.png)

Team Overview Page
![Team Overview Page](https://res.cloudinary.com/di7kiyj3y/image/upload/v1692409325/gattago-overview-team_thyzfs.png)

Team Dashboard Page
![Team Dashboard Page](https://res.cloudinary.com/di7kiyj3y/image/upload/v1692409325/gattago-dashboard_umznra.png)

Team Roster Page
![Team Roster Page](https://res.cloudinary.com/di7kiyj3y/image/upload/v1692409326/gattago-roster_opynqh.png)

Team Lineup Page
![Team Lineup Page](https://res.cloudinary.com/di7kiyj3y/image/upload/v1692409326/gattago-lineups_eyu4rd.png)

Team Lineup Page with Mobile and Drag-and-Drop
![Team Lineup Page with Mobile and Drag-and-Drop](https://res.cloudinary.com/di7kiyj3y/image/upload/v1692409326/gattago-lineups-responsive_oso1ph.png)

## Setup

RECOMMENDED: follow setup steps in backend documentation for server/database first.

1. Download or clone repository.
2. Install application.
   > npm i
3. Launch application.
   > npm run dev

## Usage

### Scripts

| Script        | Description                                                              |
| :------------ | :----------------------------------------------------------------------- |
| `npm run dev` | Compile Typescript code into Javascript and build application with Vite. |

## Project Status

Project is: _in progress_.  
Currently working on: _cleanup_.

## Next Steps

Room for improvement:

- General refactoring and type-checking.

To do:

- Optimize touch features for lineup page.
- Team race day tab with exportable lineups, race plans, team site location.

Future Phase Ideas:

- User roles: managers (read+write), athletes (read-only), event organizers.
- Regatta and event support for event organizers.
- Live race day progressions and results using websockets.

Known issues:

- Touch events interfering with scrolling in lineup page.
- Deployment issues where cookies are unable to be received by front-end from back-end.

## Contact

Created by [Kent K.C. Ho](https://www.linkedin.com/in/kentkcho/) - feel free to contact me!

> Written with [StackEdit](https://stackedit.io/).
=======

>>>>>>> 70be8305cc1d2fa135975e03781fbeb29a3d95ad
