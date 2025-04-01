import { useState, useCallback, useEffect } from "react";

export interface FetchError {
    message: string;
    status?: number;
    details?: string;
}

interface FetchState<T> {
    data: T | null; // store fetched data || null if nothing is fetched yet
    loading: boolean; // indicates ongoing fetch operation
    error: FetchError | null; // stores any error msgs from fetch || null if none
}

type FetchOptions = RequestInit; // alias for type used by Fetch API

export function useFetch<T>(
    url: string,
    defaultOptions?: FetchOptions,
    autoFetch = false // control automatic fetching
): [(fetchOptions?: FetchOptions) => Promise<void>, FetchState<T>, () => void] {
    // state(s)
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<FetchError | null>(null);
    const [fetchTrigger, setFetchTrigger] = useState(0); // track re-fetch request

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
                    let errorDetails;

                    try {
                        errorDetails = await response.json();
                    } catch {
                        errorDetails = null;
                    }

                    throw {
                        message: `HTTP Error ${response.status}: ${response.statusText}`,
                        details: errorDetails.message,
                    };
                }

                const result: T = await response.json();

                setData(result);
            } catch (err) {
                setError(err as FetchError);
            } finally {
                setLoading(false);
            }
        },
        [url, defaultOptions]
    );

    // Automatically trigger fetch if autoFetch is true

    useEffect(() => {
        if (autoFetch || fetchTrigger > 0) {
            void fetchData();
        }
    }, [autoFetch, fetchData, fetchTrigger]);

    const triggerFetch = () => setFetchTrigger((prev) => prev + 1);

    return [fetchData, { data, loading, error }, triggerFetch];
}
