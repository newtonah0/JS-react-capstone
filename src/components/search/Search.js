import { useState } from 'react';
import './search.css';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearch } from 'react-icons/io5';
import { getSearch } from '../../redux/features/fruits/fruitsSlice';

function Search() {
  const [isSearchVisible, setSearchVisible] = useState(false);

  const data = useSelector((state) => state.fruits);
  const dispatch = useDispatch();

  const changeHandle = (e) => {
    const uniqueFamily = [];
    const newArr = data.fruits.filter((element) => {
      const isDuplicate = uniqueFamily.includes(element.family);
      if (!isDuplicate) {
        uniqueFamily.push(element.family);
        return true;
      }
      return false;
    });
    const { value } = e.target;
    const reslt = newArr.filter((item) => item.family.toLowerCase().includes(value.toLowerCase()));
    dispatch(getSearch(reslt));
  };

  return (
    <div className="search-container">
      {isSearchVisible && (
        <input
          data-testid="search-box"
          className="search-input"
          type="text"
          placeholder="search"
          onChange={(e) => changeHandle(e)}
        />
      )}
      <button
        data-testid="search-btn"
        type="button"
        className="search-icon"
        onClick={() => setSearchVisible(!isSearchVisible)}
      >
        <IoSearch size="3rem" color="#112a46" />
      </button>
    </div>
  );
}

export default Search;
