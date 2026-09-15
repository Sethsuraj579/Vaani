export function TrustRow() {
  return (
    <div className="trust anim" style={{ '--d': '0.05s' }}>
      <span className="avatar a1" aria-hidden="true">
        <i className="fa-brands fa-microsoft" />
      </span>
      <span className="avatar a2" aria-hidden="true">
        <i className="fa-brands fa-amazon" />
      </span>
      <span className="avatar a3" aria-hidden="true">
        <i className="fa-brands fa-google" />
      </span>
      <span className="trust-pill">Trusted by Security Teams</span>
    </div>
  )
}
