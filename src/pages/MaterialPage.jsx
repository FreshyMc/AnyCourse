import { useParams } from "react-router";
import Footer from "../components/Footer";

export default function MaterialPage() {
    const { id } = useParams();

    return (
        <>
            <main className="row">
                <h2>This is the Material Page for {id}</h2>
            </main>
            <Footer />
        </>
    );
}