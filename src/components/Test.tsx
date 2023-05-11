import React, { useCallback } from 'react';

function Test(props: any) {
  const handleClick = useCallback(() => {
    console.log(props)
    props.plugin?.setState({ isAnnotationMode: false });
  }, [props?.plugin])

  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        position: 'absolute',
        inset: 0
      }}
    >
      Overlay

      <button onClick={handleClick}>Close</button>
    </div>
  );
}

export default Test;
