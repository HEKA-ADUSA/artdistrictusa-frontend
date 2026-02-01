"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Upload, Sparkles, Save, Send, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import artworkService from '@/services/artwork.service';
import aiService from '@/services/ai.service';

export default function ArtworkUploadPage() {
    const router = useRouter();
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        style: '',
        medium: '',
        width: '',
        height: '',
        depth: '',
        yearCreated: new Date().getFullYear().toString(),
        isFramed: false,
    });
    const [showProfileAlert, setShowProfileAlert] = useState(true);
    const [generatingDescription, setGeneratingDescription] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const filesArray = Array.from(files).slice(0, 12 - images.length);
            setImages([...images, ...filesArray]);

            // Create previews
            const previews: string[] = [];
            filesArray.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    previews.push(reader.result as string);
                    if (previews.length === filesArray.length) {
                        setImagePreviews([...imagePreviews, ...previews]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleGenerateDescription = async () => {
        if (!formData.title || !formData.medium) {
            setError('Please fill in title and medium first');
            return;
        }

        setGeneratingDescription(true);
        setError(null);

        try {
            const description = await aiService.enhanceDescription({
                title: formData.title,
                medium: formData.medium,
                rawDescription: formData.description || 'A beautiful artwork',
                style: formData.style,
                dimensions: `${formData.width}x${formData.height}`,
            });
            setFormData({ ...formData, description });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to generate description');
        } finally {
            setGeneratingDescription(false);
        }
    };

    const handlePublish = async () => {
        if (!formData.title || !formData.price || images.length === 0) {
            setError('Please fill in title, price and upload at least one image');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            await artworkService.uploadArtwork({
                title: formData.title,
                description: formData.description,
                medium: formData.medium,
                year: parseInt(formData.yearCreated) || undefined,
                priceUsd: parseFloat(formData.price),
                categories: formData.category ? [formData.category] : [],
                tags: formData.style ? [formData.style] : [],
                width: parseFloat(formData.width) || undefined,
                height: parseFloat(formData.height) || undefined,
                depth: parseFloat(formData.depth) || undefined,
                isFramed: formData.isFramed,
            }, images);

            // Success! Redirect to artist dashboard or artworks
            router.push('/artworks');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to publish artwork');
        } finally {
            setUploading(false);
        }
    };

    const handleSaveDraft = () => {
        // TODO: Implement draft saving if needed
        alert('Draft feature coming soon!');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <div className="bg-primary text-white py-3">
                <div className="container px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="font-semibold">DeLuxe Plan</span>
                        <span>•</span>
                        <span>12 images per artwork • 200 listings available</span>
                    </div>
                    <Button variant="secondary" size="sm">
                        Upgrade for More →
                    </Button>
                </div>
            </div>

            <div className="container px-4 py-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Upload New Artwork</h1>
                    <p className="text-gray-600">Add your masterpiece to the marketplace.</p>
                </div>

                {/* Profile Alert */}
                {showProfileAlert && (
                    <Alert className="mb-6 border-yellow-400 bg-yellow-50">
                        <AlertDescription className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-600">⚠️</span>
                                <span>
                                    <strong>Complete Your Artist Profile First</strong> - Tell us your story so we can create an AI-powered biography that connects with collectors.
                                </span>
                            </div>
                            <Button variant="destructive" size="sm">
                                Complete Profile →
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid lg:grid-cols-[1fr_450px] gap-8">
                    {/* Left Column - Image Upload */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <Label className="text-lg font-semibold">Artwork Images</Label>
                                <Button variant="outline" size="sm">
                                    DeLuxe Template
                                </Button>
                            </div>

                            {/* Dropzone */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary transition-colors">
                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <div className="text-lg font-semibold mb-2">
                                        <span className="text-primary">Click to upload</span> or drag and drop
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        PNG, JPG up to 20MB
                                    </div>
                                </label>
                            </div>

                            {/* Image Preview Grid */}
                            {imagePreviews.length > 0 && (
                                <div className="grid grid-cols-4 gap-4 mt-4">
                                    {imagePreviews.map((img, idx) => (
                                        <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                                            <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    {[...Array(12 - imagePreviews.length)].map((_, idx) => (
                                        <div key={`empty-${idx}`} className="aspect-square rounded-lg border-2 border-dashed border-gray-200"></div>
                                    ))}
                                </div>
                            )}

                            <div className="text-sm text-gray-600 mt-2">
                                {images.length} / 12 images
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Artwork Details */}
                    <div className="space-y-6">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Ocean Dreams #4"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                rows={5}
                                placeholder="Describe your artwork, inspiration, techniques used..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none hover:opacity-90"
                                onClick={handleGenerateDescription}
                                disabled={generatingDescription}
                            >
                                <Sparkles className="mr-2 h-4 w-4" />
                                {generatingDescription ? 'Generating...' : 'Let AI help write a compelling description based on your style profile'}
                            </Button>
                            {generatingDescription && (
                                <Button variant="secondary" size="sm" className="mt-2 w-full">
                                    Generate with AI
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price">Price ($) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    placeholder="850"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="category">Category *</Label>
                                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="abstract">Abstract</SelectItem>
                                        <SelectItem value="landscape">Landscape</SelectItem>
                                        <SelectItem value="portrait">Portrait</SelectItem>
                                        <SelectItem value="modern">Modern</SelectItem>
                                        <SelectItem value="photography">Photography</SelectItem>
                                        <SelectItem value="digital">Digital Art</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="style">Style</Label>
                                <Select value={formData.style} onValueChange={(value) => setFormData({ ...formData, style: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="contemporary">Contemporary</SelectItem>
                                        <SelectItem value="impressionism">Impressionism</SelectItem>
                                        <SelectItem value="expressionism">Expressionism</SelectItem>
                                        <SelectItem value="minimalism">Minimalism</SelectItem>
                                        <SelectItem value="realism">Realism</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="medium">Medium</Label>
                                <Input
                                    id="medium"
                                    placeholder="e.g., Oil on canvas"
                                    value={formData.medium}
                                    onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="width">Width (in)</Label>
                                <Input
                                    id="width"
                                    type="number"
                                    placeholder="24"
                                    value={formData.width}
                                    onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="height">Height (in)</Label>
                                <Input
                                    id="height"
                                    type="number"
                                    placeholder="36"
                                    value={formData.height}
                                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="depth">Depth (in)</Label>
                                <Input
                                    id="depth"
                                    type="number"
                                    placeholder="2"
                                    value={formData.depth}
                                    onChange={(e) => setFormData({ ...formData, depth: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="year">Year Created</Label>
                            <Input
                                id="year"
                                type="number"
                                value={formData.yearCreated}
                                onChange={(e) => setFormData({ ...formData, yearCreated: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="framed"
                                checked={formData.isFramed}
                                onChange={(e) => setFormData({ ...formData, isFramed: e.target.checked })}
                                className="h-4 w-4"
                            />
                            <Label htmlFor="framed" className="font-normal cursor-pointer">
                                Artwork is framed and ready to hang
                            </Label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button onClick={handlePublish} size="lg" className="flex-1" disabled={uploading}>
                                {uploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        Publish Artwork
                                    </>
                                )}
                            </Button>
                            <Button onClick={handleSaveDraft} variant="outline" size="lg" disabled={uploading}>
                                <Save className="mr-2 h-4 w-4" />
                                Save as Draft
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
