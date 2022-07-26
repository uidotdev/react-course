import * as React from "react";
import { useSearchParams } from "react-router-dom";

export default function withSearchParams(Component) {
  function ComponentWithSearchParams(props) {
    const [searchParams] = useSearchParams();

    return <Component {...props} router={{ searchParams }} />;
  }

  return ComponentWithSearchParams;
}
