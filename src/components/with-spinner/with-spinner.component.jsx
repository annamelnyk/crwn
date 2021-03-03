import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const withSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  )
} 

// Full variant the same as above

// const withSpinner = WrappedComponent => {
//   const Spinner = ({ isLoading, ...otherProps }) => {
//     return isLoading ? (
//       <SpinnerOverlay>
//         <SpinnerContainer />
//       </SpinnerOverlay>
//     ) : (
//     <WrappedComponent {...otherProps} />
//   )};

//   return Spinner;
// } 

export default withSpinner;
