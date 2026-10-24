export default function Navbar() {
  return (
    <header className="navbar flex items-center justify-between">
      <div className="navbar-left flex items-center gap-3">
        <a href="#" className="logo">
          <span className="logo-text">AIRA</span>
        </a>
      </div>

      <div className="navbar-actions flex items-center gap-2">
        <a href="#" className="back-link">
          &larr; Kembali ke Panggung
        </a>
      </div>
    </header>
  );
}
