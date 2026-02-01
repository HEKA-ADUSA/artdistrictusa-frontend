"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter, CardDescription, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface LoginFormProps {
    role: 'customer' | 'artist' | 'service';
    title: string;
    description: string;
}

export function LoginForm({ role, title, description }: LoginFormProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            // Short-term: localStorage for MVP
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Role-based redirect
            if (role === 'artist') {
                router.push('/artist/dashboard'); // To be implemented in Phase 5
            } else if (role === 'service') {
                router.push('/service/dashboard');
            } else {
                router.push('/artworks');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md border-2 shadow-xl">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-3xl font-bold tracking-tight">{title}</CardTitle>
                <CardDescription className="text-base">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Button variant="link" className="p-0 h-auto text-xs" type="button">Forgot password?</Button>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full h-11 text-lg font-bold" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Login
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 text-center">
                <div className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Button variant="link" className="p-0" onClick={() => router.push(`/login/${role}?signup=true`)}>Sign up</Button>
                </div>
            </CardFooter>
        </Card>
    );
}
