import { type FC } from 'react';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

const ProfileSection: FC<ProfileSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h2 className="mb-2 text-sm font-medium text-gray-900">{title}</h2>
      <div className="divide-y divide-gray-100">
        {children}
      </div>
    </div>
  );
};

export default ProfileSection;