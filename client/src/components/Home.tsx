import Questions from "./Questions";

export default function Home() {
    return (
        <section className="flex flex-col items-center gap-6">
            <h1 className="text-4xl">Welcome To OpenMat</h1>

            <article>
                <Questions />
            </article>
        </section>
    );
}
