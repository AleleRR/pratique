import { useState, useEffect, useCallback } from "react";
import { AppProvider } from "./context/AppContext";
import { styles } from "./theme/styles";
import { pageTitles } from "./data";
import { Sidebar, Topbar, MobileBar } from "./layout";
import { ToastContainer, GlobalSearch, OnboardingTour } from "./components";
import {
    Dashboard, Cartoes, NovaEntrega, Devolucao,
    Beneficiarios, Relatorios, Notificacoes, Auditoria, Configuracoes, Ajuda
} from "./pages";

/**
 * App: Root component with global state, keyboard shortcuts, search, and routing.
 */

const PAGE_COMPONENTS = {
    dashboard: Dashboard,
    cartoes: Cartoes,
    entrega: NovaEntrega,
    devolucao: Devolucao,
    beneficiarios: Beneficiarios,
    relatorios: Relatorios,
    notificacoes: Notificacoes,
    auditoria: Auditoria,
    configuracoes: Configuracoes,
    ajuda: Ajuda,
};

function AppContent() {
    const [page, setPage] = useState("dashboard");
    const [searchOpen, setSearchOpen] = useState(false);

    const { title, sub } = pageTitles[page] || { title: "AuxílioPay", sub: "" };
    const PageComponent = PAGE_COMPONENTS[page] || Dashboard;

    /** Keyboard shortcuts */
    const handleKeyDown = useCallback((e) => {
        // Ctrl/Cmd+K → global search
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            setSearchOpen(prev => !prev);
            return;
        }
        // Escape → close search or modal
        if (e.key === "Escape") {
            if (searchOpen) { setSearchOpen(false); return; }
        }
        // N → Nova Entrega (only when no input focused)
        const tag = document.activeElement?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        if (e.key === "n" || e.key === "N") { setPage("entrega"); return; }
        if (e.key === "d" || e.key === "D") { setPage("devolucao"); return; }
    }, [searchOpen]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
        <>
            <style>{styles}</style>
            <div className="app">
                <Sidebar activePage={page} onNavigate={setPage} />
                <div className="main">
                    <Topbar
                        title={title}
                        subtitle={sub}
                        onSearchOpen={() => setSearchOpen(true)}
                        onNotificationsClick={() => setPage("notificacoes")}
                    />
                    <div className="content">
                        <PageComponent onNav={setPage} />
                    </div>
                </div>
                <MobileBar activePage={page} onNavigate={setPage} />
            </div>

            <ToastContainer />
            <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={(p) => setPage(p)} />
            <OnboardingTour />
        </>
    );
}

export default function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}
