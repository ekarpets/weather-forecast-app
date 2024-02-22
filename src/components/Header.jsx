import searchImage from '../assets/images/icons/search-icon.svg';

export default function Header({ onChangeInput }) {
  const handleInputChange = (e) => onChangeInput(e.target.value);

  return (
    <header>
      <h1>Weather <b>Forecast</b></h1>

      <div className="search-bar">
        <img
          className="search-bar__image"
          src={searchImage} alt="Search icon"
        />
        <input
          type='text'
          placeholder="Search your trip"
          className="search-bar__input"
          onChange={handleInputChange}
        />
      </div>
    </header>
  );
}
