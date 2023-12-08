export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact: {
        Row: {
          contact_id: number
          created_at: string
          folder: string | null
          frequency_num: number | null
          frequency_unit: Database["public"]["Enums"]["frequency_unit"] | null
          last_updated: string
          name: string
          notes: string | null
          relationship: string
          title: string | null
          user_id: number
        }
        Insert: {
          contact_id?: number
          created_at?: string
          folder?: string | null
          frequency_num?: number | null
          frequency_unit?: Database["public"]["Enums"]["frequency_unit"] | null
          last_updated?: string
          name: string
          notes?: string | null
          relationship: string
          title?: string | null
          user_id: number
        }
        Update: {
          contact_id?: number
          created_at?: string
          folder?: string | null
          frequency_num?: number | null
          frequency_unit?: Database["public"]["Enums"]["frequency_unit"] | null
          last_updated?: string
          name?: string
          notes?: string | null
          relationship?: string
          title?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "contact_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          }
        ]
      }
      meetup: {
        Row: {
          contact_id: number
          created_at: string
          details: string
          last_updated: string
          location: string | null
          meet_date: string
          meetup_id: number
        }
        Insert: {
          contact_id: number
          created_at?: string
          details: string
          last_updated?: string
          location?: string | null
          meet_date: string
          meetup_id?: number
        }
        Update: {
          contact_id?: number
          created_at?: string
          details?: string
          last_updated?: string
          location?: string | null
          meet_date?: string
          meetup_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "meetup_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["contact_id"]
          }
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string
          first_name: string
          last_name: string
          last_updated: string
          user_id: number
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          last_name: string
          last_updated?: string
          user_id?: number
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          last_name?: string
          last_updated?: string
          user_id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      frequency_unit: "day(s)" | "week(s)" | "month(s)" | "year(s)"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
