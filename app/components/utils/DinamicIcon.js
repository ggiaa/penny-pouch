import * as Icons from "./Icons";

function DinamicIcon({ iconName, size }) {
  const Icon = Icons[iconName];
  return <Icon className={`${size} font-extralight`} />;
}

export default DinamicIcon;
