import "./variabales.scss";

interface Props {
  className: string;
  children: any;
}

function Section({ className, children }: Props) {
  return <div className={`container ${className}`}>{children}</div>;
}

export default Section;
