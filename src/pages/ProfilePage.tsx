import { type FC } from 'react';
import ProfileMenuItem from '../components/ProfileMenuItem';
import ProfileSection from '../components/ProfileSection';

const ProfilePage: FC = () => {
  // Handlers untuk menu items
  const handlePersonalDetails = () => {
    // Navigate to personal details page
  };

  const handleAccountSettings = () => {
    // Navigate to account settings page
  };

  const handleLanguage = () => {
    // Open language selection
  };

  const handleFAQ = () => {
    // Navigate to FAQ page
  };

  const handlePolicies = () => {
    // Navigate to policies page
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="pt-4 pb-24 px-5">
        {/* Profile Info */}
        <div className="py-6 bg-white">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img
                src="https://i.pravatar.cc/64"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Marcus Geidt</h2>
              <p className="text-sm text-gray-500">Member</p>
            </div>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="mt-6">
          <ProfileSection title="Account">
            <ProfileMenuItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              label="Personal details"
              onClick={handlePersonalDetails}
            />
            <ProfileMenuItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              label="Account settings"
              onClick={handleAccountSettings}
            />
            <ProfileMenuItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              }
              label="Language"
              onClick={handleLanguage}
            />
          </ProfileSection>

          <ProfileSection title="General">
            <ProfileMenuItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="FAQs & Help"
              onClick={handleFAQ}
            />
            <ProfileMenuItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              label="Policies & Terms"
              onClick={handlePolicies}
            />
          </ProfileSection>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;