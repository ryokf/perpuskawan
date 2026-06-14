import { Outlet } from 'react-router';
import BottomNav from './components/BottomNav';


const Layout = () => {
    return (
        <div>
            <header className="flex items-center px-5 py-5 gap-2">
                <img src="Logo.png" alt="" />
                <h1 className="text-xl font-semibold">Pinjam Buku</h1>
            </header>
            <Outlet></Outlet>
            <BottomNav></BottomNav>
        </div>
    )
}

export default Layout