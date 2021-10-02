import { useEffect,useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = ()=> {
const[meals,setMeals] = useState([]);
const[isLoading,setIsLoading] = useState(true);
const[httpError,setHttpError] = useState();

const fetchMeals = async () => {
  const response = await fetch('https://meals-6b55a-default-rtdb.firebaseio.com/meals.json');
  if(!response.ok){
    throw new Error('something went wrong');
  }
  const responseData = await response.json();

  const loadedData = [];

  for(const key in responseData){
    loadedData.push({
      id:key,
      name:responseData[key].name,
      description:responseData[key].description,
      price:responseData[key].price
    });
  }

  setMeals(loadedData);
  setIsLoading(false);
}

  useEffect(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

if(isLoading){
  return <section className={classes.MealsLoading}>
    <p>Loading...</p>
  </section>
}

if(httpError){
  return <section className={classes.MealsError}>
    <p>{httpError}</p>
  </section>
}
    const mealList = meals.map((meal) =>
        <MealItem 
            id={meal.id}
            key={meal.id} 
            name={meal.name} 
            description={meal.description} p
            price={meal.price}/>
    );
    
    return (
        <section className={classes.meals}>
            <Card>
            <ul>
                {mealList}
            </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals
