import React from "react";

const withPlaceHolder = WrappedComponent => props => (
  <WrappedComponent placeholder='Mon HOC' {...props} />
);

export default withPlaceHolder;
