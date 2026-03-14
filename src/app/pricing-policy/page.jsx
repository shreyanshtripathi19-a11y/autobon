import PageHeader from "@/components/PageHeader";
import React from "react";

const PricingPolicy = () => {
  return (
    <div className=" w-full min-h-[80vh] md:max-w-3/4 px-4 md:px-0 md:mx-auto">
      <div className="py-8 md:py-12">
        <PageHeader
          header={"Pricing & Fees Transparency Policy"}
          info={"Last Updated: [Insert Date]"}
        />
        <div className="text-gray-500 my-4 text-xs md:text-sm flex flex-col gap-y-4">
          <p>
            At AUTOBON, transparency is important to us. This Pricing & Fees
            Transparency Policy explains how pricing, fees, and third-party
            charges may apply when you use our website, platform, or services.
          </p>
          <p>
            This page is intended to help users clearly understand what AUTOBON
            charges, what AUTOBON does not control, and where additional costs
            may arise.
          </p>
          <h3 className="font-medium text-black text-base">
            1. General Pricing Information
          </h3>
          <p>
            AUTOBON operates as a digital automotive platform that may provide:
          </p>
          <ul className="list-disc px-5">
            <li>Vehicle listings</li>
            <li>Lead generation and referrals</li>
            <li>Financing assistance</li>
            <li>Platform tools and administrative services</li>
          </ul>
          <p>
            Prices, fees, and availability displayed on the website are
            informational only and may change without notice. All prices are
            shown in [insert currency], unless otherwise stated.
          </p>
          <h3 className="font-medium text-black text-base">
            2. AUTOBON Service Fees
          </h3>
          <p>
            AUTOBON may charge fees for certain services, which may include but
            are not limited to:
          </p>
          <ul className="list-disc px-5">
            <li>Platform or processing fees</li>
            <li>Booking or reservation fees</li>
            <li>Administrative or documentation fees</li>
            <li>Subscription or premium service fees (if applicable)</li>
          </ul>
          <p>
            Any applicable AUTOBON fee will be clearly disclosed before you are
            asked to make a payment.
          </p>
          <h3 className="font-medium text-black text-base">
            3. Fees Not Controlled by AUTOBON
          </h3>
          <p>
            AUTOBON does not control and is not responsible for fees charged by
            third parties, including but not limited to:
          </p>
          <ul className="list-disc px-5">
            <li>Vehicle dealers or sellers</li>
            <li>Lenders or financial institutions</li>
            <li>Insurance providers</li>
            <li>Government authorities (taxes, registration, licensing)</li>
            <li>Logistics, delivery, or inspection providers</li>
          </ul>
          <p>
            These fees are set independently by third parties and may change at
            their discretion.
          </p>
          <h3 className="font-medium text-black text-base">
            4. Taxes and Government Charges
          </h3>
          <p>
            Users are responsible for all applicable taxes, duties, levies, and
            statutory charges, including but not limited to:
          </p>
          <ul className="list-disc px-5">
            <li>Sales tax / VAT / GST</li>
            <li>Registration and licensing fees</li>
            <li>Transfer or ownership fees</li>
          </ul>
          <p>
            AUTOBON does not guarantee the accuracy of tax calculations provided
            by third parties.
          </p>
          <h3 className="font-medium text-black text-base">
            5. Vehicle Pricing Disclaimer
          </h3>
          <p>
            Vehicle prices displayed may be estimates. Availability is not
            guaranteed. Final pricing is determined by the seller or dealer.
            Images and descriptions are for reference only.
          </p>
          <p>
            AUTOBON does not guarantee that any listed vehicle will be available
            at the displayed price.
          </p>
          <h3 className="font-medium text-black text-base">
            6. Financing & Loan-Related Costs
          </h3>
          <p>If AUTOBON refers you to a lender or financing partner:</p>
          <ul className="list-disc px-5">
            <li>Loan approval is not guaranteed.</li>
            <li>
              Interest rates, EMIs, and fees are determined solely by the
              lender.
            </li>
            <li>AUTOBON does not control credit decisions.</li>
          </ul>
          <p>
            All financing terms are subject to the lender’s independent review
            and agreement.
          </p>
          <h3 className="font-medium text-black text-base">
            7. Refunds and Fee Reversals
          </h3>
          <p>
            Refund eligibility (if any) is governed by AUTOBON’s Refund &
            Cancellation Policy and applicable third-party policies. Certain
            fees may be non-refundable, including processing or administrative
            fees, unless required by law
          </p>
          <h3 className="font-medium text-black text-base">
            8. Errors and Corrections
          </h3>
          <p>
            AUTOBON reserves the right to correct any pricing errors,
            inaccuracies, or omissions at any time, including after a
            transaction has been initiated.
          </p>
          <p>
            If a material pricing error occurs, you will be provided an
            opportunity to cancel the transaction where required by law.
          </p>
          <h3 className="font-medium text-black text-base">
            9. No Hidden Fees Commitment
          </h3>
          <p>
            AUTOBON does not intentionally add hidden charges. If you believe a
            fee has been applied incorrectly, please contact our support team
            for clarification.
          </p>
          <h3 className="font-medium text-black text-base">
            10. Changes to This Policy
          </h3>
          <p>
            AUTOBON may update this Pricing & Fees Transparency Policy from time
            to time. Updates will be posted on this page with a revised “Last
            Updated” date.
          </p>
          <p>
            Continued use of the platform constitutes acceptance of the updated
            policy.
          </p>
          <h3 className="font-medium text-black text-base">
            11. Contact Information
          </h3>
          <p>
            For questions regarding pricing or fees, please contact:
            <br />
            AUTOBON Support
            <br />
            Email: support@autobon.com
            <br />
            Address: [Insert Company Address]
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPolicy;
