import { Database } from '../database.types';
import { Meetup } from './Meetup';

export interface Contact {
    contact_id?: number,
    created_at?: string,
    folder?: string | null,
    frequency_num?: number | null,
    frequency_unit?: Database["public"]["Enums"]["frequency_unit"] | null,
    last_updated?: string,
    name: string,
    notes?: string | null,
    relationship: string,
    title?: string | null,
    user_id: number,
    meetup?: Meetup[],
}