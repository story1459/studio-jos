import { t, type Lang } from "@/data/site";
import { Wordmark } from "./Logo";

export default function Footer({ lang }: { lang: Lang }) {
  const d = t[lang];

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <Wordmark id="footer" className="footer__logo" title={d.name} />
        <p className="footer__meta">
          {d.footer.address} &nbsp;·&nbsp; {d.footer.biz}
        </p>
        <p className="footer__copy">
          © {new Date().getFullYear()} Studio JOS. {d.footer.rights}
        </p>
      </div>
    </footer>
  );
}
