import { type FC, useEffect, useState} from 'react';
import LibraryTabs from '../components/LibraryTabs';
import BookListItem from '../components/BookListItem';
import {getLoansData} from '../services/loanServices';
import type { Loan } from '../types/Loan';
import { getReservation } from '../services/reservationService';

const LibraryPage: FC = () => {
    const [activeTab, setActiveTab] = useState('Reservations');
    const [books, setBooks] = useState<Loan[]>([]);
    const tabs = ['Reservations', 'On borrow', 'Returned'];

    const fetchLoansData = async (activeTab: string) => {
        const data = await getLoansData()
        if (activeTab === 'On borrow') {
            const filteredData = data.filter((loan: Loan) => !loan.isDone);
            setBooks(filteredData);
            return;
        }
        if (activeTab === 'Returned') {
            const filteredData = data.filter((loan: Loan) => loan.isDone);
            setBooks(filteredData);
            return;
        }
    }

    const fetchReservationsData = async () => {
        const data = await getReservation();
        setBooks(data);
    }

    useEffect(() => {
        if (activeTab === 'On borrow' || activeTab === 'Returned') {
            fetchLoansData(activeTab);
        } else {
            fetchReservationsData();
        }
    }, [activeTab]);

    console.log('Library books:', books);

    return (
        <div className="min-h-screen bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Perpustakaan Saya</h1>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                    Daftar Pinjaman
                </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Area: Library Tabs and Book List */}
                <div className="flex-1 min-w-0">
                    <LibraryTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                    
                    {books.length === 0 ? (
                        <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl mt-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <p className="text-sm text-gray-500">Tidak ada buku di bagian ini.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
                            {books.map((book) => (
                                <BookListItem
                                    key={book.id}
                                    {...{...book.book, deletable: false }}
                                    duedate={book.returnDate}
                                    isCollectionItem={false}
                                    reservationId={activeTab === 'Reservations' ? book.id : undefined}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Area: Sidebar Guidelines and Deadline Timeline */}
                <aside className="hidden lg:flex flex-col w-80 flex-shrink-0 space-y-6">
                    
                    {/* Widget 1: Panduan Pengembalian */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Ketentuan Peminjaman
                        </h3>
                        <ul className="space-y-2.5 text-xs text-blue-950/80 leading-relaxed list-disc list-inside">
                            <li>Batas waktu pinjam adalah **14 hari** sejak tanggal disetujui.</li>
                            <li>Keterlambatan pengembalian dikenakan denda **Rp 1.000 / hari**.</li>
                            <li>Anda dapat melakukan **perpanjangan** 1 kali jika buku tidak dalam antrean.</li>
                            <li>Kembalikan buku langsung ke pustakawan melalui loket digital.</li>
                        </ul>
                    </div>

                    {/* Widget 2: Tenggat Waktu Terdekat (Timeline) */}
                    <div className="bg-white border border-gray-200/60 rounded-2xl p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Tenggat Pengembalian
                        </h3>
                        <div className="space-y-3">
                            <div className="flex gap-3 items-start p-2 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0 animate-ping"></div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-800">UI/UX Design Book</h4>
                                    <p className="text-[10px] text-gray-400 mt-0.5">Jatuh tempo: 2 Hari Lagi</p>
                                    <span className="text-[9px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-medium inline-block mt-1">Segera Kembalikan</span>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start p-2 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-800">Clean Code</h4>
                                    <p className="text-[10px] text-gray-400 mt-0.5">Jatuh tempo: 10 Juni 2026</p>
                                    <span className="text-[9px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium inline-block mt-1">Sisa 8 Hari</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default LibraryPage;