import type { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.part.kind) {
    case "basic":
      return (
        <p>
          <strong>{props.part.name} {props.part.exerciseCount}</strong>
          <br />
          <em>{props.part.description}</em>
        </p>
      )

    case "group":
      return (
        <p>
          <strong>{props.part.name} {props.part.exerciseCount}</strong>
          <br />
          project exercises {props.part.groupProjectCount}
        </p>
      )

    case "background":
      return (
        <p>
          <strong>{props.part.name} {props.part.exerciseCount}</strong>
          <br />
          <em>{props.part.description}</em>
          <br />
          background material: {props.part.backgroundMaterial}
        </p>
      )

    case "special":
      return (
        <p>
          <strong>{props.part.name} {props.part.exerciseCount}</strong>
          <br />
          <em>{props.part.description}</em>
          <br />
          required skills: {props.part.requirements.join(', ')}
        </p>
      )

    default:
      return assertNever(props.part)
  }
}

export default Part