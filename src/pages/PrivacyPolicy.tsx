import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-zinc-800 dark:text-zinc-200">
      <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        Your privacy is important to us. This application does not collect,
        store, or share any personal information. All JSON content you input
        remains on your device and is not transmitted to any server.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">1. Local Data Usage</h2>
      <p className="mb-4">
        All processing happens locally in your browser. We do not store or
        transmit your data. This means your JSON content remains private unless
        you manually share or export it.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        2. Analytics and Advertising
      </h2>
      <p className="mb-4">
        This app may use third-party services such as Google AdSense or Google
        Analytics to display ads and collect anonymized usage data. These
        services may use cookies or device identifiers to personalize ads and
        measure traffic.
      </p>
      <p className="mb-4">
        Google may collect and use data in accordance with its{" "}
        <a
          href="https://policies.google.com/privacy"
          className="underline text-blue-600 dark:text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          className="underline text-blue-600 dark:text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        .
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">3. Cookies</h2>
      <p className="mb-4">
        Some third-party providers may use cookies to serve ads and track
        aggregated data. You can control cookie preferences through your browser
        settings.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">4. Children’s Privacy</h2>
      <p className="mb-4">
        This app is not intended for use by children under the age of 13. We do
        not knowingly collect personal information from children.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        5. Changes to this Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page.
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

export default PrivacyPolicy;
