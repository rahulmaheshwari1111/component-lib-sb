export const BEMHelper = (block) => (
    element = "",
    modifiers = [],
    ...additionalClasses
  ) => {
    const elem = element ? `${block}__${element}` : block;
    const bemClasses =
      modifiers.length > 0 && modifiers.filter(Boolean).length > 0
        ? `${elem} ${modifiers
            .filter(Boolean)
            .map((m) => `${elem}--${m}`)
            .join(" ")}`
        : elem;
  
    const className =
      additionalClasses.filter(Boolean).length > 0
        ? `${bemClasses} ${additionalClasses.filter(Boolean).join(" ")}`
        : bemClasses;
    return className;
  };
  