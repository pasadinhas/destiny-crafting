import PatternProgressWireframe from "./PatternProgressWireframe";

function EmptyPatternProgress() {
  return <PatternProgressWireframe
    loading={true}
    completed={false}
    name={"▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃"}
    type={"▃▃▃▃▃▃"}
    progress={"?"}
    completionValue={"?"}
    progressPercentage={0}
  />
}

export default EmptyPatternProgress;
