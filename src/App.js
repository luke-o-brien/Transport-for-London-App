import React from "react";

function App() {

  //  let [currentDate, setCurrentDate] = React.useState(undefined)
  //  const [fishdex, setFishdex] = React.useState(undefined)
  const [displayFish, setDisplayFish] = React.useState({});
  
  React.useEffect(() => {
    async function getRandom () { 
      const fishdex = Math.floor(Math.random() * 115);
      const res = await fetch("https://cryptic-everglades-76066.herokuapp.com/https://www.fishwatch.gov/api/species")
      const data = await res.json()
      console.log(data)
      const dailyfish = data[fishdex]
      console.log(dailyfish)
      setDisplayFish(dailyfish)
      console.log(dailyfish["Species Name"])
      localStorage.setItem("current fish", JSON.stringify(dailyfish));

    }
    getRandom()
  }, [])
  

  return ( <h1>
    <h2>{displayFish[Species Name]}</h2>
    <h4>{displayFish["Population"]}</h4>
  Hey World.
  </h1>
  )
} 

export default App
