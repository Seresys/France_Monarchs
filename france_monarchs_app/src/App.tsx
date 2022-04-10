import { Suspense } from "react";
import "./App.css";
import { ErrorBoundary } from "./components/stateHandling/ErrorBoundary";
import { Loader } from "./components/stateHandling/Loader";
import { Tree } from "./components/tree/Tree";

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
