import "./Tabs.css";

export type TabId = "payments" | "conversion" | "returns" | "traffic" | "repeat";

const TABS: { id: TabId; label: string }[] = [
  { id: "payments", label: "Payments" },
  { id: "conversion", label: "Conversion" },
  { id: "returns", label: "Returns" },
  { id: "traffic", label: "Traffic Sources" },
  { id: "repeat", label: "Repeat Purchases" },
];

interface TabsProps {
  active: TabId;
  onSelect: (id: TabId) => void;
}

export function Tabs({ active, onSelect }: TabsProps) {
  return (
    <nav className="tabs" role="tablist">
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={active === id}
          className={`tabs__tab ${active === id ? "tabs__tab--active" : ""}`}
          onClick={() => onSelect(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
