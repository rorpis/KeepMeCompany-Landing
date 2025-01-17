export const resolveComponent = async (componentName, locale) => {
  if (!locale) return null;
  
  const country = locale.split('-')[1].toLowerCase();
  
  try {
    // Try country-specific component
    const Component = await import(`@/app/_contact-sales/components/country/${country}/${componentName}`);
    return Component.default;
  } catch (error) {
    try {
      // Try base component
      const Component = await import(`@/app/_contact-sales/components/base/${componentName}`);
      return Component.default;
    } catch (error) {
      // If not found in contact-sales, try home components
      try {
        const Component = await import(`@/app/_home/components/country/${country}/${componentName}`);
        return Component.default;
      } catch (error) {
        try {
          const Component = await import(`@/app/_home/components/base/${componentName}`);
          return Component.default;
        } catch (error) {
          return null;
        }
      }
    }
  }
};

