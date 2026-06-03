import { Circle, Figma, MousePointer2 } from "lucide-react";

export default function FigmaBar() {
  return (
    <div className="figma-bar" aria-hidden="true">
      <div className="figma-bar__left">
        <Figma size={15} />
        <span className="figma-pill">AI</span>
      </div>
      <div>Personal Knowledge Blog Design</div>
      <div className="figma-bar__right">
        <Circle size={17} />
        <MousePointer2 size={17} />
        <span className="figma-action">Make a copy</span>
        <span className="figma-share">Share</span>
      </div>
    </div>
  );
}
