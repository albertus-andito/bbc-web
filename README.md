# BBC Web Trainee Test - Articles Ranker

This website shows 3 articles (one at a time) and allows user to rank the articles at the end.

This is created as a test for the BBC Web and Backend trainee application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

After cloning the repo, install the dependencies modules.

```
npm install
```

### Running

To get a development env running:

```
npm start
```

### Further Improvements
Several improvements that can be made to this website:
1. Cache the articles that have been read so that the performance can be improved (there is no need to access the network).
2. Pre-loading the subsequent articles, possibly by using React-Loadable or any other lazy loading methods, so that the performance can be imrpoved.
3. Add routings to the website using React-Router, eventhough it is now acting as a Single Page Application.
4. Manually add build configurations, using webpack, gulp, and such.

