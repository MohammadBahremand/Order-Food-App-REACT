import UseHttp from "../hooks/useHttps.js";
import MealItem from "./MealItem.jsx";

const requestConfig = {};
export default function Meals() {
  const {
    data: loadedMeals,
    error,
    isloeading,
  } = UseHttp("http://localhost:3000/meals", requestConfig, []);


  if (isloeading) {
    return <p>Fetching Meals... </p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
