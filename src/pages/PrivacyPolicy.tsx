import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-semibold tracking-wide text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none text-foreground space-y-8">
          <p className="text-lg leading-relaxed">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold tracking-wide text-primary mb-4">
              Information We Collect
            </h2>
            <p className="leading-relaxed mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              participate in our community, or contact us for support.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Account information (email address, name)</li>
              <li>Profile information you choose to provide</li>
              <li>Community participation data</li>
              <li>Communications with our community</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-wide text-primary mb-4">
              How We Use Your Information
            </h2>
            <p className="leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and maintain our community platform</li>
              <li>Send you updates about events and community activities</li>
              <li>Respond to your questions and provide support</li>
              <li>Improve our services and community experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-wide text-primary mb-4">
              Information Sharing
            </h2>
            <p className="leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy. We may share information in 
              the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>In connection with a business transfer</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-wide text-primary mb-4">
              Data Security
            </h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-wide text-primary mb-4">
              Your Rights
            </h2>
            <p className="leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-wide text-primary mb-4">
              Cookies
            </h2>
            <p className="leading-relaxed">
              We use cookies and similar technologies to enhance your experience on our platform. 
              You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-wide text-primary mb-4">
              Contact Us
            </h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p><strong>Email:</strong> privacy@nysa.earth</p>
              <p><strong>Jurisdiction:</strong> Republic of Cyprus</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-wide text-primary mb-4">
              Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
