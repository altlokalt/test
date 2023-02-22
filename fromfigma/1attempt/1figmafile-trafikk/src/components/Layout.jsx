import { Outlet } from 'react-router-dom';


// wraps around app.js and renders the routes
const Layout = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    );
}

export default Layout;