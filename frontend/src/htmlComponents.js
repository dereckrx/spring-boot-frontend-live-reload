import React from "react";

export const x = React.createElement;
export const creatorFor = (name) => (...props) => x(name, ...props)
export const div = creatorFor('div')
