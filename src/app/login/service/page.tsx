import { LoginForm } from '@/components/shared/LoginForm';

export default function ServiceLoginPage() {
    return (
        <div className="container min-h-[80vh] flex items-center justify-center py-12 px-4">
            <LoginForm
                role="service"
                title="Service Provider Portal"
                description="Login to manage your technical services and community contributions."
            />
        </div>
    );
}
