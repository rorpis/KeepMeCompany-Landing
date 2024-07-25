// app/signup/page.js

import SignupForm from '../(components)/SignupForm';
import SlidingPanel from '../(components)/SlidingPanel';

export default function SignupPage() {
  return (
    <div>
      <SignupForm />
      <SlidingPanel />
    </div>
  );
}