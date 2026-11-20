import { Link } from 'react-router-dom';
import './Section.css';

function Section({ title, titleAlign = 'left', link, children }) {
  const isExternal = link?.href?.startsWith('http');

  return (
    <section className="page-section">
      <div className={`section-header section-header--${titleAlign}`}>
        <h2 className="section-title">{title}</h2>

        {link && (
          isExternal ? (
            <a
              href={link.href}
              className="section-link"
              target="_blank"
              rel="noreferrer"
            >
              {link.text} →
            </a>
          ) : (
            <Link to={link.href} className="section-link">
              {link.text} →
            </Link>
          )
        )}
      </div>

      <div className="section-body">{children}</div>
    </section>
  );
}

export default Section;
