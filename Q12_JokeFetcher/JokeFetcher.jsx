import React, { useEffect, useState } from 'react';

const JokeFetcher = () => {
  const [joke, setJoke] = useState(null);

  const fetchJoke = async () => {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    setJoke(data);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div>
      <div style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
        {joke ? `${joke.setup} - ${joke.punchline}` : 'Loading...'}
      </div>
      <button onClick={fetchJoke}>Get Another Joke</button>
    </div>
  );
};

export default JokeFetcher;