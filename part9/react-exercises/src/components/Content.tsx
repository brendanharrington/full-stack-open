interface Part {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: Part[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((p, i) => {
        return <p key={`part-${i}`}>{p.name} {p.exerciseCount}</p>
      })}
    </div>
  )
}

export default Content;