"use client";


export default function ErrorPage(
  {error,reset} : {error: Error, reset: () => void}) {

    return (<div>
      <h1>Error</h1>
      <p>Sorry, something went wrong </p>
      <p>{error.message}</p>
      <button onClick={reset}>Reset</button>
    </div>)
  }