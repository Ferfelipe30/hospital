import React from "react";
import Sidebar from "../../components/Sidebar";

const AdminLayout = ({ children }) => (
    <div className="admin-panel-container">
        <Sidebar />
        <div className="admin-content">{children}</div>
    </div>
);

export default AdminLayout;