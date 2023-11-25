import { DateTime } from "luxon";

export default function Home() {
    const date = DateTime.now().plus({ days: 3 }).toLocal();
    console.log(date);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>hello </h1>
        </main>
    );
}
