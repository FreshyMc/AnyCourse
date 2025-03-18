import AcademyList from "./AcademyList";

export default function AcademySection() {
    return (
        <section className="row">
            <div className="col-12 academy-list-outer-wrapper">
                <h2 className="section-title">Featured Academies</h2>
                <AcademyList />
            </div>
        </section>
    );
}