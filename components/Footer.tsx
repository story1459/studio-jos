import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <p className="footer__logo">{site.nameEn}</p>
        <p className="footer__meta">
          {site.address} &nbsp;·&nbsp; 사업자등록번호 {site.bizNumber}
        </p>
        <p className="footer__copy">
          © {new Date().getFullYear()} Studio JOS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
