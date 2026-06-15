import { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ProfileMenuItem from '../components/ProfileMenuItem';
import ProfileSection from '../components/ProfileSection';
import { logout } from '../services/authService';
import type { User } from '../types/Auth';

const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

  const handleLogout = () => {
    setIsLoading(true);
    logout();
    setIsLoading(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Profil Saya</h1>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider">
          Pengaturan Akun
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Digital Member Card */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden aspect-[1.586/1] flex flex-col justify-between border border-blue-500/20">
            {/* Glossy overlay effects */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
            <div className="absolute left-0 bottom-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl transform -translate-x-12 translate-y-12"></div>
            
            {/* Card Top */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold tracking-wide">KARTU ANGGOTA</h3>
                <p className="text-[10px] text-blue-200 font-semibold tracking-wider">PINJAM BUKU DIGITAL</p>
              </div>
              <img src="/Logo.png" alt="Logo" className="w-8 h-8 object-contain brightness-0 invert" />
            </div>

            {/* Card Middle (User Info) */}
            <div className="flex items-center gap-4 my-2">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 bg-white/10 flex items-center justify-center text-lg font-bold shadow-inner">
                {user?.username ? user.username.substring(0, 2).toUpperCase() : 'US'}
              </div>
              <div>
                <h4 className="text-base font-bold truncate leading-tight">{user?.username || 'User'}</h4>
                <p className="text-xs text-blue-100/90 truncate">{user?.email || 'member@example.com'}</p>
              </div>
            </div>

            {/* Card Bottom */}
            <div className="flex justify-between items-end border-t border-white/10 pt-3 text-[10px]">
              <div>
                <p className="text-blue-200">ID Anggota</p>
                <p className="font-mono font-bold tracking-wider mt-0.5">MBR-2026-9875</p>
              </div>
              <div className="text-right">
                <p className="text-blue-200">Tanggal Gabung</p>
                <p className="font-semibold mt-0.5">Juni 2026</p>
              </div>
            </div>
          </div>

          {/* Quick Statistics Box */}
          <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-5 shadow-inner">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Statistik Portofolio</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Selesai Dibaca</p>
                <p className="text-xl font-extrabold text-blue-600 mt-1">12 Buku</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Tepat Waktu</p>
                <p className="text-xl font-extrabold text-green-600 mt-1">98%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings Sections */}
        <div className="lg:col-span-7 space-y-4">
          <ProfileSection title="Pengaturan Akun">
            <ProfileMenuItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              label="Detail Data Pribadi"
              onClick={handlePersonalDetails}
            />
            <ProfileMenuItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              label="Keamanan & Sandi"
              onClick={handleAccountSettings}
            />
            <ProfileMenuItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              }
              label="Bahasa (Language)"
              onClick={handleLanguage}
            />
          </ProfileSection>

          <ProfileSection title="Informasi Umum">
            <ProfileMenuItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="Bantuan & FAQ"
              onClick={handleFAQ}
            />
            <ProfileMenuItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              label="Kebijakan Privasi & Ketentuan"
              onClick={handlePolicies}
            />
          </ProfileSection>

          <ProfileSection title="Sesi Portal">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full flex items-center gap-3 px-3 py-3 border border-red-100 rounded-xl text-red-600 hover:bg-red-50 hover:border-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-semibold">{isLoading ? 'Mengakhiri Sesi...' : 'Keluar dari Portal'}</span>
            </button>
          </ProfileSection>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;