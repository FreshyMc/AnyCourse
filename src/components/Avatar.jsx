export default function Avatar({src, username}) {
    return (
        src ? <img src={src} alt="Lecturer" /> : <p className="text-avatar m-0">{username.slice(0, 1)}</p>
    );
}