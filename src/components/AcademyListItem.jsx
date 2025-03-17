export default function AcademyListItem() {
    return (
        <div className="academy">
            <div className="academy-thumbnail">
                <h3>Academy name Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, odio.</h3>
            </div>
            <div className="academy-bottom">
                <div className="d-flex px-4 py-3">
                    <div className="lecturer">
                        <img src="./vite.svg" alt="Lecturer" />
                        <span>Tseko</span>
                    </div>
                    <div className="actions">
                        <button className="btn follow-btn">
                            <span>Follow Academy</span>
                            <i className="fa-solid fa-plus" />
                        </button>
                    </div>
                </div>
                <div className="academy-description">
                    <h4 className="m-0">Description</h4>
                    <p className="m-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, dolore.
                    </p>
                </div>
            </div>
        </div>
    );
}