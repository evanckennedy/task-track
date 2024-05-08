import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <>
      <main>
        <div className="container flex">
          <Header />
          <ToDoList />
        </div>
      </main>
    </>
  );
}

export default App;
