# Neighborhood Map (React)

This project was created for the final project in my [Udacity](https://www.udacity.com/) Front-End Web Developer nanodegree. It uses the Google Maps API along with the Foursquare API to list a number of locations around my hometown of Hagerstown, MD.

## Features
- A list of locations in my hometown. You can filter them using the filter bar in the sidebar.
- Click on a marker to see the available information.
- If you click an entry in the list of locations, it should make that location marker bounce a few times.

## Instructions

If you have Node.js installed on your computer, you should be able to navigate to the project directory and run the following command in your terminal:

```
npm install
```

After all the dependencies have been installed, you can run this command:

```
npm start
```

## Production Mode

If you want to use the full production mode with a Service Worker, you can create a production build using this command:

```
npm run build
```

Then run:

```
npm run deploy
```

That will start the app in development mode. If it doesn't load in your browser, you can navigate to [http://localhost:3000](http://localhost:3000).

## Resources

- [Udacity Project Rubric](https://review.udacity.com/#!/rubrics/1351/view)
- [Google Maps API Documentation](https://developers.google.com/maps/documentation/javascript/tutorial)
- [Foursquare API Documentation](https://developer.foursquare.com/docs/api)