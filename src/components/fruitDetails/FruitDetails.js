import { useParams } from 'react-router-dom';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import './fruitDetails.css';
import { useEffect } from 'react';
import {
  getFruitsFamily,
  getSearch,
} from '../../redux/features/fruits/fruitsSlice';

function FruitDetails() {
  const { family } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fruits);

  useEffect(() => {
    dispatch(getFruitsFamily(family));
    dispatch(getSearch([]));
  }, [dispatch, family]);
  let isdarkGreen = true;
  let sumCal = 0;
  for (let i = 0; i < data.fruits.length; i += 1) {
    sumCal += data.fruits[i].nutritions.calories;
  }
  return (
    <div className="details-container">
      <div className="details-header-contain">
        <div className="category-img">
          <img
            className="img"
            src={`https://ecomia.tech/imgs/${family}.jpeg`}
            alt="fruit category"
          />
        </div>
        <div className="category-text">
          <h2>{family}</h2>
          <p>{sumCal}</p>
        </div>
      </div>
      <div className="fruit-list-title">
        <p className="fruit-list-title-text">Fruits - Calories</p>
      </div>
      <div className="fruits-list">
        {data.fruits.map((fruit) => {
          isdarkGreen = !isdarkGreen;
          return (
            <div
              style={{ backgroundColor: !isdarkGreen ? '#ACE6D0' : '#62c09c' }}
              className="fruit"
              key={fruit.id}
            >
              <p className="fruit-name">{fruit.name}</p>
              <div className="right">
                <p className="fruit-cal">
                  {fruit.nutritions.calories}
                  {' '}
                  Cal
                </p>
                <button className="back-icon" type="button">
                  <IoArrowForwardCircleOutline
                    className="icon"
                    color="#fff"
                    size="3rem"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FruitDetails;
