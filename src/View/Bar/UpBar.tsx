import {useAuth} from "../../useAuth";

import "../../style/upBar.css"

type NavItem = { label: string; href: string, needsAuth: boolean };

const navItems: NavItem[] = [
    { label: "Accueil", href: "/", needsAuth: false },
    { label: "Recettes", href: "/recettes", needsAuth: false },
    { label: "Creer recette", href: "/creer-recette", needsAuth : true },
    { label: "Login", href: "/login", needsAuth : false },
    { label: "Disconnect", href: "/disconnect", needsAuth : true },
];



function UpBar() {

    const {user, loading} = useAuth();

    return (
        <header className="upbar">
            <h1 className="app-title">
                <a href="/" className="logo">
                    Cooking Reciepe App
                </a>
            </h1>
            <nav className="nav-links">
                {navItems.map((item) => {


                    if (item.label === "Login" && user) {
                        return null;
                    }
                    if (item.needsAuth && !user) {
                        return null;
                    }

                    return (
                    <a key={item.href} href={item.href} className="nav-link">
                        {item.label}
                    </a>
                    )
                })}
            </nav>
        </header>
    )
}

export default UpBar;