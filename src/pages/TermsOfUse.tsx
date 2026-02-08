import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Terms of Use
          </h1>
          <p className="text-muted-foreground mb-8">
            Effective date: 10/16/2025
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              Welcome to Nysa.earth. These Terms of Use ("Terms") describe the rules and conditions that govern your access to and use of the Nysa website located at{" "}
              <a href="https://nysa.earth" className="text-primary hover:underline">
                https://nysa.earth
              </a>{" "}
              (the "Site"), membership in the Nysa community (the "Community"), receipt of emails from Nysa (including newsletters, event announcements, and notifications) and participation in Community events (online or in-person) ("Events"). By using the Site, creating an account, signing up for emails, accessing Community resources, RSVPing for or attending any Event, you agree to these Terms.
            </p>
            <p className="mb-8">
              If you do not agree to these Terms, do not use the Site, create an account, sign up for emails, or attend Events.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                1. Eligibility
              </h2>
              <p>
                The Site, Community, and Events are for persons aged 18 years or older only. By using the Site or attending Events you represent and warrant that you are at least 18 years old.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                2. Relationship to Privacy Policy
              </h2>
              <p>
                Our Privacy Policy explains how we collect and process personal data. By using the Site and signing up for emails you also agree to the terms of the Privacy Policy. The Privacy Policy is available at:{" "}
                <a href="/privacy-policy" className="text-primary hover:underline">
                  https://nysa.earth/privacy-policy
                </a>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                3. Account, Registration, and Communications
              </h2>
              <p className="mb-3">
                <strong>a.</strong> To join the Community you may be required to register and provide an email address. You are responsible for keeping your account details accurate and secure.
              </p>
              <p className="mb-3">
                <strong>b.</strong> By registering you consent to receiving email communications from Nysa (newsletters, event announcements, RSVP confirmations, and other notices). You can unsubscribe from emails using the self-service controls in the Email tab of your Nysa account dashboard; transactional or safety communications may still be sent.
              </p>
              <p>
                <strong>c.</strong> You are responsible for any activity that occurs under your account. Notify us promptly of any unauthorized use.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                4. Use of the Site and Community Rules
              </h2>
              <p className="mb-3">
                <strong>a.</strong> Use the Site lawfully and respectfully. Do not post or transmit content that is illegal, abusive, defamatory, harassing, discriminatory, or infringes the rights of others.
              </p>
              <p>
                <strong>b.</strong> Nysa may moderate, remove, or refuse content or membership at its discretion. Repeated or serious violations may result in suspension or termination.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                5. Events — Assumption of Risk and Release
              </h2>
              <p className="mb-3">
                <strong>a.</strong> Participation in Events is voluntary. Events may include physical activity, access to private land, travel, wine tasting, or other activities with inherent risks. You acknowledge that such activities can involve personal injury, property damage, illness, or other harm.
              </p>
              <p className="mb-3">
                <strong>b.</strong> Assumption of risk: By RSVPing for or attending an Event, you voluntarily assume all risks associated with participation, whether known or unknown, foreseeable or unforeseeable.
              </p>
              <p>
                <strong>c.</strong> Release: To the fullest extent permitted by law, you release, waive, and forever discharge Nysa.earth, its organizers, volunteers, members, officers, directors, employees, agents, contractors, and affiliates (collectively, "Nysa Parties") from any and all liabilities, claims, demands, actions, or causes of action arising out of or relating to your attendance at or participation in any Event, including claims for personal injury, death, property loss, or other damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                6. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless the Nysa Parties from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising from or related to: (a) your breach of these Terms; (b) your negligence, willful misconduct or unlawful acts at Events; (c) any content you post; or (d) your failure to comply with applicable laws or event rules.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                7. No Warranty; Limitation of Liability
              </h2>
              <p className="mb-3">
                <strong>a.</strong> The Site and all content and services are provided "as is" and "as available" without warranties of any kind, whether express or implied. Nysa disclaims all warranties to the extent permitted by law, including warranties of merchantability, fitness for a particular purpose, and noninfringement.
              </p>
              <p>
                <strong>b.</strong> To the maximum extent permitted by applicable law, the total liability of Nysa and the Nysa Parties for any claim arising out of or in connection with these Terms, the Site, or Events is limited to the amount you actually paid for any relevant Event or service (if any). In no event will Nysa be liable for indirect, incidental, special, punitive, or consequential damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                8. Event Changes, Cancellation, and Third-Party Services
              </h2>
              <p className="mb-3">
                <strong>a.</strong> Nysa may postpone, change, or cancel Events for any reason (including safety concerns). Nysa will use reasonable efforts to notify registered participants. Nysa is not liable for travel or other losses incurred by participants due to such changes.
              </p>
              <p>
                <strong>b.</strong> Events may be hosted or supported by third parties (venues, vendors, contractors). Nysa is not responsible for the actions, omissions, or quality of services provided by third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                9. Intellectual Property and User Content
              </h2>
              <p className="mb-3">
                <strong>a.</strong> All Site content (text, graphics, logos, images, code) is the property of Nysa or its licensors and is protected by copyright and other laws.
              </p>
              <p>
                <strong>b.</strong> By posting or submitting any content to the Site or Community, you grant Nysa a non-exclusive, worldwide, royalty-free, transferable license to use, reproduce, modify, publish, distribute, and display that content in connection with operating the Site and Community.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                10. Prohibited Conduct
              </h2>
              <p>
                Do not: (a) impersonate others; (b) upload malware or harmful code; (c) harass or threaten participants; (d) record or redistribute private information or Event content without consent; or (e) otherwise misuse the Site or Events. Nysa may take any measures it deems appropriate, including reporting illegal activity to law enforcement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                11. Termination
              </h2>
              <p>
                Nysa may suspend or terminate your access at any time for any reason, including breach of these Terms, without prior notice. Termination does not limit Nysa's rights to pursue other remedies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                12. Changes to Terms
              </h2>
              <p>
                Nysa may modify these Terms at any time. Material changes will be posted on the Site with an updated Last updated date. Your continued use after such changes constitutes acceptance. If you do not agree with the changes, you must stop using the Site and not attend Events.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                13. Governing Law and Dispute Resolution
              </h2>
              <p>
                These Terms are governed by the laws of the Republic of Cyprus (without regard to conflict-of-law rules). Any dispute arising out of or relating to these Terms shall be brought in the courts located in the Republic of Cyprus.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                14. Severability
              </h2>
              <p>
                If any provision is found invalid or unenforceable, the remaining provisions will remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                15. Entire Agreement
              </h2>
              <p>
                These Terms (together with the Privacy Policy and any event-specific terms and/or waivers) constitute the entire agreement between you and Nysa regarding the Site, Community, emails, and Events.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 tracking-wide text-primary">
                16. Contact
              </h2>
              <div className="bg-muted/50 p-6 rounded-lg border">
                <p className="mb-0">
                  For questions about these Terms, contact:{" "}
                  <a href="mailto:terms@nysa.earth" className="text-primary hover:underline font-medium">
                    terms@nysa.earth
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
