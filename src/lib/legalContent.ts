export type LegalDocId = 'terms' | 'privacy';

export const legalDocuments: Record<
  LegalDocId,
  { title: string; updated: string; sections: Array<{ heading: string; body: string }> }
> = {
  terms: {
    title: 'Terms of Service',
    updated: '24 October 2026',
    sections: [
      {
        heading: 'Service',
        body: 'Autoconnecto provides a cloud IoT platform (device connectivity, dashboards, telemetry, alarms, and related features). Plans and usage limits are described on the Pricing page and in plan details.',
      },
      {
        heading: 'Accounts',
        body: 'You are responsible for safeguarding login credentials and for activity under your workspace. You must provide accurate registration information.',
      },
      {
        heading: 'Acceptable use',
        body: 'Do not misuse the platform (illegal content, abuse of APIs, attempts to bypass plan limits, or interference with other customers). We may suspend access for violations.',
      },
      {
        heading: 'Who operates the service',
        body: 'Autoconnecto is operated by its founder from Jaipur, India. A registered company name and GSTIN will be shown here when they exist. GST is not registered yet, so no GST number is shown.',
      },
      {
        heading: 'Paid plans',
        body: 'Paid subscriptions are billed through Dodo Payments. By subscribing you authorise recurring charges for the selected plan and billing period until you cancel.',
      },
      {
        heading: 'Refunds',
        body: 'You can cancel a paid plan before the next renewal and you will not be charged again. Fees already paid for the current period are not refunded, except where Indian law requires a refund.',
      },
      {
        heading: 'Governing law',
        body: 'These terms are governed by the laws of India. The courts at Jaipur, Rajasthan have jurisdiction.',
      },
      {
        heading: 'Limitation of liability',
        body: 'The service is provided as available. To the extent permitted by law, our liability is limited to fees paid by you in the twelve months before the claim.',
      },
      {
        heading: 'Contact',
        body: 'Questions: founder@autoconnecto.in · Autoconnecto, Villa-71, Galaxy Enclave, Mahindra SEZ Road, Kalwara, Jaipur – 302037, India.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: '24 October 2026',
    sections: [
      {
        heading: 'Data we process',
        body: 'Account data (name, email), workspace and device metadata, telemetry you send, billing status, and support communications.',
      },
      {
        heading: 'Processors',
        body: 'The API and the stored files run in AWS ap-south-1 (Mumbai). The public sites are served by CloudFront, whose edge locations are not all in India. Amazon Cognito (sign-in), Dodo Payments (billing), and Brevo (email) process data in those vendors’ regions. “Built in India” describes the product and the plans in rupees. It does not mean every processor is inside India.',
      },
      {
        heading: 'Retention',
        body: 'Telemetry and logs are retained according to your plan limits. You may request deletion of your account subject to legal and billing record requirements.',
      },
      {
        heading: 'Your rights',
        body: 'You may access, correct, or request deletion of personal data by contacting us. Indian users may exercise rights under applicable law.',
      },
      {
        heading: 'Contact',
        body: 'Privacy requests: founder@autoconnecto.in. The operator is the founder of Autoconnecto, Jaipur. Correspondence address: Villa-71, Galaxy Enclave, Mahindra SEZ Road, Kalwara, Jaipur 302037, India. GST is not registered yet.',
      },
    ],
  },
};
