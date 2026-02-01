import api from '@/lib/api';

export interface GenerateBioRequest {
    style: string;
    medium: string;
    yearsActive?: number;
    location?: string;
    additionalInfo?: string;
}

export interface EnhanceDescriptionRequest {
    title: string;
    medium: string;
    rawDescription: string;
    style?: string;
    dimensions?: string;
}

export interface SuggestTagsRequest {
    title: string;
    description: string;
    medium: string;
    style?: string;
}

class AIService {
    /**
     * Generate artist biography using AI
     */
    async generateBio(data: GenerateBioRequest): Promise<string> {
        const response = await api.post('/ai/generate-bio', data);
        return response.data.bio;
    }

    /**
     * Enhance artwork description using AI
     */
    async enhanceDescription(data: EnhanceDescriptionRequest): Promise<string> {
        const response = await api.post('/ai/enhance-description', data);
        return response.data.description;
    }

    /**
     * Suggest tags for artwork using AI
     */
    async suggestTags(data: SuggestTagsRequest): Promise<string[]> {
        const response = await api.post('/ai/suggest-tags', data);
        return response.data.tags;
    }

    /**
     * Generate SEO metadata for artwork
     */
    async generateMeta(data: {
        title: string;
        medium: string;
        artistName: string;
        style?: string;
    }): Promise<{ title: string; description: string; keywords: string[] }> {
        const response = await api.post('/ai/generate-meta', data);
        return response.data;
    }
}

export default new AIService();
