import { IconSymbol, IconSymbolName } from "./IconSymbol";
export const getTabIcon = (
  routeName: string,
  color: string,
  focused: boolean
) => {
  const iconConfig: Record<
    string,
    { active: IconSymbolName; inactive: IconSymbolName }
  > = {
    index: {
      active: "bubble.left.and.bubble.right.fill",
      inactive: "bubble.left.and.bubble.right",
    },
    profile: {
      active: "person.circle.fill",
      inactive: "person.circle",
    },
  };

  const config = iconConfig[routeName as keyof typeof iconConfig];
  if (!config) return null;

  return (
    <IconSymbol
      size={focused ? 30 : 26}
      name={focused ? config.active : config.inactive}
      color={color}
    />
  );
};
