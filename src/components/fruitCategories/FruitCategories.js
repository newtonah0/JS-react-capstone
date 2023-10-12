import { useEffect } from 'react';
import './fruitCategories.css';
import { useSelector, useDispatch } from 'react-redux';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import headerImg from '../../assets/img/fruit.jpeg';
import { getFruits } from '../../redux/features/fruits/fruitsSlice';
import Search from '../search/Search';

const FruitCategories = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fruits);
  useEffect(() => {
    dispatch(getFruits('fruits'));
  }, [dispatch]);

  const uniqueFamily = [];

  let newArr = data.fruits.filter((element) => {
    const isDuplicate = uniqueFamily.includes(element.family);

    if (!isDuplicate) {
      uniqueFamily.push(element.family);

      return true;
    }

    return false;
  });

  const arr = [];
  let sum = 0;
  if (data.fruitsFilter.length > 0) {
    newArr = data.fruitsFilter;
  }
  for (let j = 0; j < newArr.length; j += 1) {
    let sumCal = 0;
    for (let i = 0; i < data.fruits.length; i += 1) {
      if (newArr[j].family === data.fruits[i].family) {
        sumCal += data.fruits[i].nutritions.calories;
      }
    }
    arr.push({ id: newArr[j].id, family: newArr[j].family, cal: sumCal });
  }
  for (let j = 0; j < newArr.length; j += 1) {
    sum += arr[j].cal;
  }

  return (
    <div className="fruit-categories-conatiner">
      <Search />
      <div className="header-section">
        <div className="header-img">
          <img className="img" src={headerImg} alt="fruits" />
        </div>
        <div className="header-text">
          <h2 className="header-title">Fruit Tree</h2>
          <p className="text">
            {sum}
            {' '}
            cal
          </p>
        </div>
      </div>
      <div className="categories-title">
        <p>Fruits Categories</p>
      </div>
      <div className="fruit-categories">
        {arr.map((cat) => {
          const img = cat.family.toLowerCase();

          return (
            <Link className="menu-link" to={`/details/${img}`} key={cat.id}>
              <div className="fruit-container" data-testid="search-result">
                <img
                  className="fruit-img"
                  src={`https://ecomia.tech/imgs/${img}.jpeg`}
                  alt="fruit"
                />
                <IoArrowForwardCircleOutline
                  className="details-icon"
                  color="#112a46"
                  size="3rem"
                />
                <p className="title">{cat.family}</p>
                <p className="text">
                  {cat.cal}
                  {' '}
                  Cal
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FruitCategories;
