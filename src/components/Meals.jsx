import UseHttp from "../hooks/useHttps.js";
import MealItem from "./MealItem.jsx";
import Error from "./Errore.jsx";




const requestConfig = {};
export default function Meals() {
  const {
    data: loadedMeals,
    error,
    isLoading,
  } = UseHttp("http://localhost:3000/meals", requestConfig, []);

  console.log('loadedMeals', loadedMeals)
  console.log('error', error)


  if (isLoading) {
    return <p className="center">Fetching Meals... </p>;
  }

  if (error) {
    return <Error title="Failed to fetching meals data!!" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
