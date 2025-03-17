import AcademyList from "../components/AcademyList";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function LandingPage() {
    return (
        <>
            <Header />
            <section className="row">
                <div className="col-12 academy-list-outer-wrapper">
                    <h2 className="section-title">Featured Academies</h2>
                    <AcademyList />
                </div>
            </section>
            <Footer />
        </>
    );
}