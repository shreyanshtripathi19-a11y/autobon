import PageHeader from "@/components/PageHeader";
import React from "react";

const Disclaimer = () => {
  return (
    <div className=" w-full min-h-[80vh] md:max-w-3/4 px-4 md:px-0 md:mx-auto">
      <div className="py-8 md:py-12">
        <PageHeader
          header={"Disclaimer"}
          info={"Last Updated: [Insert Date]"}
        />
        <div className="text-gray-500 my-4 text-xs md:text-sm flex flex-col gap-y-4">
          <p>
            The information provided on the AUTOBON website and through its
            platform is for general informational purposes only. By accessing or
            using AUTOBON’s website, services, or communications, you
            acknowledge and agree to the disclaimers set out below.
          </p>
          <h3 className="font-medium text-black text-base">
            1. No Professional Advice
          </h3>
          <p>
            AUTOBON does not provide legal, financial, credit, tax, insurance,
            or professional advice.
          </p>
          <p>
            All content, listings, estimates, calculators, comparisons, and
            communications provided by AUTOBON are informational only and should
            not be relied upon as a substitute for professional advice from
            qualified advisors.
          </p>
          <p>
            You are solely responsible for obtaining independent advice before
            making any financial, legal, or purchasing decisions.
          </p>
          <h3 className="font-medium text-black text-base">
            2. No Guarantee of Accuracy
          </h3>
          <p>
            While AUTOBON strives to provide accurate and up-to-date
            information, we make no representations or warranties regarding the
            accuracy, completeness, reliability, or timeliness of any content on
            the website.
          </p>
          <p>
            Information such as vehicle details, pricing, availability,
            specifications, financing estimates, and third-party data may change
            without notice and may contain errors or omissions.
          </p>
          <h3 className="font-medium text-black text-base">
            3. Vehicle Listings & Availability
          </h3>
          <p>
            Vehicle listings are provided for reference only. Availability is
            not guaranteed. Images may be representative and not exact. Final
            pricing and condition are determined by the seller or dealer.
          </p>
          <p>
            AUTOBON does not guarantee that any vehicle displayed will be
            available at the stated price or terms.
          </p>
          <h3 className="font-medium text-black text-base">
            4. Financing & Credit Disclaimer
          </h3>
          <p>
            Any financing, loan, or credit-related information provided through
            AUTOBON:
          </p>
          <ul className="list-disc px-5">
            <li>Does not constitute a loan offer or approval.</li>
            <li>Is subject to lender review and approval.</li>
            <li>May vary based on creditworthiness and lender policies.</li>
          </ul>
          <p>
            AUTOBON does not control credit decisions, interest rates, fees, or
            repayment terms.
          </p>
          <h3 className="font-medium text-black text-base">
            5. Third-Party Services & Referrals
          </h3>
          <p>
            AUTOBON may refer users to independent third-party businesses,
            including dealers, lenders, insurers, or service providers. AUTOBON:
          </p>
          <ul className="list-disc px-5">
            <li>Does not endorse third-party products or services.</li>
            <li>
              Is not responsible for third-party actions, terms, or outcomes.
            </li>
            <li>Is not a party to third-party transactions.</li>
          </ul>
          <p>
            Your dealings with third parties are solely between you and the
            third party.
          </p>
          <h3 className="font-medium text-black text-base">
            6. No Guarantees or Warranties
          </h3>
          <p>
            To the maximum extent permitted by law, AUTOBON provides its website
            and services “as is” and “as available”, without warranties of any
            kind, express or implied, including but not limited to:
          </p>
          <ul className="list-disc px-5">
            <li>Fitness for a particular purpose</li>
            <li>Merchantability</li>
            <li>Non-infringement</li>
            <li>Availability or uninterrupted service.</li>
          </ul>
          <h3 className="font-medium text-black text-base">
            7. Limitation of Liability
          </h3>
          <p>
            AUTOBON shall not be liable for any direct, indirect, incidental,
            consequential, or punitive damages arising from or related to:
          </p>
          <ul className="list-disc px-5">
            <li>Use or inability to use the website or services</li>
            <li>Reliance on information provided</li>
            <li>Third-party products or services</li>
            <li>Errors, delays, or omissions</li>
          </ul>
          <p>Your sole remedy is to discontinue use of the platform.</p>
          <h3 className="font-medium text-black text-base">
            8. External Links Disclaimer
          </h3>
          <p>
            The AUTOBON website may contain links to external websites operated
            by third parties. AUTOBON does not control and is not responsible
            for the content, security, or privacy practices of those sites.
          </p>
          <p>Accessing external links is at your own risk.</p>
          <h3 className="font-medium text-black text-base">
            9. Changes to This Disclaimer
          </h3>
          <p>
            AUTOBON may update this Disclaimer at any time. Updates will be
            posted on this page with a revised “Last Updated” date. Continued
            use of the website constitutes acceptance of the updated Disclaimer.
          </p>
          <h3 className="font-medium text-black text-base">
            10. Contact Information
          </h3>
          <p>
            If you have questions regarding this Disclaimer, please contact:
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

export default Disclaimer;
