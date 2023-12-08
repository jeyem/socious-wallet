import { RouterProvider} from "react-router-dom";
import { blueprint } from "./Router";

function App(): JSX.Element {
  return (
    <>
        <RouterProvider router={blueprint}/>
    </>
  );
}

export default App;
