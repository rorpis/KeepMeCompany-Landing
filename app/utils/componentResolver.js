export const resolveComponent = async (componentName, locale) => {
  if (!locale) return null;
  
  const country = locale.split('-')[1].toLowerCase();
  
  try {
    // Try country-specific component
    const countryComponent = await import(`@/app/_home/components/country/${country}/${componentName}`);
    return countryComponent.default;
  } catch (error) {
    // Fall back to base component
    try {
      const baseComponent = await import(`@/app/_home/components/base/${componentName}`);
      return baseComponent.default;
    } catch (error) {
      console.error(`Could not load component ${componentName}`);
      return null;
    }
  }
};
