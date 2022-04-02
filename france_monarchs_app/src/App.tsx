import { Suspense } from "react";
import "./App.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Loader } from "./components/Loader";
import { Tree } from "./tree/Tree";

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Tree />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
