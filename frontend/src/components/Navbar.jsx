export default function Navbar({ authUser = null, onLogout = null }) {
  return (
    <header className="navbar flex items-center justify-between">
      <div className="navbar-left flex items-center gap-3">
        <a href="#" className="logo">
          <span className="logo-text">AIRA</span>
        </a>
      </div>

      <div className="navbar-actions flex items-center gap-3">
        {authUser && (
          <span
            className="text-xs px-2.5 py-1 rounded-full border bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
            title={authUser.email}
          >
            {authUser.name}
          </span>
        )}
        {authUser && onLogout ? (
          <button
            type="button"
            className="back-link cursor-pointer"
            onClick={onLogout}
          >
            Keluar
          </button>
        ) : (
          <a href="#" className="back-link">
            &larr; Kembali ke Panggung
          </a>
        )}
      </div>
    </header>
  );
}
