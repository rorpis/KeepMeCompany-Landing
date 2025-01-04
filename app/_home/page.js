'use client';

import { useParams } from 'next/navigation';
import { resolveComponent } from '@/app/utils/componentResolver';
import { useEffect, useState } from 'react';

export default function HomeComponent() {
  const { locale } = useParams();
  const [components, setComponents] = useState({});

  useEffect(() => {
    if (!locale) return;

    const loadComponents = async () => {
      const componentList = ['Hero', 'Problem', 'Solution', 'VideoSection', 'Services', 'SavingsEstimator', 'OutboundCallTester', 'Security', 'FAQ'];
      const loadedComponents = {};

      for (const name of componentList) {
        const Component = await resolveComponent(name, locale);
        if (Component) {
          loadedComponents[name] = Component;
        }
      }

      setComponents(loadedComponents);
    };

    loadComponents();
  }, [locale]);

  return (
    <div>
      {Object.entries(components).map(([name, Component]) => (
        <Component key={name} />
      ))}
    </div>
  );
}