import {useAuth} from "../../useAuth";

import "../../style/upBar.css"
import {Link} from "react-router-dom";

type NavItem = { label: string; href: string, needsAuth: boolean };

const navItems: NavItem[] = [
    { label: "Accueil", href: "/", needsAuth: false },
    { label: "Recettes", href: "/recipes", needsAuth: false },
    { label: "Creer recette", href: "/create-recipe", needsAuth : true },
    { label: "Login", href: "/login", needsAuth : false },
    { label: "Disconnect", href: "/disconnect", needsAuth : true },
];



function UpBar() {

    const {user, loading} = useAuth();

    return (
        <header className="upbar">
            <h1 className="app-title">
                <a href="/public" className="logo">
                    Cooking Recipe
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
                    <Link key={item.href} to={item.href} className="nav-link">
                        {item.label}
                    </Link>
                    )
                })}
            </nav>
        </header>
    )
}

export default UpBar;