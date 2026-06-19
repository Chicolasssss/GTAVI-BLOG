export const metadata = {
  title: "Terms of Service — Leonida Hub",
  description: "Terms of Service for using Leonida Hub.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-32 px-4 pb-20">
      <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-8">
          Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#00ffff]">Service</span>
        </h1>
        
        <div className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-white/70 prose-li:text-white/70">
          <p>Last updated: October 2023</p>

          <p>
            Welcome to Leonida Hub! By accessing this website, we assume you accept these terms and conditions. 
            Do not continue to use Leonida Hub if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2>1. Unofficial Fan Site Disclaimer</h2>
          <p>
            Leonida Hub is a community-driven, unofficial fan site dedicated to Grand Theft Auto VI. 
            We are <strong>NOT</strong> affiliated with, associated with, authorized, endorsed by, or in any way officially connected with Rockstar Games, Take-Two Interactive, or any of its subsidiaries or its affiliates. 
            The official Rockstar Games website can be found at <a href="https://www.rockstargames.com" target="_blank" rel="noopener noreferrer" className="text-[#00ffff] hover:underline">rockstargames.com</a>.
          </p>
          <p>
            The names Grand Theft Auto, GTA, GTA VI, and Rockstar Games, as well as related names, marks, emblems, and images are registered trademarks of their respective owners.
          </p>

          <h2>2. User Accounts and Content</h2>
          <p>
            When you create an account on our website (via Discord Auth), you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it.
          </p>
          <p>
            You must not describe or assign content to your account in a misleading or unlawful manner. Leonida Hub reserves the right to moderate, edit, or remove any content (such as Forum Posts, Scripts, or Comments) that violates our community guidelines, contains illegal material, or is deemed inappropriate by the moderation team.
          </p>

          <h2>3. Gamification and Ranks</h2>
          <p>
            Our website employs a gamification system involving Experience Points (XP) and Ranks. These are virtual metrics used solely for community engagement on Leonida Hub. They hold no real-world monetary value, cannot be exchanged for cash, and can be modified or reset by the administration at any time without prior notice.
          </p>

          <h2>4. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by Leonida Hub.
            Leonida Hub has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall Leonida Hub, nor its administrators, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </div>
      </div>
    </div>
  )
}
