'use client';

import { resolveComponent } from '@/app/utils/componentResolver';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ContactSalesPage() {
  const { locale } = useParams();
  const [ContactSalesForm, setContactSalesForm] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      const Component = await resolveComponent('ContactSalesForm', locale);
      setContactSalesForm(() => Component);
    };

    loadComponent();
  }, [locale]);

  if (!ContactSalesForm) {
    return <div>Loading...</div>; // Better UX than null
  }

  return (
    <>
      <ContactSalesForm />
    </>
  );
}