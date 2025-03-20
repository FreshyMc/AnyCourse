export default function EditPasswordForm() {
    //TODO edit password functionality
    
    return (
        <form>
            <input type="password" name="password" placeholder="Current Password" className="form-control mb-3" />
            <input type="password" name="newPassword" placeholder="New Password" className="form-control mb-3" />
            <input type="password" name="confirmNewPassword" placeholder="Confirm new Password" className="form-control mb-3" />
            <button type="submit" className="btn auth-btn">Change Password</button>
        </form>
    );
}