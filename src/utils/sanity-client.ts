import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient, type ClientConfig, type SanityClient } from '@sanity/client';

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN, STACKBIT_PREVIEW, SANITY_PREVIEW_DRAFTS } = process.env;
const isDev = import.meta.env.DEV;
const isDeployPreview = process.env.CONTEXT === 'deploy-preview';
const previewDrafts = STACKBIT_PREVIEW?.toLowerCase() === 'true' || SANITY_PREVIEW_DRAFTS?.toLowerCase() === 'true';

export const sanityConfig: ClientConfig = {
    projectId: SANITY_PROJECT_ID || 'placeholder',
    dataset: SANITY_DATASET || 'production',
    useCdn: false,
    apiVersion: '2024-01-31',
    token: SANITY_TOKEN || 'placeholder',
    perspective: isDev || isDeployPreview || previewDrafts ? 'previewDrafts' : 'published'
};

export const client = SANITY_PROJECT_ID && SANITY_TOKEN && SANITY_PROJECT_ID !== 'placeholder' && SANITY_TOKEN !== 'placeholder' 
    ? createClient(sanityConfig) 
    : null;