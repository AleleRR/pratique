import { barData, barLabels } from "../data";

/**
 * ChartBars component: Simple bar chart visualization for monthly movements.
 * Renders proportionally-sized bars based on the maximum data value.
 */
const BAR_MAX_HEIGHT = 68;

export default function ChartBars() {
    const maxValue = Math.max(...barData);

    return (
        <div className="chart-bars">
            {barData.map((value, index) => {
                const heightPx = (value / maxValue) * BAR_MAX_HEIGHT;
                return (
                    <div key={index} className="chart-bar-wrap">
                        <div
                            className="chart-bar"
                            style={{ height: `${heightPx}px` }}
                            title={String(value)}
                        />
                        <div className="chart-label">{barLabels[index]}</div>
                    </div>
                );
            })}
        </div>
    );
}
