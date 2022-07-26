# Transport for London App
## Deployed Project: https://london-transport.netlify.app/

### Project Overview 

For this project I created a multipage mobile first react app which utilized the TFL Unified API and allowed the user to view line status, live departures and to plan their own journeys. I used multiple endpoints of the API and used Javascript methods in order to display JSON data returned by the API.

### Technologies Used 

* HTML
* CSS
* JavaScript
* React


### Challenge One - Displaying and using API Data 
One of the major challenges of this project was displaying and using the API data. The TFL API has multiple endpoints and many of these contain complex JSON data which required use of multiple array and object methods to access and display. A Sizable challenge with the TFL API data is that is frequently not presented in a way which is user friendly. 
``` json 
"startDateTime": "2022-06-16T00:06:00",
"duration": 149,
"arrivalDateTime": "2022-06-16T02:35:00",
```
The data above is one example of this in order to display the data to the user in a way which is easy to understand. for the example of time I wanted the user the user to see 00:06 and 02:35 to achieve this I used the code below spliting the string at the required points selected the part of the string which I wanted to display an omit and the piecing the string back together. With the case of the time all times on the TFL API are displayed in minutes or seconds and to display thesee in a user friendly manner I needed to convert these when displaying as can be seen below. 
``` js 
<div className={styles.JourneyTimes}>
  <p>{journey.startDateTime.split("T")[1].split(":").slice(0,-1).join(":")} - {journey.arrivalDateTime.split("T")[1].split(":").slice(0,-1).join(":")}</p>
      {(journey.duration > 60) ? <p>{Math.floor(journey.duration / 60)} hr {journey.duration / 60} mins</p> : <p> {journey.duration} min </p>}
</div>

```

### UI Design 

When creating a UI for this project my priority was making it easy for the user to navigate and see the information that they have requested. An app like this would be used by people in a rush and thus making the UI simple and easy to use was a priority. In addition to this I decided to design this app as being mobile first as in the real world users would be more likely to use this app on there phones. 

I decided to use a plain white background with black font and a green accent colour for the main parts of the user interface this was to ensure that the app was easy to view, I reasearched a number of different transport applications online and made took inspiration from the ones i felt were the easiest to use and had the nicest UIs. 

### Future developments

This app is expandable and there are several features i would like to improve and add these include 

* Support for the Bus network by creating a new page which displays live departures and route information about lines 
* An advanced search form including fields for journey preferances and accesibility requirements 
* Utilizing the Google Maps API to show the location of stations on the live departure page. 
* Use local storage to allow users to favourite stations/Lines where they would like to view departures and display these on the homepage. 
* Expanding on the above create a backend with facility for users to login and view their saved journeys and stations on a seperate page. 
