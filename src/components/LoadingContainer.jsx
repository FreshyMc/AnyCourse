export default function LoadingContainer({ loading, children }) {
    return loading ? (
        <div className="loading-container d-flex justify-content-center align-items-center p-4">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    ) : children;
}