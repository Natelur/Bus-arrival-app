import React, { useState, useEffect } from 'react';
import './App.css';

function BusService({ busArrivalData }) {
  return (
    <ul>
      {busArrivalData.services.map((service) => {
        const result = service.next_bus_mins < 0 ? 'Arrived' : `${service.next_bus_mins} minutes`;

        return (
          <li key={service.bus_no}>
            Bus {service.bus_no}: {result}
          </li>
        );
      })}
    </ul>
  );
}

async function fetchBusArrival(id) {
  const response = await fetch(`https://sg-bus-arrivals-sigma-schoolsc1.replit.app/?id=${id}`);
  const data = await response.json();
  return data;
}

function App() {
  const [busStopId, setBusStopId] = useState('');
  const [busArrivalData, setBusArrivalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);

  const options = [
    "18131",
    "18141",
  ]

  const onOptionChangeHandler = (event) => {
    setData(event.target.value);
    setBusStopId(event.target.value)
    console.log(
      "User Selested Value - ", event.target.value 
    )
  }


  useEffect(() => {
    console.log('Rendered')
    if (busStopId) {
      setLoading(true);
      fetchBusArrival(busStopId)
        .then((data) => setBusArrivalData(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [busStopId]);

  // function handleInputChange(event) {
  //   setBusStopId(event.target.value);
  // }

  return (
    <div>
      <h1>Bus Arrival App</h1>
      {/* <input
        type="text"
        value={busStopId}
        onChange={handleInputChange}
        placeholder="Enter Bus Stop ID"
      /> */}
      <select onChange={onOptionChangeHandler}>
        <option>Please choose one</option>
        {options.map((option,index)=> {
      return(
      <option key={index}>
        {option}
      </option>
      )
        })}

      </select>
      {loading && <p>Loading...</p>}
      {busArrivalData && busArrivalData.services && (
        <>
          <h2>Bus Stop {busArrivalData.bus_stop_id}</h2>
          <BusService busArrivalData={busArrivalData} />
        </>
      )}
    </div>
  );
}

export default App;
