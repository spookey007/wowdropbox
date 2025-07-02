import React from "react";
import Logo from "../../assets/Header/main-logo.png";
import "./Footer.css";
import Support from "../../assets/Footer/support.png";
import { InstagramIcon, TiktokIcon } from "../../utils/SvgIcons"; // Adjust the import path as necessary
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const FooterLinks = [
    {
      label: "Information",
      links: [
        { name: "FAQ", url: "/faq" },
        { name: "Contact us", url: "/contact" },
        { name: "Provably Fair", url: "/provably-fair" },
        { name: "Shipping & Refund", url: "/shipping-refund" },
        { name: "Feedback", url: "/feedback" },
        { name: "Winners & social proof", url: "/winners" },
      ],
    },

    {
      label: "Legal",
      links: [
        { name: "Terms of Service", url: "/terms-of-service" },
        { name: "Privacy Policy", url: "/privacy-policy" },
        { name: "Cookie Policy", url: "/cookie-policy" },
        { name: "Return Policy", url: "/return-policy" },
      ],
    },

    {
      label: "Social",
      links: [
        { name: "Instagram", url: "", icon: <InstagramIcon /> },
        { name: "Tiktok", url: "", icon: <TiktokIcon /> },
      ],
    },
  ];

  return (
    <footer className="w-full px-2 pt-4 pb-2 footer" style={{ fontFamily: '"Press Start 2P", monospace' }}>
      <div className="max-w-7xl mx-auto flex md:flex-row flex-col footer-content justify-between md:gap-12 gap-0 ">
        <div className="flex flex-col items-center md:items-start">
          <img src={Logo} alt="Logo" className="logo-main" style={{ width: 72, marginBottom: 10 }} />
        </div>
        <div className="md:pl-6 pl-0 w-full">
          <div className="flex sm:gap-4 gap-1 footer-links justify-between mt-6">
            {FooterLinks.map((section, index) => (
              <div key={index} className="footer-section">
                <h2 style={{ fontSize: 12, marginBottom: 6 }}>{t(`footer.${section.label}`)}</h2>
                <ul>
                  {section.links.map((link, index) => (
                    <Link key={index} to={link.url} style={{ fontSize: 11, padding: 0, margin: 0 }}>
                      {link.icon}
                      <span href={link.url}>{t(`footer.${link.name}`)}</span>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center max-w-[1280px] mx-auto pt-1 mt-2 border-t border-[#cccccc6b]">
        <span className="text-[var(--secondary-text)] text-[9px]" style={{ fontFamily: 'inherit', fontSize: 9 }}>
          © 2025 - WOW! Dropbox - {t("footer.copyright")}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
