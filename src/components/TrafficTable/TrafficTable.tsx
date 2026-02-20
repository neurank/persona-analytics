import type { AnalyticsTrafficSourceSummary } from "../../api/types";
import "./TrafficTable.css";

interface TrafficTableProps {
  data: AnalyticsTrafficSourceSummary[];
}

export function TrafficTable({ data }: TrafficTableProps) {
  if (data.length === 0) {
    return <p className="traffic-table traffic-table--empty">Нет данных</p>;
  }

  return (
    <table className="traffic-table">
      <thead>
        <tr>
          <th className="traffic-table__th">Source</th>
          <th className="traffic-table__th traffic-table__th--num">Completed</th>
          <th className="traffic-table__th traffic-table__th--num">Paid</th>
          <th className="traffic-table__th traffic-table__th--num">Cohort rate</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.source}>
            <td className="traffic-table__td">{row.source}</td>
            <td className="traffic-table__td traffic-table__td--num">
              {row.completed}
            </td>
            <td className="traffic-table__td traffic-table__td--num">
              {row.paid}
            </td>
            <td className="traffic-table__td traffic-table__td--num">
              {(row.cohortRate * 100).toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
