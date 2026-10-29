import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from "react";

const PreviewScreen = () => {
     const [reloadKey, setReloadKey] = useState(0);

     const url = useSelector((state) => state.sandboxReducer.url);
  return (
       <div>
      <button onClick={() => setReloadKey((prev) => prev + 1)}>
        Reload Preview
      </button>

      <iframe
        key={reloadKey}
        src={url}
        title="Sandbox Preview"
        width="100%"
        height="600"
      />
    </div>
  )
}

export default PreviewScreen