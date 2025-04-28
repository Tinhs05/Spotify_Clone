import Footer from "../components/Footer";
import Toolbar from "../components/Toolbar";
import "./AdminLayout.css";

function AdminLayout({ children }) {
    return (
        <div className="AdminLayout">
            <div className="AdminLayout_Header">
            </div>
            <div className="AdminLayout_Toolbar">
                <Toolbar />
            </div>
            <div className="AdminLayout_Main">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout;
