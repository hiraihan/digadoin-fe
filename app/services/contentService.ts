import { api } from "./api"
import { LandingPageContent, initialContent } from "@/app/types/content"
import { Page } from "@/app/types/api"

export const contentService = {
    get: async (slug: string = "home"): Promise<LandingPageContent> => {
        try {
            // Attempt to fetch from API
            const page = await api.get<Page>(`/cms/${slug}`)

            if (page && page.content) {
                // Parse the content string as JSON
                // The API spec says 'content' is a string. Assuming it stores the JSON string of the layout.
                try {
                    const parsed = JSON.parse(page.content);
                    // validated structural integrity if needed
                    return { ...initialContent, ...parsed };
                } catch (e) {
                    console.error("Failed to parse page content JSON", e);
                }
            }
        } catch (error) {
            console.warn("Failed to fetch content from API, falling back to initial content", error);
        }

        // Fallback to local default if API fails or empty
        return initialContent;
    },

    save: async (slug: string, content: LandingPageContent): Promise<void> => {
        // This would be for an admin CMS editor
        // We might not have the ID here easily without fetching first, 
        // so handling 'create' vs 'update' might be tricky without more context.
        // For now, this is a placeholder or strictly for the 'update' flow if we have ID.
        // But the API requires 'page_id' for updates.
        // We will skip full implementation of 'save' unless we build the Admin CMS Editor.
        console.warn("Save not fully implemented without page_id context");
    }
}
