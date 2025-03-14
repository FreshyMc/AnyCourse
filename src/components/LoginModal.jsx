export default function LoginModal() {
    return (
        <dialog className="auth-dialog" open>
            <button className="btn close-btn">
                <i class="fa-solid fa-xmark" />
            </button>
            <div className="content">
                <h2 className="mb-4">Sign In</h2>
                <form>
                    <input type="email" name="email" placeholder="Email" className="form-control mb-3" />
                    <input type="password" name="password" placeholder="Password" className="form-control mb-3" />
                    <button type="submit" className="btn auth-btn">Login</button>
                </form>
            </div>
        </dialog>
    );
}