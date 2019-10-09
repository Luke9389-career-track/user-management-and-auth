# LAB - 14 | Backend Routes Using Authorization and Authentication

## User Management, Authorization, Authentication

### Author: Luke Donahue

### Links and Resources
* [submission PR](https://github.com/Luke9389-career-track/user-management-and-auth/compare/admin?expand=1)
* [travis](https://www.travis-ci.com/Luke9389-career-track/user-management-and-auth/jobs/243645269)
* [heroku] (https://dashboard.heroku.com/apps/stormy-fjord-72409)

### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db

#### Running the app

**Describe what npm scripts do**
- Scripts: 
    - "lint": "eslint .",
    - "pretest": "npm run lint",
    - "jest": "jest --runInBand --verbose",
    - "test": "npm run jest",
    - "test:coverage": "npm run test -- --coverage",
    - "test:watch": "npm run jest -- --watchAll",
    - "test:verbose": "npm run test -- --verbose",
    - "start": "node server.js",
    - "start:watch": "nodemon server.js",
    - "make:admin": "node lib/scripts/make-admin.js"