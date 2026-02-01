import { LoginForm } from '@/components/shared/LoginForm';

export default function ArtistLoginPage() {
    return (
        <div className="container min-h-[80vh] flex items-center justify-center py-12 px-4">
            <LoginForm
                role="artist"
                title="Artist Control Center"
                description="Login to manage your portfolio, track sales, and connect with collectors."
            />
        </div>
    );
}
