import { SignUp } from "@clerk/nextjs";

export default function AdminSignUpPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">MDigitalDev</h1>
          <p className="text-white/45 text-sm mt-1">Create admin account</p>
        </div>

        <SignUp
          routing="path"
          path="/admin/sign-up"
          signInUrl="/admin/sign-in"
          fallbackRedirectUrl="/admin"
        />
      </div>
    </div>
  );
}
