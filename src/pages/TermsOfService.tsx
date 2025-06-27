import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-zinc-800 dark:text-zinc-200">
      <h1 className="text-2xl font-semibold mb-4">Terms of Service</h1>

      <p className="mb-4">
        By using this application, you agree to the following terms and
        conditions. If you do not agree with these terms, please do not use the
        app.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">1. Use of the App</h2>
      <p className="mb-4">
        This app is provided "as is" without any warranties. You use it at your
        own risk. You agree not to misuse the app, including but not limited to
        attempting to disrupt or interfere with its functionality or security.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">2. Content Ownership</h2>
      <p className="mb-4">
        All content entered into this app (e.g., JSON data) remains your
        property. We do not store, share, or use your content in any way.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        3. Data Privacy & Storage
      </h2>
      <p className="mb-4">
        This app does not collect or store personal data. However, it may use
        third-party services such as Google AdSense or Google Analytics, which
        may collect anonymized data for advertising or analytics purposes.
        Please refer to our{" "}
        <a
          href="/privacy-policy"
          className="underline text-blue-600 dark:text-blue-400"
        >
          Privacy Policy
        </a>{" "}
        for more information.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        4. Ads and Third-Party Services
      </h2>
      <p className="mb-4">
        This app may display ads served by Google AdSense or similar third-party
        services. These ads help keep the app free. We are not responsible for
        the content or accuracy of any ads shown.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        5. Limitation of Liability
      </h2>
      <p className="mb-4">
        Under no circumstances shall the app developer be liable for any direct,
        indirect, incidental, or consequential damages arising from the use of
        this app.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">6. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms of Service at any time. Continued use of the
        app indicates your acceptance of the current terms.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">7. Contact</h2>
      <p>
        If you have questions about these terms, you can contact us at{" "}
        <a
          href="mailto:waiphyo.dev@gmail.com"
          className="underline text-blue-600 dark:text-blue-400"
        >
          waiphyo.dev@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default TermsOfService;
