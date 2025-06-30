import Header from "./Header";
import UrlScanner from "./UrlScanner";


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Header />
      <main className="p-6">
        {/* URL input and results will go here next */}
        <UrlScanner />
      </main>
    </div>
  );
}

export default App;
