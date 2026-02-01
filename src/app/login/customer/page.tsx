import { LoginForm } from '@/components/shared/LoginForm';

export default function CustomerLoginPage() {
    return (
        <div className="container min-h-[80vh] flex items-center justify-center py-12 px-4">
            <LoginForm
                role="customer"
                title="Welcome Back"
                description="Login as a collector to manage your favorites and orders."
            />
        </div>
    );
}
