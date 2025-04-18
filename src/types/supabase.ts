
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
      projects: {
        Row: {
          id: string
          name: string
          description: string
          client: string
          location: string
          start_date: string
          end_date: string
          budget: number
          status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed'
          completion: number
          manager_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          client: string
          location: string
          start_date: string
          end_date: string
          budget: number
          status?: 'Planning' | 'In Progress' | 'On Hold' | 'Completed'
          completion?: number
          manager_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          client?: string
          location?: string
          start_date?: string
          end_date?: string
          budget?: number
          status?: 'Planning' | 'In Progress' | 'On Hold' | 'Completed'
          completion?: number
          manager_id?: string
          created_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          name: string
          type: 'Material' | 'Equipment' | 'Labor'
          quantity: number
          unit: string
          cost: number
          status: 'Available' | 'Low Stock' | 'Out of Stock'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'Material' | 'Equipment' | 'Labor'
          quantity: number
          unit: string
          cost: number
          status?: 'Available' | 'Low Stock' | 'Out of Stock'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'Material' | 'Equipment' | 'Labor'
          quantity?: number
          unit?: string
          cost?: number
          status?: 'Available' | 'Low Stock' | 'Out of Stock'
          created_at?: string
        }
      }
      resource_allocations: {
        Row: {
          id: string
          resource_id: string
          project_id: string
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          resource_id: string
          project_id: string
          quantity: number
          created_at?: string
        }
        Update: {
          id?: string
          resource_id?: string
          project_id?: string
          quantity?: number
          created_at?: string
        }
      }
    }
  }
}
