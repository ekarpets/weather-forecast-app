import {  useState } from 'react';
import './App.css';

import Header from './components/Header';
import Aside from './components/Aside';
import Trips from './components/Trips';
import WeatherBlock from './components/WeatherBlocks.jsx';
import Form from './components/Form.jsx';

import { trips } from './assets/defaultListOfTrips.js'

function App() {
  const [filter, setFilter] = useState('');
  const searchBarData = (data) => setFilter(data.toLowerCase());

  const [formVisible, setFormVisible] = useState(false);
  const handleFormOpen = () => setFormVisible(true);
  const handleFormClose = () => setFormVisible(false);

  const [selectedTrip, setSelectedTrip] = useState(trips[0]);
  const handleTripSelected = (trip) => setSelectedTrip(trip);

  return (
    <div className="page">
      <Header onChangeInput={searchBarData} />

      <main className="main">
        <Trips
          filter={filter}
          selectedCity={selectedTrip.city}
          handleFormOpen={handleFormOpen}
          handleTripSelected={handleTripSelected}
        />

        <WeatherBlock currentTrip={selectedTrip} />

        <Aside currentTrip={selectedTrip} />

        {formVisible && <Form handleFormClose={handleFormClose} />}
      </main>
    </div>
  );
}

export default App;
