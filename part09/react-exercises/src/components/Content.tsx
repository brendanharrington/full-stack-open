import Part from "./Part";

import type { CoursePart } from "../types";

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((p, i) => {
        return <Part key={`part-${i}`} part={p} />
      })}
    </div>
  )
}

export default Content;