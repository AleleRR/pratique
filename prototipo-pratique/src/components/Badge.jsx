/**
 * Badge component: Displays a colored status pill.
 *
 * @param {{ status: "entregue" | "disponivel" | "bloqueado" | "pendente" | "devolvido" }} props
 */
const STATUS_LABELS = {
    entregue:  "Entregue",
    disponivel: "Disponível",
    bloqueado: "Bloqueado",
    pendente:  "Pendente",
    devolvido: "Devolvido",
};

export default function Badge({ status }) {
    return (
        <span className={`badge ${status}`}>
            {STATUS_LABELS[status] || status}
        </span>
    );
}
