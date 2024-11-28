

const SearchBar = () => {
  return (
    <div className="search-bar">
      <select>
        <option>Comprar Apartmentos</option>
        <option>Rentar Apartmentos</option>
        <option>Comprar Casa</option>
        <option>Rentar Casa</option>
      </select>
      <input type="text" placeholder="Medellin, Antioquia" />
      <select>
        <option>$10,000 - $200,000</option>
        <option>$200,000 - $500,000</option>
        <option>$500,000 - $1,000,000</option>
      </select>
      <button className="search-btn">SEARCH</button>
    </div>
  );
};

export default SearchBar;
