import { useState, useCallback, useEffect } from "react";

interface FetchState<T> {
    data: T | null; // store fetched data || null if nothing is fetched yet
    loading: boolean; // indicates ongoing fetch operation
    error: string | null; // stores any error msgs from fetch || null if none
}

type FetchOptions = RequestInit; // alias for type used by Fetch API

export default function useFetch<T>(
    url: string,
    defaultOptions?: FetchOptions,
    dataUpdateTrigger?: boolean,
    autoFetch = false // control automatic fetching
): [(fetchOptions?: FetchOptions) => Promise<void>, FetchState<T>] {
    // state(s)
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // generic function using the Fetch API

    const fetchData = useCallback(
        async (fetchOptions?: FetchOptions) => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, {
                    ...defaultOptions,
                    ...fetchOptions,
                });

                if (!response.ok) {
                    throw new Error(
                        `HTTP error. ${response.status} : ${response.statusText}`
                    );
                }

                const result: T = await response.json();

                setData(result);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [url, defaultOptions]
    );

    // Automatically trigger fetch if autoFetch is true

    useEffect(() => {
        if (autoFetch) {
            void fetchData();
        }
    }, [autoFetch, fetchData, dataUpdateTrigger]);

    return [fetchData, { data, loading, error }];
}
