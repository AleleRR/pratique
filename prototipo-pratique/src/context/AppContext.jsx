import { createContext, useContext, useReducer, useCallback } from "react";
import { cartoes as initialCartoes } from "../data/cartoes";
import { beneficiarios as initialBeneficiarios } from "../data/beneficiarios";
import { movimentacoes as initialMovimentacoes } from "../data/movimentacoes";
import { auditLogs as initialAuditoria } from "../data/auditoria";
import { notificacoes as initialNotificacoes } from "../data/notificacoes";
import { notificacoesBeneficiario as initialNotifBeneficiario } from "../data/notificacoesBeneficiario";

/**
 * Global application state with useReducer.
 * All mutations go through dispatched actions for predictability.
 */

const AppContext = createContext(null);

/* ── Helpers ── */

let toastId = 0;
function nextToastId() { return `toast-${++toastId}`; }
let movId = 100;
function nextMovId() { return `MOV-${String(++movId).padStart(3, "0")}`; }
let notId = 100;
function nextNotId() { return `NOT-${String(++notId).padStart(3, "0")}`; }
let benId = 100;
function nextBenId() { return `BEN-${String(++benId).padStart(3, "0")}`; }
let nbenfId = 100;
function nextNbenfId() { return `NBENF-${String(++nbenfId).padStart(3, "0")}`; }

function nowFormatted() {
    const d = new Date();
    return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function nowTs() {
    const d = new Date();
    return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

/* ── Initial State ── */

const initialState = {
    cartoes: initialCartoes,
    beneficiarios: initialBeneficiarios,
    movimentacoes: initialMovimentacoes,
    auditoria: initialAuditoria,
    notificacoes: initialNotificacoes,
    notificacoesBeneficiario: initialNotifBeneficiario,
    toasts: [],
};

/* ── Reducer ── */

function appReducer(state, action) {
    switch (action.type) {

        case "DELIVER_CARD": {
            const { cartaoId, beneficiario, cpf, tipo, responsavel, observacao } = action.payload;
            return {
                ...state,
                cartoes: state.cartoes.map(c =>
                    c.id === cartaoId ? { ...c, status: "entregue", entregaEm: new Date().toLocaleDateString("pt-BR"), beneficiario, cpf, responsavel } : c
                ),
                movimentacoes: [
                    { id: nextMovId(), cartaoId, tipo: "entrega", beneficiario, responsavel, data: nowFormatted(), dataObj: new Date(), observacao: observacao || "" },
                    ...state.movimentacoes,
                ],
                auditoria: [
                    { ts: nowTs(), op: "ENTREGA", user: responsavel, ent: cartaoId, ip: "192.168.1.45", payload: { beneficiario, tipo } },
                    ...state.auditoria,
                ],
                notificacoes: [
                    { id: nextNotId(), icon: "card-deliver", texto: `Cartão ${cartaoId} entregue para ${beneficiario}`, meta: `Sistema • agora`, unread: true },
                    ...state.notificacoes,
                ],
                notificacoesBeneficiario: [
                    {
                        id: nextNbenfId(), canal: "sms", status: "entregue",
                        beneficiario, cartaoId, tipo: "entrega",
                        assunto: `Cartão ${cartaoId} de Auxílio ${tipo} entregue`,
                        mensagem: `Olá ${beneficiario.split(" ")[0]}, seu cartão ${cartaoId} de Auxílio ${tipo} foi entregue com sucesso.`,
                        enviadoEm: nowFormatted(),
                    },
                    {
                        id: nextNbenfId(), canal: "email", status: "pendente",
                        beneficiario, cartaoId, tipo: "comprovante",
                        assunto: `Comprovante de entrega — ${cartaoId}`,
                        mensagem: `Prezado(a) ${beneficiario}, segue o comprovante digital de entrega do cartão ${cartaoId}.`,
                        enviadoEm: nowFormatted(),
                    },
                    ...state.notificacoesBeneficiario,
                ],
            };
        }

        case "RETURN_CARD": {
            const { cartaoId, beneficiario, condicao, responsavel, observacao } = action.payload;
            const newStatus = condicao === "Perdido" ? "bloqueado" : "disponivel";
            return {
                ...state,
                cartoes: state.cartoes.map(c =>
                    c.id === cartaoId ? { ...c, status: newStatus, entregaEm: null } : c
                ),
                movimentacoes: [
                    { id: nextMovId(), cartaoId, tipo: "devolucao", beneficiario, responsavel, data: nowFormatted(), dataObj: new Date(), observacao: observacao || "", condicao },
                    ...state.movimentacoes,
                ],
                auditoria: [
                    { ts: nowTs(), op: "DEVOLUÇÃO", user: responsavel, ent: cartaoId, ip: "192.168.1.45", payload: { condicao, beneficiario } },
                    ...state.auditoria,
                ],
                notificacoes: [
                    { id: nextNotId(), icon: "card-return", texto: `Cartão ${cartaoId} devolvido por ${beneficiario} — ${condicao}`, meta: `Sistema • agora`, unread: true },
                    ...state.notificacoes,
                ],
                notificacoesBeneficiario: [
                    {
                        id: nextNbenfId(), canal: "whatsapp", status: "entregue",
                        beneficiario, cartaoId, tipo: "devolucao",
                        assunto: `Devolução registrada — ${cartaoId}`,
                        mensagem: `Olá ${beneficiario.split(" ")[0]}, confirmamos a devolução do cartão ${cartaoId}. Condição: ${condicao}.`,
                        enviadoEm: nowFormatted(),
                    },
                    ...state.notificacoesBeneficiario,
                ],
            };
        }

        case "BLOCK_CARD": {
            const { cartaoId, motivo, responsavel } = action.payload;
            return {
                ...state,
                cartoes: state.cartoes.map(c =>
                    c.id === cartaoId ? { ...c, status: "bloqueado" } : c
                ),
                auditoria: [
                    { ts: nowTs(), op: "BLOQUEIO", user: responsavel, ent: cartaoId, ip: "192.168.1.45", payload: { motivo } },
                    ...state.auditoria,
                ],
                notificacoes: [
                    { id: nextNotId(), icon: "⛔", texto: `Cartão ${cartaoId} bloqueado — ${motivo}`, meta: `Sistema • agora`, unread: true },
                    ...state.notificacoes,
                ],
            };
        }

        case "ADD_BENEFICIARIO": {
            const newBen = { ...action.payload, id: nextBenId(), dataCadastro: new Date().toLocaleDateString("pt-BR"), totalCartoes: 0, cartaoAtivo: null };
            return { ...state, beneficiarios: [...state.beneficiarios, newBen] };
        }

        case "UPDATE_BENEFICIARIO": {
            return {
                ...state,
                beneficiarios: state.beneficiarios.map(b =>
                    b.id === action.payload.id ? { ...b, ...action.payload } : b
                ),
            };
        }

        case "DEACTIVATE_BENEFICIARIO": {
            return {
                ...state,
                beneficiarios: state.beneficiarios.map(b =>
                    b.id === action.payload.id ? { ...b, status: "inativo", cartaoAtivo: null } : b
                ),
            };
        }

        case "MARK_NOTIFICATION_READ": {
            return {
                ...state,
                notificacoes: state.notificacoes.map(n =>
                    n.id === action.payload.id ? { ...n, unread: false } : n
                ),
            };
        }

        case "MARK_ALL_READ": {
            return {
                ...state,
                notificacoes: state.notificacoes.map(n => ({ ...n, unread: false })),
            };
        }

        case "ADD_TOAST": {
            const toast = { id: nextToastId(), ...action.payload, createdAt: Date.now() };
            return { ...state, toasts: [...state.toasts.slice(-2), toast] };
        }

        case "DISMISS_TOAST": {
            return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload.id) };
        }

        case "RESEND_BENEFICIARY_NOTIFICATION": {
            return {
                ...state,
                notificacoesBeneficiario: state.notificacoesBeneficiario.map(n =>
                    n.id === action.payload.id
                        ? { ...n, status: "pendente", enviadoEm: nowFormatted(), erroMotivo: undefined }
                        : n
                ),
            };
        }

        default:
            return state;
    }
}

/* ── Provider ── */

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const addToast = useCallback((type, message) => {
        dispatch({ type: "ADD_TOAST", payload: { type, message } });
    }, []);

    return (
        <AppContext.Provider value={{ state, dispatch, addToast }}>
            {children}
        </AppContext.Provider>
    );
}

/* ── Hook ── */

export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppContext must be used within AppProvider");
    return ctx;
}
