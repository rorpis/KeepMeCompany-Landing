'use client';

import Hero from './Hero';
import Problem from './Problem';
import Solution from './Solution';
import Services from './Services';
import Deployment from './Deployment';
import Security from './Security';
import FAQ from './FAQ';
import SavingsEstimator from './SavingsEstimator';

export default function HomeComponent() {
  return (
    <div>
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <SavingsEstimator />
      <Deployment />
      <Security />
      <FAQ />
      {/* Future sections will go here */}
    </div>
  );
}