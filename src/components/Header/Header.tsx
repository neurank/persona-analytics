import type { ApiEnv } from "../../api/client";
import "./Header.css";

interface HeaderProps {
  env: ApiEnv;
  onEnvChange: (env: ApiEnv) => void;
}

export function Header({ env, onEnvChange }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__title">Persona Analytics</h1>
      <select
        className="header__env-select"
        value={env}
        onChange={(e) => onEnvChange(e.target.value as ApiEnv)}
        aria-label="API environment"
      >
        <option value="dev">Dev</option>
        <option value="prod">Prod</option>
      </select>
    </header>
  );
}
