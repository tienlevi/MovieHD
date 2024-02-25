import { useEffect } from "react";

interface Props {
  title: string;
  children: any;
}
function Title({ title, children }: Props) {
  useEffect(() => {
    document.title = title;
  }, []);
  return children;
}

export default Title;
