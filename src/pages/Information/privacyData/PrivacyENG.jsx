import BackButton from "../../../components/Generic/BackButton/BackButton";

const PrivacyENG = () => {
  return (
    <div>
      <BackButton pageTitle={"Privacy Policy"} />

      <h2>General Provisions and User Consent</h2>
      <p>
        This Privacy Policy (hereinafter, the "<strong>Policy</strong>")
        describes the procedure for processing and protecting the personal data
        of users of the <strong>wow!dropbox</strong> website (located at{" "}
        <a
          href="https://www.wowdropbox.eu"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.wowdropbox.eu
        </a>
        , hereinafter, the "<strong>Site</strong>"). The operator of the
        personal data collected through the Site is{" "}
        <strong>whalepartners OÜ</strong> (Registration Code:{" "}
        <strong>14674044</strong>, VAT: <strong>EE102141508</strong>),
        registered at Estonia, Harju County, Tallinn, Tornimäe St. 5, 10145
        (hereinafter, the "<strong>Company</strong>").
      </p>
      <p>
        By using the Site and providing their personal data, a user
        (hereinafter, the "<strong>User</strong>") confirms their consent to the
        terms of this Policy. If the User does not agree to any of the terms of
        the Policy, they must refrain from using the Site. Continued use of the
        Site will be regarded as the User’s consent to the processing of their
        personal data in accordance with this Policy.
      </p>
      <p>
        The Company reserves the right to amend this Policy. If changes are
        made, the updated version will be published on the Site with the
        effective date.
      </p>

      <h2>Data Collection</h2>
      <p>
        The Company does not specifically collect any{" "}
        <strong>special categories</strong> of personal data (such as race,
        ethnicity, political views, health status, etc.). All data processed are
        provided directly by the User or collected automatically when using the
        Site.
      </p>

      <h2>Account Registration and Google Sign‑In</h2>
      <p>
        Users may create an account by providing a valid email address and
        password; additional optional info (name, phone, delivery address) can
        be supplied. Alternatively, Google Sign‑In may be used—if chosen, the
        Company receives the User’s name, email address, and other data allowed
        by their Google profile, used solely for registration and login
        purposes.
      </p>

      <h2>Cookies</h2>
      <p>
        The Site uses cookies and similar technologies to enhance functionality
        and user experience. Cookies may be persistent or session‑based.
        Categories include:
      </p>
      <ul>
        <li>
          <strong>Technical and functional cookies:</strong> necessary for
          essential Site functions (e.g. authentication, cart tracking).
        </li>
        <li>
          <strong>Analytical cookies:</strong> may collect aggregate usage
          statistics (see Analytics below).
        </li>
      </ul>
      <p>
        Users may disable or delete cookies via browser settings, but this may
        limit Site functionality. For help, consult your browser’s
        documentation.
      </p>

      <h2>Online Payments and Payment Systems</h2>
      <p>
        Payments are processed via <strong>Stripe</strong>. Payment credentials
        are entered on Stripe’s secure pages—Company only receives limited
        confirmation info (transaction status or card last digits). Future
        providers (e.g., PayPal) will operate under similar standards.
      </p>
      <p>
        For details, please refer to the privacy policy of the respective
        provider.
      </p>

      <h2>Data Storage and Protection</h2>
      <p>
        User data is stored on secure servers. The Company implements
        appropriate organizational and technical safeguards. Data access is
        restricted to authorized staff and trusted partners under
        confidentiality obligations. While we strive for high security, no
        system is infallible; in case of a breach, we will act per legal
        requirements.
      </p>

      <h2>Data Sharing with Third Parties</h2>
      <p>The Company does not sell or share User data, except as necessary:</p>
      <ul>
        <li>
          <strong>Payment providers:</strong> e.g. Stripe, providing payment
          data for transaction processing.
        </li>
        <li>
          <strong>Delivery services:</strong> shipping info shared with
          logistics providers.
        </li>
        <li>
          <strong>Service providers & contractors:</strong> limited data shared
          under confidentiality agreements to support Site operations.
        </li>
      </ul>

      <h2>Analytics</h2>
      <p>
        Currently, no third‑party analytics (e.g., Google Analytics) are used.
        If implemented in the future, data collection will be explained here and
        opt‑out methods provided.
      </p>

      <h2>User Rights</h2>
      <p>Under GDPR, Users have the right to:</p>
      <ul>
        <li>
          <strong>Access</strong> their personal data;
        </li>
        <li>
          <strong>Rectification</strong> of inaccurate data;
        </li>
        <li>
          <strong>Erasure</strong> ("right to be forgotten");
        </li>
        <li>
          <strong>Withdraw consent</strong> at any time;
        </li>
        <li>
          <strong>Restrict processing</strong> if accuracy is contested;
        </li>
        <li>
          <strong>Data portability</strong> in a machine‑readable format;
        </li>
        <li>
          <strong>File a complaint</strong> with data protection authorities.
        </li>
      </ul>
      <p>
        Requests can be sent to{" "}
        <a href="mailto:info@wowdropbox.eu">info@wowdropbox.eu</a>. We will
        respond within legally required timeframes (typically 30 days).
      </p>

      <h2>Data Retention</h2>
      <p>
        Data is retained only as long as necessary or required by law. Retention
        periods vary:
      </p>
      <ul>
        <li>
          <strong>Account data:</strong> kept during account activity,
          deleted/anonymized ~30 days post‑deletion.
        </li>
        <li>
          <strong>Order/payment data:</strong> retained for order fulfillment
          and legal obligations.
        </li>
      </ul>
      <p>
        Upon request, data is removed from active systems and future backups.
      </p>

      <h2>Contact Information</h2>
      <p>
        For inquiries related to this Policy or personal data processing,
        contact:
      </p>
      <p>
        <strong>Company:</strong> whalepartners OÜ
      </p>
      <p>
        <strong>Address:</strong> Estonia, Harju County, Tallinn, Tornimäe St.
        5, 10145
      </p>
      <p>
        <strong>Registration Code:</strong> 14674044
      </p>
      <p>
        <strong>VAT Number:</strong> EE102141508
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:info@wowdropbox.eu">info@wowdropbox.eu</a>
      </p>
    </div>
  );
};

export default PrivacyENG;
