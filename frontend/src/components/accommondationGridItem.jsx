import * as React from "react";

export default function AccommondationGridItem({ data, ...props }) {
  return (
    <div className="grid-item" {...props}>
      <p>{data}</p>
    </div>
  );
}