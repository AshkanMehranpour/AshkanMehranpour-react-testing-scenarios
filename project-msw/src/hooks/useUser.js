import axios from 'axios';
import useSWR from 'swr';

async function userFetcher(url) {
  // Add this log to see if the fetcher function itself is called
  console.log(`userFetcher CALLED for URL: ${url}`); 
  const res = await axios.get(url);
  console.log("Fetcher received:", res.data); 
  return res.data;
}

export default function useUser() {
  const { data, error, isLoading } = useSWR(
    '/api/user', 
    userFetcher,
    {
      // This option is crucial for tests:
      // It disables SWR's default behavior of de-duplicating requests made for the same key
      // within a short time window (default is 2 seconds).
      // In fast-running tests, this can prevent the fetcher from being called.
      dedupingInterval: 0,
      
      // While defaults are usually fine, being explicit in tests can sometimes help:
      // revalidateOnMount: true, // SWR default
      // revalidateIfStale: true, // SWR default
    }
  );

  return {
    user: data?.user,
    isLoading,
    error,
  };
}
