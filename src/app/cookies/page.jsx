import PageHeader from "@/components/PageHeader";
import React from "react";

const CookiePolicy = () => {
  return (
    <div className=" w-full min-h-[80vh] md:max-w-3/4 px-4 md:px-0 md:mx-auto">
      <div className="py-8 md:py-12">
        <PageHeader
          header={"Cookie Policy"}
          info={"Last Updated: [Insert Date]"}
        />
        <div className="text-gray-500 my-4 text-xs md:text-sm flex flex-col gap-y-4">
          <p>
            This Cookie Policy explains how AUTOBON (“AUTOBON”, “we”, “us”, or
            “our”) uses cookies and similar technologies when you visit our
            website or use our online services.
          </p>
          <p>
            This Cookie Policy should be read together with our Privacy Policy.
          </p>
          <h3 className="font-medium text-black text-base">
            1. What Are Cookies?
          </h3>
          <p>
            Cookies are small text files stored on your device (computer,
            mobile, or tablet) when you visit a website. Cookies help websites
            function efficiently, remember user preferences, and improve user
            experience.
          </p>
          <p>Cookies may be:</p>
          <ul className="list-disc px-5">
            <li>Session cookies: deleted when you close your browser.</li>
            <li>
              Persistent cookies: stored for a defined period or until deleted.
            </li>
          </ul>
          <h3 className="font-medium text-black text-base">
            2. Why AUTOBON Uses Cookies
          </h3>
          <p>AUTOBON uses cookies and similar technologies to:</p>
          <ul className="list-disc px-5">
            <li>Enable essential website functionality.</li>
            <li>Improve website performance and usability.</li>
            <li>Understand how users interact with the website.</li>
            <li>Remember user preferences.</li>
            <li>Enhance security and prevent fraud.</li>
            <li>
              Support marketing, analytics, and advertising (where applicable).
            </li>
          </ul>
          <h3 className="font-medium text-black text-base">
            3. Types of Cookies We Use
          </h3>
          <h4 className="text-black font-semibold">
            (a) Strictly Necessary Cookies
          </h4>
          <p>
            These cookies are essential for the website to function properly.
            They enable core features such as:
          </p>
          <ul className="list-disc px-5">
            <li>Page navigation</li>
            <li>Secure access to areas of the website</li>
            <li>Account login and session management</li>
          </ul>
          <p>Without these cookies, the website may not function correctly.</p>
          <h4 className="text-black font-semibold">
            (b) Performance & Analytics Cookies
          </h4>
          <p>
            These cookies help us understand how visitors use our website by
            collecting information such as:
          </p>
          <ul className="list-disc px-5">
            <li>Pages visited</li>
            <li>Time spent on the site</li>
            <li>Errors encountered</li>
          </ul>
          <p>
            This data is aggregated and anonymized where possible and is used to
            improve website performance.
          </p>
          <h4 className="text-black font-semibold">(c) Functional Cookies</h4>
          <p>
            Functional cookies allow the website to remember choices you make,
            such as:
          </p>
          <ul className="list-disc px-5">
            <li>Language preferences</li>
            <li>Region or location</li>
            <li>Saved settings</li>
          </ul>
          <p>These cookies improve personalisation and user experience.</p>
          <h4 className="text-black font-semibold">
            (d) Advertising & Targeting Cookies
          </h4>
          <p>These cookies may be used to:</p>
          <ul className="list-disc px-5">
            <li>Deliver relevant advertisements</li>
            <li>Measure advertising effectiveness</li>
            <li>Limit the number of times you see an ad</li>
          </ul>
          <p>
            Advertising cookies may be set by AUTOBON or by third-party
            advertising partners.
          </p>
          <h3 className="font-medium text-black text-base">
            4. Third-Party Cookies
          </h3>
          <p>
            AUTOBON may allow third-party service providers to place cookies on
            your device to provide services such as:
          </p>
          <ul className="list-disc px-5">
            <li>Website analytics</li>
            <li>Advertising and remarketing</li>
            <li>Fraud prevention</li>
            <li>Performance monitoring</li>
          </ul>
          <p>
            These third parties may collect information in accordance with their
            own privacy policies. AUTOBON does not control third-party cookies.
          </p>
          <h3 className="font-medium text-black text-base">
            5. Managing and Disabling Cookies
          </h3>
          <p>
            You can manage or disable cookies through your browser settings.
            Most browsers allow you to:
          </p>
          <ul className="list-disc px-5">
            <li>View cookies stored on your device</li>
            <li>Delete cookies</li>
            <li>Block cookies from specific websites</li>
            <li>Block all cookies</li>
          </ul>
          <p>
            Please note that disabling certain cookies may affect website
            functionality and user experience.
          </p>
          <h3 className="font-medium text-black text-base">
            6. Cookie Consent
          </h3>
          <p>
            When required by law, AUTOBON will display a cookie consent banner
            allowing you to:
          </p>
          <ul className="list-disc px-5">
            <li>Accept all cookies</li>
            <li>Reject non-essential cookies</li>
            <li>Customize cookie preferences</li>
          </ul>
          <p>
            Your consent preferences may be stored in a cookie for future
            visits.
          </p>
          <h3 className="font-medium text-black text-base">
            7. Updates to This Cookie Policy
          </h3>
          <p>
            AUTOBON may update this Cookie Policy from time to time to reflect
            changes in technology, law, or business practices. Any updates will
            be posted on this page with a revised “Last Updated” date.
          </p>
          <h3 className="font-medium text-black text-base">
            8. Contact Information
          </h3>
          <p>
            If you have any questions about this Cookie Policy or how we use
            cookies, please contact:
            <br />
            AUTOBON Support
            <br />
            Email: support@autobon.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
