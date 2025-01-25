import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                "http://localhost:8080/questions",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );

            const data = await response.json();

            console.log(data);
        }

        fetchData();
    }, []);

    return (
        <section className="flex flex-col items-center">
            <article>
                <h1>Welcome To Open Mat</h1>
                <p>
                    The Q&A platform for martial arts and their
                    practitioners
                </p>
            </article>
        </section>
    );
}
