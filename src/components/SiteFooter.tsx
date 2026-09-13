import { Link } from "react-router-dom";
import { FOOTER_COLUMNS, SITE } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <div className="brand">
              <span className="brand__mark" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3.4 4.6h5.2M3.4 4.6v5.2M16.6 15.4h-5.2M16.6 15.4v-5.2M4 16 16 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="brand__name">
                OpenUI<span> 中文站</span>
              </span>
            </div>
            <p className="footer__list" style={{ maxWidth: "34ch" }}>
              非官方中文站点，内容译自 OpenUI 官方仓库 README、文档与基准测试。
              所有示例界面由 OpenUI 官方的 <span className="mono">openuiLibrary</span> 在浏览器里实时渲染。
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="footer__h">{col.title}</div>
              <div className="footer__list">
                {col.links.map((link) =>
                  link.external ? (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.label} to={link.href}>
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="footer__note">
          <span>OpenUI · 生成式 UI 的开放标准</span>
          <span>MIT License</span>
          <span>
            重要提示：OpenUI 没有官方的加密货币、代币或硬币。任何使用 OpenUI 名称的资产均与本项目无关。
          </span>
          <span style={{ marginLeft: "auto" }}>
            <a className="link" href={SITE.repo} target="_blank" rel="noreferrer">
              官方仓库
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
