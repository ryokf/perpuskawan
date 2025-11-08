import { type FC } from 'react';

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const ProfileMenuItem: FC<ProfileMenuItemProps> = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full py-4 text-left hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-400">
          {icon}
        </div>
        <span className="text-sm text-gray-900">{label}</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default ProfileMenuItem;