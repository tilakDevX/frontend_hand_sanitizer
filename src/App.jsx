import Navabar from "./Routes/Navabar";
import AllRoutes from "./Routes/AllRoutes";
import Footer from "./Pages/Footer";
import { SearchProvider } from "./Pages/SearchContext";
function App() {
  return (
    <SearchProvider>
      <div>
        <Navabar />
        <AllRoutes />
        
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default App;
