import * as Icons from "./Icons";

function DinamicIcon({ iconName = "BiCustomize" }) {
  const Icon = Icons[iconName];
  return <Icon className="text-2xl font-extralight" />;
}

export default DinamicIcon;
