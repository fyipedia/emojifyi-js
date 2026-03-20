/**
 * EmojiFYI API client — TypeScript wrapper for emojifyi.com REST API.
 *
 * Zero dependencies. Uses native `fetch`.
 *
 * @example
 * ```ts
 * import { EmojiFYI } from "emojifyi";
 * const api = new EmojiFYI();
 * const items = await api.search("query");
 * ```
 */

/** Generic API response type. */
export interface ApiResponse {
  [key: string]: unknown;
}

export class EmojiFYI {
  private baseUrl: string;

  constructor(baseUrl = "https://emojifyi.com") {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  private async get<T = ApiResponse>(
    path: string,
    params?: Record<string, string>,
  ): Promise<T> {
    const url = new URL(path, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<T>;
  }

  // -- Endpoints ----------------------------------------------------------

  /** List all categories. */
  async listCategories(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/categories/", params);
  }

  /** Get category by slug. */
  async getCategory(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/categories/${slug}/`);
  }

  /** List all emojis. */
  async listEmojis(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/emojis/", params);
  }

  /** Get emoji by slug. */
  async getEmoji(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/emojis/${slug}/`);
  }

  /** List all faqs. */
  async listFaqs(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/faqs/", params);
  }

  /** Get faq by slug. */
  async getFaq(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/faqs/${slug}/`);
  }

  /** List all glossary. */
  async listGlossary(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/glossary/", params);
  }

  /** Get term by slug. */
  async getTerm(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/glossary/${slug}/`);
  }

  /** List all stories. */
  async listStories(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/stories/", params);
  }

  /** Get story by slug. */
  async getStory(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/stories/${slug}/`);
  }

  /** Search across all content. */
  async search(query: string, params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/search/", { q: query, ...params });
  }
}
