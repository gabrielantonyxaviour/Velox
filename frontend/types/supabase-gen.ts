export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      agent_actions: {
        Row: {
          action_type: string
          agent_id: string | null
          completed_at: string | null
          config: Json | null
          created_at: string | null
          cron_expression: string | null
          description: string | null
          error_message: string | null
          frequency: string | null
          id: string
          is_recurring: boolean | null
          last_executed_at: string | null
          next_execution_at: string | null
          priority: number | null
          result: Json | null
          scheduled_for: string | null
          started_at: string | null
          status: string | null
          target_id: string | null
          target_type: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          action_type: string
          agent_id?: string | null
          completed_at?: string | null
          config?: Json | null
          created_at?: string | null
          cron_expression?: string | null
          description?: string | null
          error_message?: string | null
          frequency?: string | null
          id?: string
          is_recurring?: boolean | null
          last_executed_at?: string | null
          next_execution_at?: string | null
          priority?: number | null
          result?: Json | null
          scheduled_for?: string | null
          started_at?: string | null
          status?: string | null
          target_id?: string | null
          target_type?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          action_type?: string
          agent_id?: string | null
          completed_at?: string | null
          config?: Json | null
          created_at?: string | null
          cron_expression?: string | null
          description?: string | null
          error_message?: string | null
          frequency?: string | null
          id?: string
          is_recurring?: boolean | null
          last_executed_at?: string | null
          next_execution_at?: string | null
          priority?: number | null
          result?: Json | null
          scheduled_for?: string | null
          started_at?: string | null
          status?: string | null
          target_id?: string | null
          target_type?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_actions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_chats: {
        Row: {
          attachments: Json | null
          conversation_id: string | null
          created_at: string | null
          emotion: string | null
          id: string
          key_topics: string[] | null
          message: string
          metadata: Json | null
          sender_type: string
          sentiment: number | null
        }
        Insert: {
          attachments?: Json | null
          conversation_id?: string | null
          created_at?: string | null
          emotion?: string | null
          id?: string
          key_topics?: string[] | null
          message: string
          metadata?: Json | null
          sender_type: string
          sentiment?: number | null
        }
        Update: {
          attachments?: Json | null
          conversation_id?: string | null
          created_at?: string | null
          emotion?: string | null
          id?: string
          key_topics?: string[] | null
          message?: string
          metadata?: Json | null
          sender_type?: string
          sentiment?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_chats_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "agent_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_conversations: {
        Row: {
          agent_id: string | null
          channel: string | null
          created_at: string | null
          ended_at: string | null
          id: string
          outcome: string | null
          profile_id: string | null
          purpose: string | null
          sentiment_overall: number | null
          started_at: string | null
          status: string | null
          summary: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          channel?: string | null
          created_at?: string | null
          ended_at?: string | null
          id?: string
          outcome?: string | null
          profile_id?: string | null
          purpose?: string | null
          sentiment_overall?: number | null
          started_at?: string | null
          status?: string | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          channel?: string | null
          created_at?: string | null
          ended_at?: string | null
          id?: string
          outcome?: string | null
          profile_id?: string | null
          purpose?: string | null
          sentiment_overall?: number | null
          started_at?: string | null
          status?: string | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_conversations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_pay_api_keys: {
        Row: {
          can_manage_services: boolean | null
          can_view_analytics: boolean | null
          created_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          last_used_at: string | null
          name: string | null
          owner_address: string
        }
        Insert: {
          can_manage_services?: boolean | null
          can_view_analytics?: boolean | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          last_used_at?: string | null
          name?: string | null
          owner_address: string
        }
        Update: {
          can_manage_services?: boolean | null
          can_view_analytics?: boolean | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          last_used_at?: string | null
          name?: string | null
          owner_address?: string
        }
        Relationships: []
      }
      agent_pay_services: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          endpoint_url: string
          headers: Json | null
          icon_url: string | null
          id: string
          input_schema: Json | null
          is_active: boolean | null
          is_verified: boolean | null
          method: string | null
          name: string
          output_schema: Json | null
          owner_address: string
          price_per_request: number
          tags: string[] | null
          total_requests: number | null
          total_revenue: number | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          endpoint_url: string
          headers?: Json | null
          icon_url?: string | null
          id?: string
          input_schema?: Json | null
          is_active?: boolean | null
          is_verified?: boolean | null
          method?: string | null
          name: string
          output_schema?: Json | null
          owner_address: string
          price_per_request: number
          tags?: string[] | null
          total_requests?: number | null
          total_revenue?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          endpoint_url?: string
          headers?: Json | null
          icon_url?: string | null
          id?: string
          input_schema?: Json | null
          is_active?: boolean | null
          is_verified?: boolean | null
          method?: string | null
          name?: string
          output_schema?: Json | null
          owner_address?: string
          price_per_request?: number
          tags?: string[] | null
          total_requests?: number | null
          total_revenue?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      agent_pay_usage: {
        Row: {
          amount: number
          created_at: string | null
          demo_mode: boolean | null
          id: string
          latency_ms: number | null
          owner_address: string
          payer_address: string
          payment_verified: boolean | null
          request_body: Json | null
          request_timestamp: string | null
          response_preview: string | null
          response_status: number | null
          service_id: string | null
          tx_hash: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          demo_mode?: boolean | null
          id?: string
          latency_ms?: number | null
          owner_address: string
          payer_address: string
          payment_verified?: boolean | null
          request_body?: Json | null
          request_timestamp?: string | null
          response_preview?: string | null
          response_status?: number | null
          service_id?: string | null
          tx_hash?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          demo_mode?: boolean | null
          id?: string
          latency_ms?: number | null
          owner_address?: string
          payer_address?: string
          payment_verified?: boolean | null
          request_body?: Json | null
          request_timestamp?: string | null
          response_preview?: string | null
          response_status?: number | null
          service_id?: string | null
          tx_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_pay_usage_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "agent_pay_services"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          avatar_url: string | null
          character_prompt: string
          created_at: string | null
          display_name: string
          feelings: Json | null
          id: string
          last_active_at: string | null
          message_examples: Json | null
          mood: string | null
          name: string
          post_examples: Json | null
          socials: Json | null
          status: string | null
          updated_at: string | null
          voice_config: Json | null
        }
        Insert: {
          avatar_url?: string | null
          character_prompt: string
          created_at?: string | null
          display_name: string
          feelings?: Json | null
          id?: string
          last_active_at?: string | null
          message_examples?: Json | null
          mood?: string | null
          name: string
          post_examples?: Json | null
          socials?: Json | null
          status?: string | null
          updated_at?: string | null
          voice_config?: Json | null
        }
        Update: {
          avatar_url?: string | null
          character_prompt?: string
          created_at?: string | null
          display_name?: string
          feelings?: Json | null
          id?: string
          last_active_at?: string | null
          message_examples?: Json | null
          mood?: string | null
          name?: string
          post_examples?: Json | null
          socials?: Json | null
          status?: string | null
          updated_at?: string | null
          voice_config?: Json | null
        }
        Relationships: []
      }
      animoca_credential_schemas: {
        Row: {
          credential_schema: Json | null
          credential_type: string
          description: string | null
          id: string
          image: string | null
          issue_program_id: string | null
          name: string
          updated_at: string | null
          verify_program_id: string | null
        }
        Insert: {
          credential_schema?: Json | null
          credential_type: string
          description?: string | null
          id: string
          image?: string | null
          issue_program_id?: string | null
          name: string
          updated_at?: string | null
          verify_program_id?: string | null
        }
        Update: {
          credential_schema?: Json | null
          credential_type?: string
          description?: string | null
          id?: string
          image?: string | null
          issue_program_id?: string | null
          name?: string
          updated_at?: string | null
          verify_program_id?: string | null
        }
        Relationships: []
      }
      animoca_credentials: {
        Row: {
          category: string | null
          created_at: string | null
          credential_schema_id: string | null
          description: string | null
          id: string
          image_url: string | null
          issued_at: string | null
          name: string | null
          owner_address: string | null
          symbol: string | null
          token_address: string | null
          verification_tx_hash: string | null
          verified_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          credential_schema_id?: string | null
          description?: string | null
          id: string
          image_url?: string | null
          issued_at?: string | null
          name?: string | null
          owner_address?: string | null
          symbol?: string | null
          token_address?: string | null
          verification_tx_hash?: string | null
          verified_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          credential_schema_id?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          issued_at?: string | null
          name?: string | null
          owner_address?: string | null
          symbol?: string | null
          token_address?: string | null
          verification_tx_hash?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "animoca_fk_credentials_schema"
            columns: ["credential_schema_id"]
            isOneToOne: false
            referencedRelation: "animoca_credential_schemas"
            referencedColumns: ["id"]
          },
        ]
      }
      animoca_influencers: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          credential_id: string | null
          display_name: string
          github: string | null
          joined_date: string | null
          last_verification_date: string | null
          linkedin: string | null
          market_address: string | null
          reputation_score: number | null
          token_address: string | null
          token_name: string
          token_symbol: string
          twitter: string | null
          updated_at: string | null
          wallet_address: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          credential_id?: string | null
          display_name: string
          github?: string | null
          joined_date?: string | null
          last_verification_date?: string | null
          linkedin?: string | null
          market_address?: string | null
          reputation_score?: number | null
          token_address?: string | null
          token_name: string
          token_symbol: string
          twitter?: string | null
          updated_at?: string | null
          wallet_address: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          credential_id?: string | null
          display_name?: string
          github?: string | null
          joined_date?: string | null
          last_verification_date?: string | null
          linkedin?: string | null
          market_address?: string | null
          reputation_score?: number | null
          token_address?: string | null
          token_name?: string
          token_symbol?: string
          twitter?: string | null
          updated_at?: string | null
          wallet_address?: string
          website?: string | null
        }
        Relationships: []
      }
      animoca_trades: {
        Row: {
          amount: number
          created_at: string | null
          is_buy: boolean
          price: number | null
          token_address: string
          trader_address: string
          tx_hash: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          is_buy: boolean
          price?: number | null
          token_address: string
          trader_address: string
          tx_hash: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          is_buy?: boolean
          price?: number | null
          token_address?: string
          trader_address?: string
          tx_hash?: string
        }
        Relationships: []
      }
      businesses: {
        Row: {
          allow_public_access: boolean | null
          chat_enabled: boolean | null
          client_contact_ids: string[] | null
          client_pin_hash: string
          collaborator_pin_hash: string | null
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          name: string
          partner_contact_ids: string[] | null
          show_contacts: boolean | null
          show_meetings: boolean | null
          show_projects: boolean | null
          slug: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          allow_public_access?: boolean | null
          chat_enabled?: boolean | null
          client_contact_ids?: string[] | null
          client_pin_hash: string
          collaborator_pin_hash?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          partner_contact_ids?: string[] | null
          show_contacts?: boolean | null
          show_meetings?: boolean | null
          show_projects?: boolean | null
          slug: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          allow_public_access?: boolean | null
          chat_enabled?: boolean | null
          client_contact_ids?: string[] | null
          client_pin_hash?: string
          collaborator_pin_hash?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          partner_contact_ids?: string[] | null
          show_contacts?: boolean | null
          show_meetings?: boolean | null
          show_projects?: boolean | null
          slug?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      chats: {
        Row: {
          action_taken: boolean | null
          chat_references: Json | null
          conversation_id: string | null
          created_at: string | null
          deleted_at: string | null
          edited_at: string | null
          id: string
          importance_level: number | null
          message: string
          message_type: string | null
          metadata: Json | null
          requires_action: boolean | null
          sender: string
          sentiment: number | null
        }
        Insert: {
          action_taken?: boolean | null
          chat_references?: Json | null
          conversation_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          importance_level?: number | null
          message: string
          message_type?: string | null
          metadata?: Json | null
          requires_action?: boolean | null
          sender: string
          sentiment?: number | null
        }
        Update: {
          action_taken?: boolean | null
          chat_references?: Json | null
          conversation_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          importance_level?: number | null
          message?: string
          message_type?: string | null
          metadata?: Json | null
          requires_action?: boolean | null
          sender?: string
          sentiment?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "active_owner_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      comm_styles: {
        Row: {
          created_at: string | null
          created_by: number | null
          emoji_usage: boolean | null
          formality_level: number | null
          humor_level: number | null
          id: string
          is_custom: boolean | null
          is_default: boolean | null
          max_tokens: number | null
          name: string
          prompt: string
          temperature: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: number | null
          emoji_usage?: boolean | null
          formality_level?: number | null
          humor_level?: number | null
          id?: string
          is_custom?: boolean | null
          is_default?: boolean | null
          max_tokens?: number | null
          name: string
          prompt: string
          temperature?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: number | null
          emoji_usage?: boolean | null
          formality_level?: number | null
          humor_level?: number | null
          id?: string
          is_custom?: boolean | null
          is_default?: boolean | null
          max_tokens?: number | null
          name?: string
          prompt?: string
          temperature?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      commands: {
        Row: {
          category: string | null
          command: string
          created_at: string | null
          delegated_to: string | null
          error_message: string | null
          executed_by_agent_id: string | null
          execution_time_ms: number | null
          id: string
          output: string | null
          session_id: string | null
          status: string | null
        }
        Insert: {
          category?: string | null
          command: string
          created_at?: string | null
          delegated_to?: string | null
          error_message?: string | null
          executed_by_agent_id?: string | null
          execution_time_ms?: number | null
          id?: string
          output?: string | null
          session_id?: string | null
          status?: string | null
        }
        Update: {
          category?: string | null
          command?: string
          created_at?: string | null
          delegated_to?: string | null
          error_message?: string | null
          executed_by_agent_id?: string | null
          execution_time_ms?: number | null
          id?: string
          output?: string | null
          session_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commands_executed_by_agent_id_fkey"
            columns: ["executed_by_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commands_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          action_items: Json | null
          agent_id: string | null
          agent_mood: string | null
          agent_performance_rating: number | null
          business_id: string | null
          completed_at: string | null
          created_at: string | null
          decisions: Json | null
          id: string
          last_message_at: string | null
          outcome: string | null
          priority: string | null
          project_id: string | null
          purpose: string | null
          session_id: string | null
          started_at: string | null
          status: string | null
          summary: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          action_items?: Json | null
          agent_id?: string | null
          agent_mood?: string | null
          agent_performance_rating?: number | null
          business_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          decisions?: Json | null
          id?: string
          last_message_at?: string | null
          outcome?: string | null
          priority?: string | null
          project_id?: string | null
          purpose?: string | null
          session_id?: string | null
          started_at?: string | null
          status?: string | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          action_items?: Json | null
          agent_id?: string | null
          agent_mood?: string | null
          agent_performance_rating?: number | null
          business_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          decisions?: Json | null
          id?: string
          last_message_at?: string | null
          outcome?: string | null
          priority?: string | null
          project_id?: string | null
          purpose?: string | null
          session_id?: string | null
          started_at?: string | null
          status?: string | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      dxyperps_funding_history: {
        Row: {
          chain_id: number
          created_at: string | null
          funding_rate: number
          funding_time: string
          id: string
          market_id: string
          open_interest_long: number
          open_interest_short: number
        }
        Insert: {
          chain_id?: number
          created_at?: string | null
          funding_rate: number
          funding_time: string
          id?: string
          market_id: string
          open_interest_long: number
          open_interest_short: number
        }
        Update: {
          chain_id?: number
          created_at?: string | null
          funding_rate?: number
          funding_time?: string
          id?: string
          market_id?: string
          open_interest_long?: number
          open_interest_short?: number
        }
        Relationships: [
          {
            foreignKeyName: "dxyperps_funding_history_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_market_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_funding_history_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_markets"
            referencedColumns: ["id"]
          },
        ]
      }
      dxyperps_liquidations: {
        Row: {
          chain_id: number
          entry_price: number
          id: string
          leverage: number
          liquidated_at: string | null
          liquidation_price: number
          loss_amount: number
          market_id: string
          position_id: string
          position_type: string
          size: number
          trader_id: string
        }
        Insert: {
          chain_id?: number
          entry_price: number
          id?: string
          leverage: number
          liquidated_at?: string | null
          liquidation_price: number
          loss_amount: number
          market_id: string
          position_id: string
          position_type: string
          size: number
          trader_id: string
        }
        Update: {
          chain_id?: number
          entry_price?: number
          id?: string
          leverage?: number
          liquidated_at?: string | null
          liquidation_price?: number
          loss_amount?: number
          market_id?: string
          position_id?: string
          position_type?: string
          size?: number
          trader_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dxyperps_liquidations_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_market_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_liquidations_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_liquidations_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_liquidations_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_traders"
            referencedColumns: ["id"]
          },
        ]
      }
      dxyperps_markets: {
        Row: {
          base_asset: string
          chain_id: number
          created_at: string | null
          id: string
          initial_margin_rate: number
          is_active: boolean | null
          maintenance_margin_rate: number
          maker_fee: number
          max_leverage: number
          max_size: number
          min_size: number
          name: string
          quote_asset: string
          symbol: string
          taker_fee: number
          tick_size: number
        }
        Insert: {
          base_asset: string
          chain_id?: number
          created_at?: string | null
          id?: string
          initial_margin_rate?: number
          is_active?: boolean | null
          maintenance_margin_rate?: number
          maker_fee?: number
          max_leverage?: number
          max_size: number
          min_size: number
          name: string
          quote_asset?: string
          symbol: string
          taker_fee?: number
          tick_size: number
        }
        Update: {
          base_asset?: string
          chain_id?: number
          created_at?: string | null
          id?: string
          initial_margin_rate?: number
          is_active?: boolean | null
          maintenance_margin_rate?: number
          maker_fee?: number
          max_leverage?: number
          max_size?: number
          min_size?: number
          name?: string
          quote_asset?: string
          symbol?: string
          taker_fee?: number
          tick_size?: number
        }
        Relationships: []
      }
      dxyperps_orders: {
        Row: {
          chain_id: number
          created_at: string | null
          executed_at: string | null
          executed_price: number | null
          executed_size: number | null
          fee: number | null
          id: string
          leverage: number
          market_id: string
          order_type: string
          position_id: string | null
          price: number | null
          side: string
          size: number
          status: string
          trader_id: string
          tx_hash: string | null
        }
        Insert: {
          chain_id?: number
          created_at?: string | null
          executed_at?: string | null
          executed_price?: number | null
          executed_size?: number | null
          fee?: number | null
          id?: string
          leverage: number
          market_id: string
          order_type: string
          position_id?: string | null
          price?: number | null
          side: string
          size: number
          status?: string
          trader_id: string
          tx_hash?: string | null
        }
        Update: {
          chain_id?: number
          created_at?: string | null
          executed_at?: string | null
          executed_price?: number | null
          executed_size?: number | null
          fee?: number | null
          id?: string
          leverage?: number
          market_id?: string
          order_type?: string
          position_id?: string | null
          price?: number | null
          side?: string
          size?: number
          status?: string
          trader_id?: string
          tx_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dxyperps_orders_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_market_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_orders_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_orders_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_orders_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_positions_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_orders_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_orders_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_traders"
            referencedColumns: ["id"]
          },
        ]
      }
      dxyperps_position_history: {
        Row: {
          chain_id: number
          close_reason: string
          closed_at: string
          duration_minutes: number | null
          entry_price: number
          exit_price: number
          fees_paid: number
          funding_paid: number
          id: string
          leverage: number
          market_id: string
          opened_at: string
          pnl: number
          pnl_percentage: number
          position_id: string
          position_type: string
          size: number
          trader_id: string
        }
        Insert: {
          chain_id?: number
          close_reason: string
          closed_at: string
          duration_minutes?: number | null
          entry_price: number
          exit_price: number
          fees_paid: number
          funding_paid: number
          id?: string
          leverage: number
          market_id: string
          opened_at: string
          pnl: number
          pnl_percentage: number
          position_id: string
          position_type: string
          size: number
          trader_id: string
        }
        Update: {
          chain_id?: number
          close_reason?: string
          closed_at?: string
          duration_minutes?: number | null
          entry_price?: number
          exit_price?: number
          fees_paid?: number
          funding_paid?: number
          id?: string
          leverage?: number
          market_id?: string
          opened_at?: string
          pnl?: number
          pnl_percentage?: number
          position_id?: string
          position_type?: string
          size?: number
          trader_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dxyperps_position_history_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_market_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_position_history_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_position_history_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_position_history_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_traders"
            referencedColumns: ["id"]
          },
        ]
      }
      dxyperps_positions: {
        Row: {
          chain_id: number
          closed_at: string | null
          entry_price: number
          funding_paid: number
          id: string
          initial_margin: number
          last_funding_at: string | null
          leverage: number
          liquidation_price: number
          maintenance_margin: number
          margin_ratio: number
          mark_price: number
          market_id: string
          opened_at: string | null
          position_type: string
          realized_pnl: number
          size: number
          status: string
          stop_loss_price: number | null
          take_profit_price: number | null
          trader_id: string
          unrealized_pnl: number
          updated_at: string | null
        }
        Insert: {
          chain_id?: number
          closed_at?: string | null
          entry_price: number
          funding_paid?: number
          id?: string
          initial_margin: number
          last_funding_at?: string | null
          leverage: number
          liquidation_price: number
          maintenance_margin: number
          margin_ratio: number
          mark_price: number
          market_id: string
          opened_at?: string | null
          position_type: string
          realized_pnl?: number
          size: number
          status?: string
          stop_loss_price?: number | null
          take_profit_price?: number | null
          trader_id: string
          unrealized_pnl?: number
          updated_at?: string | null
        }
        Update: {
          chain_id?: number
          closed_at?: string | null
          entry_price?: number
          funding_paid?: number
          id?: string
          initial_margin?: number
          last_funding_at?: string | null
          leverage?: number
          liquidation_price?: number
          maintenance_margin?: number
          margin_ratio?: number
          mark_price?: number
          market_id?: string
          opened_at?: string | null
          position_type?: string
          realized_pnl?: number
          size?: number
          status?: string
          stop_loss_price?: number | null
          take_profit_price?: number | null
          trader_id?: string
          unrealized_pnl?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dxyperps_positions_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_market_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_positions_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_positions_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_positions_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_traders"
            referencedColumns: ["id"]
          },
        ]
      }
      dxyperps_price_snapshots: {
        Row: {
          chain_id: number
          close_price: number
          high_price: number
          id: string
          low_price: number
          market_id: string
          open_price: number
          timeframe: string
          timestamp: string
          volume: number
        }
        Insert: {
          chain_id?: number
          close_price: number
          high_price: number
          id?: string
          low_price: number
          market_id: string
          open_price: number
          timeframe: string
          timestamp: string
          volume: number
        }
        Update: {
          chain_id?: number
          close_price?: number
          high_price?: number
          id?: string
          low_price?: number
          market_id?: string
          open_price?: number
          timeframe?: string
          timestamp?: string
          volume?: number
        }
        Relationships: [
          {
            foreignKeyName: "dxyperps_price_snapshots_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_market_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_price_snapshots_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_markets"
            referencedColumns: ["id"]
          },
        ]
      }
      dxyperps_traders: {
        Row: {
          avatar_url: string | null
          chain_id: number
          created_at: string | null
          id: string
          is_active: boolean | null
          last_trade_at: string | null
          losses: number | null
          total_pnl: number | null
          total_trades: number | null
          total_volume: number | null
          updated_at: string | null
          username: string | null
          wallet_address: string
          wins: number | null
        }
        Insert: {
          avatar_url?: string | null
          chain_id?: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_trade_at?: string | null
          losses?: number | null
          total_pnl?: number | null
          total_trades?: number | null
          total_volume?: number | null
          updated_at?: string | null
          username?: string | null
          wallet_address: string
          wins?: number | null
        }
        Update: {
          avatar_url?: string | null
          chain_id?: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_trade_at?: string | null
          losses?: number | null
          total_pnl?: number | null
          total_trades?: number | null
          total_volume?: number | null
          updated_at?: string | null
          username?: string | null
          wallet_address?: string
          wins?: number | null
        }
        Relationships: []
      }
      ember_chat_messages: {
        Row: {
          created_at: string | null
          id: string
          is_seller: boolean | null
          message: string
          sender_address: string
          sender_name: string | null
          stream_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_seller?: boolean | null
          message: string
          sender_address: string
          sender_name?: string | null
          stream_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_seller?: boolean | null
          message?: string
          sender_address?: string
          sender_name?: string | null
          stream_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ember_chat_messages_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "ember_streams"
            referencedColumns: ["id"]
          },
        ]
      }
      ember_streams: {
        Row: {
          created_at: string | null
          ended_at: string | null
          featured_product_ids: number[] | null
          id: string
          is_live: boolean | null
          seller_address: string
          started_at: string | null
          youtube_url: string
        }
        Insert: {
          created_at?: string | null
          ended_at?: string | null
          featured_product_ids?: number[] | null
          id?: string
          is_live?: boolean | null
          seller_address: string
          started_at?: string | null
          youtube_url: string
        }
        Update: {
          created_at?: string | null
          ended_at?: string | null
          featured_product_ids?: number[] | null
          id?: string
          is_live?: boolean | null
          seller_address?: string
          started_at?: string | null
          youtube_url?: string
        }
        Relationships: []
      }
      frameworks: {
        Row: {
          branch_slug: string
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          repo_url: string
          updated_at: string | null
        }
        Insert: {
          branch_slug?: string
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          repo_url: string
          updated_at?: string | null
        }
        Update: {
          branch_slug?: string
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          repo_url?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      hackathons: {
        Row: {
          created_at: string | null
          dates: Json | null
          id: string
          link: string | null
          location: string | null
          name: string
          organizer: string
          organizer_logo_url: string | null
          slug: string | null
          tier: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          dates?: Json | null
          id?: string
          link?: string | null
          location?: string | null
          name: string
          organizer: string
          organizer_logo_url?: string | null
          slug?: string | null
          tier: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          dates?: Json | null
          id?: string
          link?: string | null
          location?: string | null
          name?: string
          organizer?: string
          organizer_logo_url?: string | null
          slug?: string | null
          tier?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      labang_chat_messages: {
        Row: {
          created_at: string | null
          gift_amount: number | null
          id: string
          message: string
          stream_id: string
          type: string | null
          user_address: string
          username: string | null
        }
        Insert: {
          created_at?: string | null
          gift_amount?: number | null
          id?: string
          message: string
          stream_id: string
          type?: string | null
          user_address: string
          username?: string | null
        }
        Update: {
          created_at?: string | null
          gift_amount?: number | null
          id?: string
          message?: string
          stream_id?: string
          type?: string | null
          user_address?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "labang_chat_messages_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "labang_streams"
            referencedColumns: ["id"]
          },
        ]
      }
      labang_daily_earnings: {
        Row: {
          comment_rewards: number | null
          date: string
          id: string
          total_rewards: number | null
          user_address: string
          watch_rewards: number | null
        }
        Insert: {
          comment_rewards?: number | null
          date: string
          id?: string
          total_rewards?: number | null
          user_address: string
          watch_rewards?: number | null
        }
        Update: {
          comment_rewards?: number | null
          date?: string
          id?: string
          total_rewards?: number | null
          user_address?: string
          watch_rewards?: number | null
        }
        Relationships: []
      }
      labang_orders: {
        Row: {
          buyer_address: string
          created_at: string | null
          id: string
          onchain_order_id: string | null
          product_id: string | null
          quantity: number | null
          seller_id: string | null
          shipping_address: string | null
          shipping_name: string | null
          shipping_phone: string | null
          status: string | null
          stream_id: string | null
          total_price_very: number
          tracking_number: string | null
          tx_hash: string | null
          updated_at: string | null
        }
        Insert: {
          buyer_address: string
          created_at?: string | null
          id?: string
          onchain_order_id?: string | null
          product_id?: string | null
          quantity?: number | null
          seller_id?: string | null
          shipping_address?: string | null
          shipping_name?: string | null
          shipping_phone?: string | null
          status?: string | null
          stream_id?: string | null
          total_price_very: number
          tracking_number?: string | null
          tx_hash?: string | null
          updated_at?: string | null
        }
        Update: {
          buyer_address?: string
          created_at?: string | null
          id?: string
          onchain_order_id?: string | null
          product_id?: string | null
          quantity?: number | null
          seller_id?: string | null
          shipping_address?: string | null
          shipping_name?: string | null
          shipping_phone?: string | null
          status?: string | null
          stream_id?: string | null
          total_price_very?: number
          tracking_number?: string | null
          tx_hash?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "labang_orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "labang_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labang_orders_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "labang_sellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labang_orders_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "labang_streams"
            referencedColumns: ["id"]
          },
        ]
      }
      labang_products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          description_ko: string | null
          id: string
          images: string[] | null
          inventory: number | null
          is_active: boolean | null
          price_very: number
          seller_id: string | null
          title: string
          title_ko: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          description_ko?: string | null
          id?: string
          images?: string[] | null
          inventory?: number | null
          is_active?: boolean | null
          price_very: number
          seller_id?: string | null
          title: string
          title_ko?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          description_ko?: string | null
          id?: string
          images?: string[] | null
          inventory?: number | null
          is_active?: boolean | null
          price_very?: number
          seller_id?: string | null
          title?: string
          title_ko?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "labang_products_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "labang_sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      labang_reviews: {
        Row: {
          buyer_address: string
          content: string | null
          created_at: string | null
          id: string
          is_verified: boolean | null
          onchain_review_id: string | null
          order_id: string | null
          photos: string[] | null
          product_id: string | null
          rating: number | null
          tx_hash: string | null
        }
        Insert: {
          buyer_address: string
          content?: string | null
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          onchain_review_id?: string | null
          order_id?: string | null
          photos?: string[] | null
          product_id?: string | null
          rating?: number | null
          tx_hash?: string | null
        }
        Update: {
          buyer_address?: string
          content?: string | null
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          onchain_review_id?: string | null
          order_id?: string | null
          photos?: string[] | null
          product_id?: string | null
          rating?: number | null
          tx_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "labang_reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "labang_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labang_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "labang_products"
            referencedColumns: ["id"]
          },
        ]
      }
      labang_rewards: {
        Row: {
          amount_very: number
          claimed: boolean | null
          claimed_at: string | null
          created_at: string | null
          id: string
          order_id: string | null
          review_id: string | null
          reward_type: string
          stream_id: string | null
          tx_hash: string | null
          user_address: string
        }
        Insert: {
          amount_very: number
          claimed?: boolean | null
          claimed_at?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          review_id?: string | null
          reward_type: string
          stream_id?: string | null
          tx_hash?: string | null
          user_address: string
        }
        Update: {
          amount_very?: number
          claimed?: boolean | null
          claimed_at?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          review_id?: string | null
          reward_type?: string
          stream_id?: string | null
          tx_hash?: string | null
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "labang_rewards_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "labang_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labang_rewards_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "labang_reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labang_rewards_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "labang_streams"
            referencedColumns: ["id"]
          },
        ]
      }
      labang_sellers: {
        Row: {
          banner_image: string | null
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_approved: boolean | null
          kyc_verified: boolean | null
          profile_image: string | null
          shop_name: string
          shop_name_ko: string | null
          updated_at: string | null
          wallet_address: string
        }
        Insert: {
          banner_image?: string | null
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_approved?: boolean | null
          kyc_verified?: boolean | null
          profile_image?: string | null
          shop_name: string
          shop_name_ko?: string | null
          updated_at?: string | null
          wallet_address: string
        }
        Update: {
          banner_image?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_approved?: boolean | null
          kyc_verified?: boolean | null
          profile_image?: string | null
          shop_name?: string
          shop_name_ko?: string | null
          updated_at?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      labang_stream_products: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          product_id: string | null
          special_price_very: number | null
          stream_id: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          product_id?: string | null
          special_price_very?: number | null
          stream_id?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          product_id?: string | null
          special_price_very?: number | null
          stream_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "labang_stream_products_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "labang_streams"
            referencedColumns: ["id"]
          },
        ]
      }
      labang_streams: {
        Row: {
          created_at: string | null
          ended_at: string | null
          id: string
          peak_viewers: number | null
          playback_url: string | null
          recording_url: string | null
          scheduled_at: string | null
          seller_id: string | null
          started_at: string | null
          status: string | null
          stream_key: string | null
          thumbnail: string | null
          title: string
          title_ko: string | null
          viewer_count: number | null
          youtube_url: string | null
        }
        Insert: {
          created_at?: string | null
          ended_at?: string | null
          id?: string
          peak_viewers?: number | null
          playback_url?: string | null
          recording_url?: string | null
          scheduled_at?: string | null
          seller_id?: string | null
          started_at?: string | null
          status?: string | null
          stream_key?: string | null
          thumbnail?: string | null
          title: string
          title_ko?: string | null
          viewer_count?: number | null
          youtube_url?: string | null
        }
        Update: {
          created_at?: string | null
          ended_at?: string | null
          id?: string
          peak_viewers?: number | null
          playback_url?: string | null
          recording_url?: string | null
          scheduled_at?: string | null
          seller_id?: string | null
          started_at?: string | null
          status?: string | null
          stream_key?: string | null
          thumbnail?: string | null
          title?: string
          title_ko?: string | null
          viewer_count?: number | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "labang_streams_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "labang_sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      labang_watch_sessions: {
        Row: {
          attention_check_pending: boolean | null
          created_at: string | null
          id: string
          is_active: boolean | null
          last_heartbeat: string | null
          started_at: string | null
          stream_id: string | null
          total_seconds: number | null
          user_address: string
        }
        Insert: {
          attention_check_pending?: boolean | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_heartbeat?: string | null
          started_at?: string | null
          stream_id?: string | null
          total_seconds?: number | null
          user_address: string
        }
        Update: {
          attention_check_pending?: boolean | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_heartbeat?: string | null
          started_at?: string | null
          stream_id?: string | null
          total_seconds?: number | null
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "labang_watch_sessions_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "labang_streams"
            referencedColumns: ["id"]
          },
        ]
      }
      liquidity_history: {
        Row: {
          action_type: string
          amount_usdc: number
          block_number: number | null
          created_at: string
          id: string
          lp_token_price: number
          lp_tokens: number
          pool_tvl_after: number
          timestamp: string
          total_lp_balance_after: number
          transaction_hash: string | null
          updated_at: string
          wallet_address: string
        }
        Insert: {
          action_type: string
          amount_usdc: number
          block_number?: number | null
          created_at?: string
          id?: string
          lp_token_price: number
          lp_tokens: number
          pool_tvl_after: number
          timestamp?: string
          total_lp_balance_after: number
          transaction_hash?: string | null
          updated_at?: string
          wallet_address: string
        }
        Update: {
          action_type?: string
          amount_usdc?: number
          block_number?: number | null
          created_at?: string
          id?: string
          lp_token_price?: number
          lp_tokens?: number
          pool_tvl_after?: number
          timestamp?: string
          total_lp_balance_after?: number
          transaction_hash?: string | null
          updated_at?: string
          wallet_address?: string
        }
        Relationships: []
      }
      meetings: {
        Row: {
          attendees: Json | null
          business_id: string | null
          created_at: string | null
          date: string
          description: string | null
          duration: number
          google_event_id: string | null
          id: string
          meeting_link: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          attendees?: Json | null
          business_id?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          duration?: number
          google_event_id?: string | null
          id?: string
          meeting_link?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          attendees?: Json | null
          business_id?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          duration?: number
          google_event_id?: string | null
          id?: string
          meeting_link?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meetings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      memories: {
        Row: {
          access_frequency: number | null
          agent_id: string | null
          category: string | null
          confidence_score: number | null
          content: string
          created_at: string | null
          decay_rate: number | null
          expires_at: string | null
          id: string
          importance_level: number | null
          last_accessed_at: string | null
          memory_type: string
          profile_id: string | null
          relevance_score: number | null
          structured_data: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          access_frequency?: number | null
          agent_id?: string | null
          category?: string | null
          confidence_score?: number | null
          content: string
          created_at?: string | null
          decay_rate?: number | null
          expires_at?: string | null
          id?: string
          importance_level?: number | null
          last_accessed_at?: string | null
          memory_type: string
          profile_id?: string | null
          relevance_score?: number | null
          structured_data?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          access_frequency?: number | null
          agent_id?: string | null
          category?: string | null
          confidence_score?: number | null
          content?: string
          created_at?: string | null
          decay_rate?: number | null
          expires_at?: string | null
          id?: string
          importance_level?: number | null
          last_accessed_at?: string | null
          memory_type?: string
          profile_id?: string | null
          relevance_score?: number | null
          structured_data?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "memories_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memories_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          title: string
          updated_at: string | null
          workflow_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          title: string
          updated_at?: string | null
          workflow_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "milestones_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      mocat_ai_ai_agents: {
        Row: {
          agent_description: string | null
          agent_id: string | null
          agent_name: string
          agent_version: string
          available_revenue: number | null
          capabilities: string[] | null
          card_url: string | null
          chain_id: number
          deployed_at: string | null
          developer_id: string | null
          endpoint: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_testnet: boolean
          losses: number | null
          per_analysis_fee: number | null
          specialization: string | null
          tee_deployment_url: string | null
          tee_logic_hash: string | null
          total_revenue: number | null
          total_validations: number | null
          updated_at: string | null
          wins: number | null
        }
        Insert: {
          agent_description?: string | null
          agent_id?: string | null
          agent_name: string
          agent_version?: string
          available_revenue?: number | null
          capabilities?: string[] | null
          card_url?: string | null
          chain_id?: number
          deployed_at?: string | null
          developer_id?: string | null
          endpoint?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_testnet?: boolean
          losses?: number | null
          per_analysis_fee?: number | null
          specialization?: string | null
          tee_deployment_url?: string | null
          tee_logic_hash?: string | null
          total_revenue?: number | null
          total_validations?: number | null
          updated_at?: string | null
          wins?: number | null
        }
        Update: {
          agent_description?: string | null
          agent_id?: string | null
          agent_name?: string
          agent_version?: string
          available_revenue?: number | null
          capabilities?: string[] | null
          card_url?: string | null
          chain_id?: number
          deployed_at?: string | null
          developer_id?: string | null
          endpoint?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_testnet?: boolean
          losses?: number | null
          per_analysis_fee?: number | null
          specialization?: string | null
          tee_deployment_url?: string | null
          tee_logic_hash?: string | null
          total_revenue?: number | null
          total_validations?: number | null
          updated_at?: string | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mocat_ai_ai_agents_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mocat_ai_clusters: {
        Row: {
          agent_ids: string[]
          chain_id: number
          cluster_name: string | null
          created_at: string | null
          hcs_topic_id: string | null
          id: string
          is_active: boolean | null
          is_testnet: boolean
          updated_at: string | null
          user_id: string | null
          user_preferences: Json | null
        }
        Insert: {
          agent_ids: string[]
          chain_id?: number
          cluster_name?: string | null
          created_at?: string | null
          hcs_topic_id?: string | null
          id?: string
          is_active?: boolean | null
          is_testnet?: boolean
          updated_at?: string | null
          user_id?: string | null
          user_preferences?: Json | null
        }
        Update: {
          agent_ids?: string[]
          chain_id?: number
          cluster_name?: string | null
          created_at?: string | null
          hcs_topic_id?: string | null
          id?: string
          is_active?: boolean | null
          is_testnet?: boolean
          updated_at?: string | null
          user_id?: string | null
          user_preferences?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "mocat_ai_clusters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mocat_ai_consensus_records: {
        Row: {
          agent_analyses: Json
          chain_id: number
          cluster_id: string
          consensus_breakdown: Json
          consensus_confidence: number
          consensus_decision: string
          created_at: string | null
          duration_ms: number | null
          execution_decision: string
          hcs_sequence_number: number | null
          hcs_topic_id: string | null
          id: string
          is_testnet: boolean
          orchestration_id: string
          signal_id: string
          user_id: string
        }
        Insert: {
          agent_analyses: Json
          chain_id?: number
          cluster_id: string
          consensus_breakdown: Json
          consensus_confidence: number
          consensus_decision: string
          created_at?: string | null
          duration_ms?: number | null
          execution_decision: string
          hcs_sequence_number?: number | null
          hcs_topic_id?: string | null
          id?: string
          is_testnet?: boolean
          orchestration_id: string
          signal_id: string
          user_id: string
        }
        Update: {
          agent_analyses?: Json
          chain_id?: number
          cluster_id?: string
          consensus_breakdown?: Json
          consensus_confidence?: number
          consensus_decision?: string
          created_at?: string | null
          duration_ms?: number | null
          execution_decision?: string
          hcs_sequence_number?: number | null
          hcs_topic_id?: string | null
          id?: string
          is_testnet?: boolean
          orchestration_id?: string
          signal_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mocat_ai_consensus_records_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_clusters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mocat_ai_consensus_records_signal_id_fkey"
            columns: ["signal_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_trading_signals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mocat_ai_consensus_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mocat_ai_copy_trading: {
        Row: {
          agent_fee_paid: number | null
          chain_id: number
          copy_amount: number
          created_at: string | null
          executed_at: string | null
          exit_price: number | null
          expert_fee_paid: number | null
          expert_trader_id: string | null
          follower_id: string | null
          id: string
          is_testnet: boolean
          leverage: number | null
          pnl_amount: number | null
          pnl_percent: number | null
          signal_id: string | null
          trade_status: string
          usdt_amount: number
        }
        Insert: {
          agent_fee_paid?: number | null
          chain_id?: number
          copy_amount: number
          created_at?: string | null
          executed_at?: string | null
          exit_price?: number | null
          expert_fee_paid?: number | null
          expert_trader_id?: string | null
          follower_id?: string | null
          id?: string
          is_testnet?: boolean
          leverage?: number | null
          pnl_amount?: number | null
          pnl_percent?: number | null
          signal_id?: string | null
          trade_status: string
          usdt_amount: number
        }
        Update: {
          agent_fee_paid?: number | null
          chain_id?: number
          copy_amount?: number
          created_at?: string | null
          executed_at?: string | null
          exit_price?: number | null
          expert_fee_paid?: number | null
          expert_trader_id?: string | null
          follower_id?: string | null
          id?: string
          is_testnet?: boolean
          leverage?: number | null
          pnl_amount?: number | null
          pnl_percent?: number | null
          signal_id?: string | null
          trade_status?: string
          usdt_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "mocat_ai_copy_trading_expert_trader_id_fkey"
            columns: ["expert_trader_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_expert_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mocat_ai_copy_trading_expert_trader_id_fkey"
            columns: ["expert_trader_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_expert_traders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mocat_ai_copy_trading_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mocat_ai_copy_trading_signal_id_fkey"
            columns: ["signal_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_trading_signals"
            referencedColumns: ["id"]
          },
        ]
      }
      mocat_ai_expert_traders: {
        Row: {
          available_revenue: number | null
          bio: string | null
          chain_id: number
          created_at: string | null
          id: string
          is_testnet: boolean
          is_verified: boolean | null
          losses: number | null
          profit_cut: number | null
          reputation_score: number | null
          total_followers: number | null
          total_loss_amount: number | null
          total_signals_posted: number | null
          total_win_amount: number | null
          user_id: string | null
          verification_date: string | null
          wins: number | null
        }
        Insert: {
          available_revenue?: number | null
          bio?: string | null
          chain_id?: number
          created_at?: string | null
          id?: string
          is_testnet?: boolean
          is_verified?: boolean | null
          losses?: number | null
          profit_cut?: number | null
          reputation_score?: number | null
          total_followers?: number | null
          total_loss_amount?: number | null
          total_signals_posted?: number | null
          total_win_amount?: number | null
          user_id?: string | null
          verification_date?: string | null
          wins?: number | null
        }
        Update: {
          available_revenue?: number | null
          bio?: string | null
          chain_id?: number
          created_at?: string | null
          id?: string
          is_testnet?: boolean
          is_verified?: boolean | null
          losses?: number | null
          profit_cut?: number | null
          reputation_score?: number | null
          total_followers?: number | null
          total_loss_amount?: number | null
          total_signals_posted?: number | null
          total_win_amount?: number | null
          user_id?: string | null
          verification_date?: string | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mocat_ai_expert_traders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mocat_ai_follows: {
        Row: {
          chain_id: number
          expert_trader_id: string
          followed_at: string | null
          follower_id: string
          id: string
          is_active: boolean | null
          is_testnet: boolean
        }
        Insert: {
          chain_id?: number
          expert_trader_id: string
          followed_at?: string | null
          follower_id: string
          id?: string
          is_active?: boolean | null
          is_testnet?: boolean
        }
        Update: {
          chain_id?: number
          expert_trader_id?: string
          followed_at?: string | null
          follower_id?: string
          id?: string
          is_active?: boolean | null
          is_testnet?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "mocat_ai_follows_expert_trader_id_fkey"
            columns: ["expert_trader_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_expert_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mocat_ai_follows_expert_trader_id_fkey"
            columns: ["expert_trader_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_expert_traders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mocat_ai_follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mocat_ai_moca_credentials: {
        Row: {
          chain_id: number
          created_at: string | null
          credential_id: string
          credential_type: string
          expiration_date: string | null
          id: string
          is_testnet: boolean
          issuer_did: string
          metadata: Json | null
          user_id: string | null
          verification_date: string | null
          verification_status: string
          verification_tx_hash: string
        }
        Insert: {
          chain_id?: number
          created_at?: string | null
          credential_id: string
          credential_type: string
          expiration_date?: string | null
          id?: string
          is_testnet?: boolean
          issuer_did: string
          metadata?: Json | null
          user_id?: string | null
          verification_date?: string | null
          verification_status: string
          verification_tx_hash: string
        }
        Update: {
          chain_id?: number
          created_at?: string | null
          credential_id?: string
          credential_type?: string
          expiration_date?: string | null
          id?: string
          is_testnet?: boolean
          issuer_did?: string
          metadata?: Json | null
          user_id?: string | null
          verification_date?: string | null
          verification_status?: string
          verification_tx_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "mocat_ai_moca_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mocat_ai_signal_validations: {
        Row: {
          agent_id: string | null
          chain_id: number
          confidence_score: number | null
          id: string
          is_testnet: boolean
          reasoning: string | null
          signal_id: string | null
          validated_at: string | null
          validation_data: Json | null
          validation_result: string
        }
        Insert: {
          agent_id?: string | null
          chain_id?: number
          confidence_score?: number | null
          id?: string
          is_testnet?: boolean
          reasoning?: string | null
          signal_id?: string | null
          validated_at?: string | null
          validation_data?: Json | null
          validation_result: string
        }
        Update: {
          agent_id?: string | null
          chain_id?: number
          confidence_score?: number | null
          id?: string
          is_testnet?: boolean
          reasoning?: string | null
          signal_id?: string | null
          validated_at?: string | null
          validation_data?: Json | null
          validation_result?: string
        }
        Relationships: [
          {
            foreignKeyName: "mocat_ai_signal_validations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_agent_performance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mocat_ai_signal_validations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_ai_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mocat_ai_signal_validations_signal_id_fkey"
            columns: ["signal_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_trading_signals"
            referencedColumns: ["id"]
          },
        ]
      }
      mocat_ai_trading_signals: {
        Row: {
          actual_exit_price: number | null
          chain: string
          chain_id: number
          closed_at: string | null
          confidence_score: number | null
          direction: string
          entry_price: number
          expert_trader_id: string | null
          id: string
          is_testnet: boolean
          leverage: number | null
          pnl_percentage: number | null
          posted_at: string | null
          protocol: string
          reasoning: string | null
          stop_loss: number | null
          take_profit: number | null
          trade_status: string
          trading_pair: string
        }
        Insert: {
          actual_exit_price?: number | null
          chain: string
          chain_id?: number
          closed_at?: string | null
          confidence_score?: number | null
          direction: string
          entry_price: number
          expert_trader_id?: string | null
          id?: string
          is_testnet?: boolean
          leverage?: number | null
          pnl_percentage?: number | null
          posted_at?: string | null
          protocol: string
          reasoning?: string | null
          stop_loss?: number | null
          take_profit?: number | null
          trade_status?: string
          trading_pair: string
        }
        Update: {
          actual_exit_price?: number | null
          chain?: string
          chain_id?: number
          closed_at?: string | null
          confidence_score?: number | null
          direction?: string
          entry_price?: number
          expert_trader_id?: string | null
          id?: string
          is_testnet?: boolean
          leverage?: number | null
          pnl_percentage?: number | null
          posted_at?: string | null
          protocol?: string
          reasoning?: string | null
          stop_loss?: number | null
          take_profit?: number | null
          trade_status?: string
          trading_pair?: string
        }
        Relationships: [
          {
            foreignKeyName: "mocat_ai_trading_signals_expert_trader_id_fkey"
            columns: ["expert_trader_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_expert_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mocat_ai_trading_signals_expert_trader_id_fkey"
            columns: ["expert_trader_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_expert_traders"
            referencedColumns: ["id"]
          },
        ]
      }
      mocat_ai_users: {
        Row: {
          chain_id: number
          created_at: string | null
          display_name: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_testnet: boolean
          line_user_id: string | null
          smart_account_address: string | null
          updated_at: string | null
          wallet_address: string
        }
        Insert: {
          chain_id?: number
          created_at?: string | null
          display_name?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_testnet?: boolean
          line_user_id?: string | null
          smart_account_address?: string | null
          updated_at?: string | null
          wallet_address: string
        }
        Update: {
          chain_id?: number
          created_at?: string | null
          display_name?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_testnet?: boolean
          line_user_id?: string | null
          smart_account_address?: string | null
          updated_at?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_label: string | null
          action_url: string | null
          agent_id: string | null
          business_id: string | null
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          priority: string | null
          profile_id: string | null
          project_id: string | null
          read_at: string | null
          status: string | null
          title: string
          type: string
        }
        Insert: {
          action_label?: string | null
          action_url?: string | null
          agent_id?: string | null
          business_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          priority?: string | null
          profile_id?: string | null
          project_id?: string | null
          read_at?: string | null
          status?: string | null
          title: string
          type: string
        }
        Update: {
          action_label?: string | null
          action_url?: string | null
          agent_id?: string | null
          business_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          priority?: string | null
          profile_id?: string | null
          project_id?: string | null
          read_at?: string | null
          status?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      playwright_allocations: {
        Row: {
          allocated_at: string | null
          category: string
          created_at: string | null
          id: string
          instance_number: number
          metadata: Json | null
          port: number
          project_id: string | null
          released_at: string | null
          server_id: string
          session_id: string | null
          status: string | null
          storage_state_path: string
          updated_at: string | null
        }
        Insert: {
          allocated_at?: string | null
          category: string
          created_at?: string | null
          id?: string
          instance_number: number
          metadata?: Json | null
          port: number
          project_id?: string | null
          released_at?: string | null
          server_id: string
          session_id?: string | null
          status?: string | null
          storage_state_path: string
          updated_at?: string | null
        }
        Update: {
          allocated_at?: string | null
          category?: string
          created_at?: string | null
          id?: string
          instance_number?: number
          metadata?: Json | null
          port?: number
          project_id?: string | null
          released_at?: string | null
          server_id?: string
          session_id?: string | null
          status?: string | null
          storage_state_path?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playwright_allocations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playwright_allocations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playwright_allocations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          character_id: number
          created_at: string | null
          feelings: Json | null
          id: string
          name: string | null
          notes: string | null
          pfp: string | null
          socials: Json | null
          style: Json | null
          updated_at: string | null
        }
        Insert: {
          character_id: number
          created_at?: string | null
          feelings?: Json | null
          id?: string
          name?: string | null
          notes?: string | null
          pfp?: string | null
          socials?: Json | null
          style?: Json | null
          updated_at?: string | null
        }
        Update: {
          character_id?: number
          created_at?: string | null
          feelings?: Json | null
          id?: string
          name?: string | null
          notes?: string | null
          pfp?: string | null
          socials?: Json | null
          style?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_b2b_clients: {
        Row: {
          business_id: string
          client_company: string | null
          client_email: string | null
          client_name: string
          contract_end_date: string | null
          created_at: string | null
          customer_since: string
          id: string
          metadata: Json | null
          mrr: number
          notes: string | null
          plan: string
          project_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          business_id: string
          client_company?: string | null
          client_email?: string | null
          client_name: string
          contract_end_date?: string | null
          created_at?: string | null
          customer_since: string
          id?: string
          metadata?: Json | null
          mrr?: number
          notes?: string | null
          plan: string
          project_id: string
          status: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          client_company?: string | null
          client_email?: string | null
          client_name?: string
          contract_end_date?: string | null
          created_at?: string | null
          customer_since?: string
          id?: string
          metadata?: Json | null
          mrr?: number
          notes?: string | null
          plan?: string
          project_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_b2b_clients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_b2b_clients_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_b2b_clients_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_network_activity: {
        Row: {
          business_id: string
          created_at: string | null
          id: string
          last_updated: string | null
          network: string
          percentage: number
          project_id: string
          tx_count: number
        }
        Insert: {
          business_id: string
          created_at?: string | null
          id?: string
          last_updated?: string | null
          network: string
          percentage?: number
          project_id: string
          tx_count?: number
        }
        Update: {
          business_id?: string
          created_at?: string | null
          id?: string
          last_updated?: string | null
          network?: string
          percentage?: number
          project_id?: string
          tx_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_network_activity_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_network_activity_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_network_activity_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_onchain_metrics: {
        Row: {
          additional_metrics: Json | null
          avg_tps: number | null
          business_id: string
          created_at: string | null
          id: string
          last_updated: string | null
          network: string
          profit: number | null
          project_id: string
          total_volume: number | null
          transaction_count: number | null
        }
        Insert: {
          additional_metrics?: Json | null
          avg_tps?: number | null
          business_id: string
          created_at?: string | null
          id?: string
          last_updated?: string | null
          network: string
          profit?: number | null
          project_id: string
          total_volume?: number | null
          transaction_count?: number | null
        }
        Update: {
          additional_metrics?: Json | null
          avg_tps?: number | null
          business_id?: string
          created_at?: string | null
          id?: string
          last_updated?: string | null
          network?: string
          profit?: number | null
          project_id?: string
          total_volume?: number | null
          transaction_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_onchain_metrics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_onchain_metrics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_onchain_metrics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_onchain_transactions: {
        Row: {
          amount: number
          business_id: string
          created_at: string | null
          from_address: string | null
          id: string
          metadata: Json | null
          network: string
          occurred_at: string
          project_id: string
          status: string
          to_address: string | null
          tx_hash: string
          tx_type: string
        }
        Insert: {
          amount: number
          business_id: string
          created_at?: string | null
          from_address?: string | null
          id?: string
          metadata?: Json | null
          network: string
          occurred_at: string
          project_id: string
          status: string
          to_address?: string | null
          tx_hash: string
          tx_type: string
        }
        Update: {
          amount?: number
          business_id?: string
          created_at?: string | null
          from_address?: string | null
          id?: string
          metadata?: Json | null
          network?: string
          occurred_at?: string
          project_id?: string
          status?: string
          to_address?: string | null
          tx_hash?: string
          tx_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_onchain_transactions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_onchain_transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_onchain_transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_social_activities: {
        Row: {
          activity_type: string
          business_id: string
          created_at: string | null
          description: string
          id: string
          metadata: Json | null
          occurred_at: string
          platform: string
          project_id: string
        }
        Insert: {
          activity_type: string
          business_id: string
          created_at?: string | null
          description: string
          id?: string
          metadata?: Json | null
          occurred_at: string
          platform: string
          project_id: string
        }
        Update: {
          activity_type?: string
          business_id?: string
          created_at?: string | null
          description?: string
          id?: string
          metadata?: Json | null
          occurred_at?: string
          platform?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_social_activities_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_social_activities_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_social_activities_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_social_metrics: {
        Row: {
          business_id: string
          created_at: string | null
          id: string
          last_updated: string | null
          metrics: Json
          platform: string
          project_id: string
          sentiment_negative: number | null
          sentiment_neutral: number | null
          sentiment_positive: number | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          id?: string
          last_updated?: string | null
          metrics?: Json
          platform: string
          project_id: string
          sentiment_negative?: number | null
          sentiment_neutral?: number | null
          sentiment_positive?: number | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          id?: string
          last_updated?: string | null
          metrics?: Json
          platform?: string
          project_id?: string
          sentiment_negative?: number | null
          sentiment_neutral?: number | null
          sentiment_positive?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_social_metrics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_social_metrics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_social_metrics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_wallets: {
        Row: {
          address: string
          balance: number | null
          chain: string
          created_at: string | null
          ecosystem: string
          funding_count: number | null
          id: string
          last_balance_check: string | null
          last_funded_at: string | null
          metadata: Json | null
          mnemonic: string | null
          private_key: string
          project_id: string
          public_key: string | null
          secret_key: string | null
          total_funded: number | null
          updated_at: string | null
        }
        Insert: {
          address: string
          balance?: number | null
          chain: string
          created_at?: string | null
          ecosystem: string
          funding_count?: number | null
          id?: string
          last_balance_check?: string | null
          last_funded_at?: string | null
          metadata?: Json | null
          mnemonic?: string | null
          private_key: string
          project_id: string
          public_key?: string | null
          secret_key?: string | null
          total_funded?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          balance?: number | null
          chain?: string
          created_at?: string | null
          ecosystem?: string
          funding_count?: number | null
          id?: string
          last_balance_check?: string | null
          last_funded_at?: string | null
          metadata?: Json | null
          mnemonic?: string | null
          private_key?: string
          project_id?: string
          public_key?: string | null
          secret_key?: string | null
          total_funded?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_wallets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_wallets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          association_type: string | null
          business_id: string | null
          completed_at: string | null
          contract_addresses: Json | null
          created_at: string | null
          description: string | null
          framework_id: string | null
          hackathon_id: string | null
          id: string
          image_url: string | null
          is_template: boolean | null
          managing_agent_id: string | null
          prd: string | null
          primary_network: string | null
          project_path: string | null
          public_url: string | null
          readme: string | null
          repo_slug: string | null
          repo_url: string | null
          social_links: Json | null
          started_at: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          association_type?: string | null
          business_id?: string | null
          completed_at?: string | null
          contract_addresses?: Json | null
          created_at?: string | null
          description?: string | null
          framework_id?: string | null
          hackathon_id?: string | null
          id?: string
          image_url?: string | null
          is_template?: boolean | null
          managing_agent_id?: string | null
          prd?: string | null
          primary_network?: string | null
          project_path?: string | null
          public_url?: string | null
          readme?: string | null
          repo_slug?: string | null
          repo_url?: string | null
          social_links?: Json | null
          started_at?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          association_type?: string | null
          business_id?: string | null
          completed_at?: string | null
          contract_addresses?: Json | null
          created_at?: string | null
          description?: string | null
          framework_id?: string | null
          hackathon_id?: string | null
          id?: string
          image_url?: string | null
          is_template?: boolean | null
          managing_agent_id?: string | null
          prd?: string | null
          primary_network?: string | null
          project_path?: string | null
          public_url?: string | null
          readme?: string | null
          repo_slug?: string | null
          repo_url?: string | null
          social_links?: Json | null
          started_at?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_framework_id_fkey"
            columns: ["framework_id"]
            isOneToOne: false
            referencedRelation: "frameworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_hackathon_id_fkey"
            columns: ["hackathon_id"]
            isOneToOne: false
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_managing_agent_id_fkey"
            columns: ["managing_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      sentinel_api_keys: {
        Row: {
          created_at: string | null
          id: string
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          id?: string
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "sentinel_api_keys_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "sentinel_users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      sentinel_projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          network: string | null
          updated_at: string | null
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          network?: string | null
          updated_at?: string | null
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          network?: string | null
          updated_at?: string | null
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "sentinel_projects_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "sentinel_users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      sentinel_prover_runs: {
        Row: {
          code: string
          created_at: string | null
          duration_ms: number | null
          error_message: string | null
          id: string
          modules: Json | null
          project_id: string | null
          results: Json | null
          status: string
          wallet_address: string
        }
        Insert: {
          code: string
          created_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          modules?: Json | null
          project_id?: string | null
          results?: Json | null
          status: string
          wallet_address: string
        }
        Update: {
          code?: string
          created_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          modules?: Json | null
          project_id?: string | null
          results?: Json | null
          status?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "sentinel_prover_runs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "sentinel_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentinel_prover_runs_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "sentinel_users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      sentinel_simulations: {
        Row: {
          arguments: Json | null
          created_at: string | null
          error_message: string | null
          events: Json | null
          function_name: string
          gas_used: number | null
          id: string
          module_address: string
          module_name: string
          network: string
          project_id: string | null
          sender_address: string
          state_changes: Json | null
          success: boolean
          type_arguments: Json | null
          vm_status: string | null
          wallet_address: string
        }
        Insert: {
          arguments?: Json | null
          created_at?: string | null
          error_message?: string | null
          events?: Json | null
          function_name: string
          gas_used?: number | null
          id?: string
          module_address: string
          module_name: string
          network: string
          project_id?: string | null
          sender_address: string
          state_changes?: Json | null
          success: boolean
          type_arguments?: Json | null
          vm_status?: string | null
          wallet_address: string
        }
        Update: {
          arguments?: Json | null
          created_at?: string | null
          error_message?: string | null
          events?: Json | null
          function_name?: string
          gas_used?: number | null
          id?: string
          module_address?: string
          module_name?: string
          network?: string
          project_id?: string | null
          sender_address?: string
          state_changes?: Json | null
          success?: boolean
          type_arguments?: Json | null
          vm_status?: string | null
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "sentinel_simulations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "sentinel_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentinel_simulations_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "sentinel_users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      sentinel_team_invites: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          invite_token: string
          invited_by: string
          role: string
          team_id: string
          used_at: string | null
          used_by: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          invite_token: string
          invited_by: string
          role?: string
          team_id: string
          used_at?: string | null
          used_by?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          invite_token?: string
          invited_by?: string
          role?: string
          team_id?: string
          used_at?: string | null
          used_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sentinel_team_invites_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "sentinel_users"
            referencedColumns: ["wallet_address"]
          },
          {
            foreignKeyName: "sentinel_team_invites_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "sentinel_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentinel_team_invites_used_by_fkey"
            columns: ["used_by"]
            isOneToOne: false
            referencedRelation: "sentinel_users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      sentinel_team_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string
          team_id: string
          wallet_address: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role?: string
          team_id: string
          wallet_address: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string
          team_id?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "sentinel_team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "sentinel_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentinel_team_members_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "sentinel_users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      sentinel_teams: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_wallet: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_wallet: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_wallet?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sentinel_teams_owner_wallet_fkey"
            columns: ["owner_wallet"]
            isOneToOne: false
            referencedRelation: "sentinel_users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      sentinel_users: {
        Row: {
          created_at: string | null
          last_login_at: string | null
          updated_at: string | null
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          last_login_at?: string | null
          updated_at?: string | null
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          last_login_at?: string | null
          updated_at?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      service_key_audit_log: {
        Row: {
          action: string
          created_at: string | null
          hedera_account_id: string | null
          hedera_transaction_id: string | null
          id: string
          ip_address: unknown
          metadata: Json | null
          performed_by: string | null
          service_key_public: string
        }
        Insert: {
          action: string
          created_at?: string | null
          hedera_account_id?: string | null
          hedera_transaction_id?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          performed_by?: string | null
          service_key_public: string
        }
        Update: {
          action?: string
          created_at?: string | null
          hedera_account_id?: string | null
          hedera_transaction_id?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          performed_by?: string | null
          service_key_public?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_key_audit_log_hedera_account_id_fkey"
            columns: ["hedera_account_id"]
            isOneToOne: false
            referencedRelation: "vault_fee_accounts"
            referencedColumns: ["hedera_account_id"]
          },
        ]
      }
      sessions: {
        Row: {
          checkpoint_data: Json | null
          context_usage: number | null
          created_at: string | null
          id: string
          input_token_count: number | null
          last_activity_at: string | null
          managing_agent_id: string | null
          output_logs: Json | null
          output_token_count: number | null
          paused_at: string | null
          project_id: string | null
          project_path: string | null
          session_identifier: string
          started_at: string | null
          status: string | null
          terminated_at: string | null
          thinking_logs: Json | null
          tool_calls: Json | null
          updated_at: string | null
        }
        Insert: {
          checkpoint_data?: Json | null
          context_usage?: number | null
          created_at?: string | null
          id?: string
          input_token_count?: number | null
          last_activity_at?: string | null
          managing_agent_id?: string | null
          output_logs?: Json | null
          output_token_count?: number | null
          paused_at?: string | null
          project_id?: string | null
          project_path?: string | null
          session_identifier: string
          started_at?: string | null
          status?: string | null
          terminated_at?: string | null
          thinking_logs?: Json | null
          tool_calls?: Json | null
          updated_at?: string | null
        }
        Update: {
          checkpoint_data?: Json | null
          context_usage?: number | null
          created_at?: string | null
          id?: string
          input_token_count?: number | null
          last_activity_at?: string | null
          managing_agent_id?: string | null
          output_logs?: Json | null
          output_token_count?: number | null
          paused_at?: string | null
          project_id?: string | null
          project_path?: string | null
          session_identifier?: string
          started_at?: string | null
          status?: string | null
          terminated_at?: string | null
          thinking_logs?: Json | null
          tool_calls?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_managing_agent_id_fkey"
            columns: ["managing_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      shinroe_users: {
        Row: {
          address: string
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          verychat_handle: string | null
          verychat_id: string | null
        }
        Insert: {
          address: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          verychat_handle?: string | null
          verychat_id?: string | null
        }
        Update: {
          address?: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          verychat_handle?: string | null
          verychat_id?: string | null
        }
        Relationships: []
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      tangentx_market_stats: {
        Row: {
          close_price: number
          date: string
          high_price: number
          id: number
          low_price: number
          market_id: number
          open_price: number
          trade_count: number | null
          volume: number | null
        }
        Insert: {
          close_price: number
          date?: string
          high_price: number
          id?: number
          low_price: number
          market_id: number
          open_price: number
          trade_count?: number | null
          volume?: number | null
        }
        Update: {
          close_price?: number
          date?: string
          high_price?: number
          id?: number
          low_price?: number
          market_id?: number
          open_price?: number
          trade_count?: number | null
          volume?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tangentx_market_stats_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "tangentx_markets"
            referencedColumns: ["id"]
          },
        ]
      }
      tangentx_markets: {
        Row: {
          active: boolean | null
          baseline_index: number
          credential_type: string
          current_index: number
          description: string | null
          funding_rate: number | null
          id: number
          image_url: string | null
          last_update: string | null
          max_leverage: number | null
          max_position_size: number | null
          min_position_size: number | null
          name: string
          total_long: number | null
          total_short: number | null
        }
        Insert: {
          active?: boolean | null
          baseline_index?: number
          credential_type: string
          current_index?: number
          description?: string | null
          funding_rate?: number | null
          id?: number
          image_url?: string | null
          last_update?: string | null
          max_leverage?: number | null
          max_position_size?: number | null
          min_position_size?: number | null
          name: string
          total_long?: number | null
          total_short?: number | null
        }
        Update: {
          active?: boolean | null
          baseline_index?: number
          credential_type?: string
          current_index?: number
          description?: string | null
          funding_rate?: number | null
          id?: number
          image_url?: string | null
          last_update?: string | null
          max_leverage?: number | null
          max_position_size?: number | null
          min_position_size?: number | null
          name?: string
          total_long?: number | null
          total_short?: number | null
        }
        Relationships: []
      }
      tangentx_positions: {
        Row: {
          closed_at: string | null
          collateral: number
          created_at: string | null
          entry_price: number
          funding_paid: number | null
          id: string
          is_long: boolean
          last_funding_update: string | null
          leverage: number
          market_id: number
          realized_pnl: number | null
          size: number
          status: string | null
          user_address: string
        }
        Insert: {
          closed_at?: string | null
          collateral: number
          created_at?: string | null
          entry_price: number
          funding_paid?: number | null
          id?: string
          is_long: boolean
          last_funding_update?: string | null
          leverage: number
          market_id: number
          realized_pnl?: number | null
          size: number
          status?: string | null
          user_address: string
        }
        Update: {
          closed_at?: string | null
          collateral?: number
          created_at?: string | null
          entry_price?: number
          funding_paid?: number | null
          id?: string
          is_long?: boolean
          last_funding_update?: string | null
          leverage?: number
          market_id?: number
          realized_pnl?: number | null
          size?: number
          status?: string | null
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "tangentx_positions_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "tangentx_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tangentx_positions_user_address_fkey"
            columns: ["user_address"]
            isOneToOne: false
            referencedRelation: "tangentx_users"
            referencedColumns: ["address"]
          },
        ]
      }
      tangentx_trades: {
        Row: {
          action: string
          block_number: number | null
          fee: number
          gas_fee: number | null
          id: string
          position_id: string
          price: number
          size: number
          timestamp: string | null
          tx_hash: string | null
        }
        Insert: {
          action: string
          block_number?: number | null
          fee: number
          gas_fee?: number | null
          id?: string
          position_id: string
          price: number
          size: number
          timestamp?: string | null
          tx_hash?: string | null
        }
        Update: {
          action?: string
          block_number?: number | null
          fee?: number
          gas_fee?: number | null
          id?: string
          position_id?: string
          price?: number
          size?: number
          timestamp?: string | null
          tx_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tangentx_trades_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "tangentx_positions"
            referencedColumns: ["id"]
          },
        ]
      }
      tangentx_users: {
        Row: {
          address: string
          collateral_balance: number | null
          created_at: string | null
          id: string
          last_login: string | null
          referral_code: string | null
          referred_by: string | null
          total_pnl: number | null
          trade_count: number | null
        }
        Insert: {
          address: string
          collateral_balance?: number | null
          created_at?: string | null
          id?: string
          last_login?: string | null
          referral_code?: string | null
          referred_by?: string | null
          total_pnl?: number | null
          trade_count?: number | null
        }
        Update: {
          address?: string
          collateral_balance?: number | null
          created_at?: string | null
          id?: string
          last_login?: string | null
          referral_code?: string | null
          referred_by?: string | null
          total_pnl?: number | null
          trade_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tangentx_users_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "tangentx_users"
            referencedColumns: ["address"]
          },
        ]
      }
      task_dependencies: {
        Row: {
          created_at: string | null
          depends_on_task_id: string | null
          id: string
          task_id: string | null
        }
        Insert: {
          created_at?: string | null
          depends_on_task_id?: string | null
          id?: string
          task_id?: string | null
        }
        Update: {
          created_at?: string | null
          depends_on_task_id?: string | null
          id?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_dependencies_depends_on_task_id_fkey"
            columns: ["depends_on_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_dependencies_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          milestone_id: string | null
          priority: number | null
          prompt: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          milestone_id?: string | null
          priority?: number | null
          prompt?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          milestone_id?: string | null
          priority?: number | null
          prompt?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
        ]
      }
      testnet_transactions: {
        Row: {
          amount: number
          amount_usd: number | null
          category: string | null
          created_at: string | null
          currency: string
          description: string | null
          from_address: string | null
          id: string
          metadata: Json | null
          needs_categorization: boolean | null
          network: string
          to_address: string | null
          transaction_date: string | null
          transaction_hash: string | null
          type: string
        }
        Insert: {
          amount: number
          amount_usd?: number | null
          category?: string | null
          created_at?: string | null
          currency: string
          description?: string | null
          from_address?: string | null
          id?: string
          metadata?: Json | null
          needs_categorization?: boolean | null
          network: string
          to_address?: string | null
          transaction_date?: string | null
          transaction_hash?: string | null
          type: string
        }
        Update: {
          amount?: number
          amount_usd?: number | null
          category?: string | null
          created_at?: string | null
          currency?: string
          description?: string | null
          from_address?: string | null
          id?: string
          metadata?: Json | null
          needs_categorization?: boolean | null
          network?: string
          to_address?: string | null
          transaction_date?: string | null
          transaction_hash?: string | null
          type?: string
        }
        Relationships: []
      }
      testnet_wallets: {
        Row: {
          address: string
          balance: number | null
          chain: string
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          address: string
          balance?: number | null
          chain: string
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          balance?: number | null
          chain?: string
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          amount_usd: number | null
          business_id: string | null
          category: string | null
          created_at: string | null
          currency: string
          description: string | null
          from_address: string | null
          id: string
          metadata: Json | null
          needs_categorization: boolean | null
          network: string
          project_id: string | null
          to_address: string | null
          transaction_date: string | null
          transaction_hash: string | null
          type: string
          wallet_id: string | null
        }
        Insert: {
          amount: number
          amount_usd?: number | null
          business_id?: string | null
          category?: string | null
          created_at?: string | null
          currency: string
          description?: string | null
          from_address?: string | null
          id?: string
          metadata?: Json | null
          needs_categorization?: boolean | null
          network: string
          project_id?: string | null
          to_address?: string | null
          transaction_date?: string | null
          transaction_hash?: string | null
          type: string
          wallet_id?: string | null
        }
        Update: {
          amount?: number
          amount_usd?: number | null
          business_id?: string | null
          category?: string | null
          created_at?: string | null
          currency?: string
          description?: string | null
          from_address?: string | null
          id?: string
          metadata?: Json | null
          needs_categorization?: boolean | null
          network?: string
          project_id?: string | null
          to_address?: string | null
          transaction_date?: string | null
          transaction_hash?: string | null
          type?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallet_portfolio"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_ai_proposals: {
        Row: {
          ai_model: string
          ai_recommended_amount_usd: number
          ai_session_id: string
          analysis_document_cid: string | null
          chain: string
          concerns: string[] | null
          confidence_level: number
          created_at: string
          global_pool_balance_usd: number
          id: string
          initial_funding_percentage: number
          initial_funding_usd: number
          iteration_number: number
          key_factors: string[] | null
          milestone_breakdown: Json
          ngo_requested_amount_usd: number
          parent_proposal_id: string | null
          project_id: string
          reasoning: string
          risk_budget_accuracy: number
          risk_milestone_feasibility: number
          risk_ngo_credibility: number
          risk_overall: number
          risk_timeline_realism: number
          status: string
          voting_proposal_id: string | null
        }
        Insert: {
          ai_model: string
          ai_recommended_amount_usd: number
          ai_session_id: string
          analysis_document_cid?: string | null
          chain?: string
          concerns?: string[] | null
          confidence_level: number
          created_at?: string
          global_pool_balance_usd: number
          id?: string
          initial_funding_percentage: number
          initial_funding_usd: number
          iteration_number?: number
          key_factors?: string[] | null
          milestone_breakdown: Json
          ngo_requested_amount_usd: number
          parent_proposal_id?: string | null
          project_id: string
          reasoning: string
          risk_budget_accuracy: number
          risk_milestone_feasibility: number
          risk_ngo_credibility: number
          risk_overall: number
          risk_timeline_realism: number
          status: string
          voting_proposal_id?: string | null
        }
        Update: {
          ai_model?: string
          ai_recommended_amount_usd?: number
          ai_session_id?: string
          analysis_document_cid?: string | null
          chain?: string
          concerns?: string[] | null
          confidence_level?: number
          created_at?: string
          global_pool_balance_usd?: number
          id?: string
          initial_funding_percentage?: number
          initial_funding_usd?: number
          iteration_number?: number
          key_factors?: string[] | null
          milestone_breakdown?: Json
          ngo_requested_amount_usd?: number
          parent_proposal_id?: string | null
          project_id?: string
          reasoning?: string
          risk_budget_accuracy?: number
          risk_milestone_feasibility?: number
          risk_ngo_credibility?: number
          risk_overall?: number
          risk_timeline_realism?: number
          status?: string
          voting_proposal_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_ai_proposals_parent_proposal_id_fkey"
            columns: ["parent_proposal_id"]
            isOneToOne: false
            referencedRelation: "urejesho_ai_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urejesho_ai_proposals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "urejesho_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_ai_verifications: {
        Row: {
          ai_model: string
          ai_session_id: string
          chain: string
          completion_indicators: string[] | null
          confidence_score: number
          created_at: string
          discrepancies: string[] | null
          human_review_decision: string | null
          human_review_notes: string | null
          human_review_reason: string | null
          human_reviewed: boolean | null
          human_reviewed_at: string | null
          human_reviewer_id: string | null
          id: string
          milestone_id: string
          news_sources: Json
          reasoning: string
          requires_human_review: boolean
          verification_report_cid: string | null
          verified: boolean
        }
        Insert: {
          ai_model: string
          ai_session_id: string
          chain?: string
          completion_indicators?: string[] | null
          confidence_score: number
          created_at?: string
          discrepancies?: string[] | null
          human_review_decision?: string | null
          human_review_notes?: string | null
          human_review_reason?: string | null
          human_reviewed?: boolean | null
          human_reviewed_at?: string | null
          human_reviewer_id?: string | null
          id?: string
          milestone_id: string
          news_sources: Json
          reasoning: string
          requires_human_review?: boolean
          verification_report_cid?: string | null
          verified: boolean
        }
        Update: {
          ai_model?: string
          ai_session_id?: string
          chain?: string
          completion_indicators?: string[] | null
          confidence_score?: number
          created_at?: string
          discrepancies?: string[] | null
          human_review_decision?: string | null
          human_review_notes?: string | null
          human_review_reason?: string | null
          human_reviewed?: boolean | null
          human_reviewed_at?: string | null
          human_reviewer_id?: string | null
          id?: string
          milestone_id?: string
          news_sources?: Json
          reasoning?: string
          requires_human_review?: boolean
          verification_report_cid?: string | null
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_ai_verifications_human_reviewer_id_fkey"
            columns: ["human_reviewer_id"]
            isOneToOne: false
            referencedRelation: "urejesho_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urejesho_ai_verifications_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "urejesho_milestones"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_donations: {
        Row: {
          amount_tokens: number
          amount_usd: number
          category: string | null
          chain: string
          consensus_timestamp: string
          created_at: string
          donated_to_global_pool: boolean | null
          donation_type: string | null
          hedera_transaction_id: string
          id: string
          original_tx_hash: string | null
          percentage_value: number | null
          status: string
          user_hedera_account_id: string
          user_id: string | null
        }
        Insert: {
          amount_tokens: number
          amount_usd: number
          category?: string | null
          chain?: string
          consensus_timestamp: string
          created_at?: string
          donated_to_global_pool?: boolean | null
          donation_type?: string | null
          hedera_transaction_id: string
          id?: string
          original_tx_hash?: string | null
          percentage_value?: number | null
          status?: string
          user_hedera_account_id: string
          user_id?: string | null
        }
        Update: {
          amount_tokens?: number
          amount_usd?: number
          category?: string | null
          chain?: string
          consensus_timestamp?: string
          created_at?: string
          donated_to_global_pool?: boolean | null
          donation_type?: string | null
          hedera_transaction_id?: string
          id?: string
          original_tx_hash?: string | null
          percentage_value?: number | null
          status?: string
          user_hedera_account_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_donations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "urejesho_users"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_file_registry: {
        Row: {
          chain: string
          content_hash: string
          created_at: string
          file_name: string
          file_size_bytes: number
          file_type: string
          hfs_file_id: string | null
          id: string
          ipfs_cid: string | null
          metadata: Json | null
          mime_type: string
          owner_id: string
          owner_type: string
          provenance_message_id: string | null
          provenance_topic_id: string | null
          related_milestone_id: string | null
          related_ngo_id: string | null
          related_project_id: string | null
          storage_type: string
          updated_at: string
        }
        Insert: {
          chain: string
          content_hash: string
          created_at?: string
          file_name: string
          file_size_bytes: number
          file_type: string
          hfs_file_id?: string | null
          id?: string
          ipfs_cid?: string | null
          metadata?: Json | null
          mime_type: string
          owner_id: string
          owner_type: string
          provenance_message_id?: string | null
          provenance_topic_id?: string | null
          related_milestone_id?: string | null
          related_ngo_id?: string | null
          related_project_id?: string | null
          storage_type: string
          updated_at?: string
        }
        Update: {
          chain?: string
          content_hash?: string
          created_at?: string
          file_name?: string
          file_size_bytes?: number
          file_type?: string
          hfs_file_id?: string | null
          id?: string
          ipfs_cid?: string | null
          metadata?: Json | null
          mime_type?: string
          owner_id?: string
          owner_type?: string
          provenance_message_id?: string | null
          provenance_topic_id?: string | null
          related_milestone_id?: string | null
          related_ngo_id?: string | null
          related_project_id?: string | null
          storage_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_file_registry_related_milestone_id_fkey"
            columns: ["related_milestone_id"]
            isOneToOne: false
            referencedRelation: "urejesho_milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urejesho_file_registry_related_ngo_id_fkey"
            columns: ["related_ngo_id"]
            isOneToOne: false
            referencedRelation: "urejesho_ngo_stats"
            referencedColumns: ["ngo_id"]
          },
          {
            foreignKeyName: "urejesho_file_registry_related_ngo_id_fkey"
            columns: ["related_ngo_id"]
            isOneToOne: false
            referencedRelation: "urejesho_ngos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urejesho_file_registry_related_project_id_fkey"
            columns: ["related_project_id"]
            isOneToOne: false
            referencedRelation: "urejesho_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_global_pool_config: {
        Row: {
          chain: string
          created_at: string
          hedera_account_id: string
          id: string
          notes: string | null
          smart_contract_address: string
          updated_at: string
        }
        Insert: {
          chain: string
          created_at?: string
          hedera_account_id: string
          id?: string
          notes?: string | null
          smart_contract_address: string
          updated_at?: string
        }
        Update: {
          chain?: string
          created_at?: string
          hedera_account_id?: string
          id?: string
          notes?: string | null
          smart_contract_address?: string
          updated_at?: string
        }
        Relationships: []
      }
      urejesho_impact_badges: {
        Row: {
          account_id: string
          awarded_at: string
          categories_supported: number | null
          chain: string
          countries_supported: number | null
          created_at: string
          hfs_file_id: string | null
          id: string
          ipfs_metadata_cid: string
          nft_token_id: string
          projects_supported: number | null
          tier: string
          total_donations_usd: number
          user_id: string
        }
        Insert: {
          account_id: string
          awarded_at?: string
          categories_supported?: number | null
          chain?: string
          countries_supported?: number | null
          created_at?: string
          hfs_file_id?: string | null
          id?: string
          ipfs_metadata_cid: string
          nft_token_id: string
          projects_supported?: number | null
          tier: string
          total_donations_usd: number
          user_id: string
        }
        Update: {
          account_id?: string
          awarded_at?: string
          categories_supported?: number | null
          chain?: string
          countries_supported?: number | null
          created_at?: string
          hfs_file_id?: string | null
          id?: string
          ipfs_metadata_cid?: string
          nft_token_id?: string
          projects_supported?: number | null
          tier?: string
          total_donations_usd?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_impact_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "urejesho_users"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_milestones: {
        Row: {
          ai_verification_confidence: number | null
          ai_verification_id: string | null
          ai_verified: boolean | null
          chain: string
          created_at: string
          description: string
          documents: string[] | null
          evidence_photos: string[] | null
          expected_completion_date: string | null
          funded_at: string | null
          funding_allocation_usd: number
          gps_coordinates: Json | null
          guardian_document_id: string | null
          hcs_submission_message_id: string | null
          hcs_verification_message_id: string | null
          hedera_milestone_id: string | null
          id: string
          is_initial_funding: boolean | null
          long_description: string | null
          milestone_number: number
          project_id: string
          rejection_reason: string | null
          requires_human_review: boolean | null
          satellite_images: string[] | null
          short_description: string | null
          status: string
          submitted_at: string | null
          success_criteria: Json | null
          title: string | null
          updated_at: string
          verification_data: Json | null
          verification_method: string | null
          verified_at: string | null
        }
        Insert: {
          ai_verification_confidence?: number | null
          ai_verification_id?: string | null
          ai_verified?: boolean | null
          chain?: string
          created_at?: string
          description: string
          documents?: string[] | null
          evidence_photos?: string[] | null
          expected_completion_date?: string | null
          funded_at?: string | null
          funding_allocation_usd: number
          gps_coordinates?: Json | null
          guardian_document_id?: string | null
          hcs_submission_message_id?: string | null
          hcs_verification_message_id?: string | null
          hedera_milestone_id?: string | null
          id?: string
          is_initial_funding?: boolean | null
          long_description?: string | null
          milestone_number: number
          project_id: string
          rejection_reason?: string | null
          requires_human_review?: boolean | null
          satellite_images?: string[] | null
          short_description?: string | null
          status?: string
          submitted_at?: string | null
          success_criteria?: Json | null
          title?: string | null
          updated_at?: string
          verification_data?: Json | null
          verification_method?: string | null
          verified_at?: string | null
        }
        Update: {
          ai_verification_confidence?: number | null
          ai_verification_id?: string | null
          ai_verified?: boolean | null
          chain?: string
          created_at?: string
          description?: string
          documents?: string[] | null
          evidence_photos?: string[] | null
          expected_completion_date?: string | null
          funded_at?: string | null
          funding_allocation_usd?: number
          gps_coordinates?: Json | null
          guardian_document_id?: string | null
          hcs_submission_message_id?: string | null
          hcs_verification_message_id?: string | null
          hedera_milestone_id?: string | null
          id?: string
          is_initial_funding?: boolean | null
          long_description?: string | null
          milestone_number?: number
          project_id?: string
          rejection_reason?: string | null
          requires_human_review?: boolean | null
          satellite_images?: string[] | null
          short_description?: string | null
          status?: string
          submitted_at?: string | null
          success_criteria?: Json | null
          title?: string | null
          updated_at?: string
          verification_data?: Json | null
          verification_method?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_milestone_ai_verification"
            columns: ["ai_verification_id"]
            isOneToOne: false
            referencedRelation: "urejesho_ai_verifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urejesho_milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "urejesho_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_ngo_credentials: {
        Row: {
          chain: string
          consensus_timestamp: string | null
          created_at: string
          credential: Json
          credential_id: string
          credential_type: string[]
          did: string
          did_document: Json
          did_topic_id: string
          expires_at: string | null
          hcs_message_id: string | null
          hcs_topic_id: string
          id: string
          issued_at: string
          issuer_did: string
          issuer_name: string
          metadata: Json | null
          ngo_id: string
          revoked: boolean | null
          revoked_at: string | null
          revoked_reason: string | null
          suspended: boolean | null
          suspended_at: string | null
          suspended_reason: string | null
          updated_at: string
          verification_documents: string[] | null
        }
        Insert: {
          chain: string
          consensus_timestamp?: string | null
          created_at?: string
          credential: Json
          credential_id: string
          credential_type: string[]
          did: string
          did_document: Json
          did_topic_id: string
          expires_at?: string | null
          hcs_message_id?: string | null
          hcs_topic_id: string
          id?: string
          issued_at?: string
          issuer_did: string
          issuer_name?: string
          metadata?: Json | null
          ngo_id: string
          revoked?: boolean | null
          revoked_at?: string | null
          revoked_reason?: string | null
          suspended?: boolean | null
          suspended_at?: string | null
          suspended_reason?: string | null
          updated_at?: string
          verification_documents?: string[] | null
        }
        Update: {
          chain?: string
          consensus_timestamp?: string | null
          created_at?: string
          credential?: Json
          credential_id?: string
          credential_type?: string[]
          did?: string
          did_document?: Json
          did_topic_id?: string
          expires_at?: string | null
          hcs_message_id?: string | null
          hcs_topic_id?: string
          id?: string
          issued_at?: string
          issuer_did?: string
          issuer_name?: string
          metadata?: Json | null
          ngo_id?: string
          revoked?: boolean | null
          revoked_at?: string | null
          revoked_reason?: string | null
          suspended?: boolean | null
          suspended_at?: string | null
          suspended_reason?: string | null
          updated_at?: string
          verification_documents?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_ngo_credentials_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "urejesho_ngo_stats"
            referencedColumns: ["ngo_id"]
          },
          {
            foreignKeyName: "urejesho_ngo_credentials_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "urejesho_ngos"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_ngos: {
        Row: {
          chain: string
          city: string | null
          completed_projects: number | null
          country: string
          created_at: string
          description: string | null
          did_credential_id: string | null
          email: string
          facebook: string | null
          funding_received_usd: number | null
          hedera_account_id: string
          id: string
          linkedin: string | null
          logo_url: string | null
          mission: string | null
          name: string
          phone: string | null
          postal_code: string | null
          registration_country: string | null
          registration_documents: string[] | null
          registration_number: string | null
          representative_email: string | null
          representative_name: string | null
          representative_phone: string | null
          representative_title: string | null
          sectors: Json | null
          state: string | null
          street: string | null
          tax_id: string | null
          total_projects: number | null
          twitter: string | null
          type: string | null
          updated_at: string
          verification_documents: string[] | null
          verification_status: string
          verified_at: string | null
          website: string | null
          year_established: number | null
        }
        Insert: {
          chain?: string
          city?: string | null
          completed_projects?: number | null
          country: string
          created_at?: string
          description?: string | null
          did_credential_id?: string | null
          email: string
          facebook?: string | null
          funding_received_usd?: number | null
          hedera_account_id: string
          id?: string
          linkedin?: string | null
          logo_url?: string | null
          mission?: string | null
          name: string
          phone?: string | null
          postal_code?: string | null
          registration_country?: string | null
          registration_documents?: string[] | null
          registration_number?: string | null
          representative_email?: string | null
          representative_name?: string | null
          representative_phone?: string | null
          representative_title?: string | null
          sectors?: Json | null
          state?: string | null
          street?: string | null
          tax_id?: string | null
          total_projects?: number | null
          twitter?: string | null
          type?: string | null
          updated_at?: string
          verification_documents?: string[] | null
          verification_status?: string
          verified_at?: string | null
          website?: string | null
          year_established?: number | null
        }
        Update: {
          chain?: string
          city?: string | null
          completed_projects?: number | null
          country?: string
          created_at?: string
          description?: string | null
          did_credential_id?: string | null
          email?: string
          facebook?: string | null
          funding_received_usd?: number | null
          hedera_account_id?: string
          id?: string
          linkedin?: string | null
          logo_url?: string | null
          mission?: string | null
          name?: string
          phone?: string | null
          postal_code?: string | null
          registration_country?: string | null
          registration_documents?: string[] | null
          registration_number?: string | null
          representative_email?: string | null
          representative_name?: string | null
          representative_phone?: string | null
          representative_title?: string | null
          sectors?: Json | null
          state?: string | null
          street?: string | null
          tax_id?: string | null
          total_projects?: number | null
          twitter?: string | null
          type?: string | null
          updated_at?: string
          verification_documents?: string[] | null
          verification_status?: string
          verified_at?: string | null
          website?: string | null
          year_established?: number | null
        }
        Relationships: []
      }
      urejesho_project_updates: {
        Row: {
          chain: string
          consensus_timestamp: string | null
          content: string
          created_at: string
          documents: string[] | null
          hcs_message_id: string | null
          id: string
          images: string[] | null
          is_milestone_update: boolean | null
          is_public: boolean | null
          ngo_id: string
          project_id: string
          related_milestone_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          chain: string
          consensus_timestamp?: string | null
          content: string
          created_at?: string
          documents?: string[] | null
          hcs_message_id?: string | null
          id?: string
          images?: string[] | null
          is_milestone_update?: boolean | null
          is_public?: boolean | null
          ngo_id: string
          project_id: string
          related_milestone_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          chain?: string
          consensus_timestamp?: string | null
          content?: string
          created_at?: string
          documents?: string[] | null
          hcs_message_id?: string | null
          id?: string
          images?: string[] | null
          is_milestone_update?: boolean | null
          is_public?: boolean | null
          ngo_id?: string
          project_id?: string
          related_milestone_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_project_updates_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "urejesho_ngo_stats"
            referencedColumns: ["ngo_id"]
          },
          {
            foreignKeyName: "urejesho_project_updates_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "urejesho_ngos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urejesho_project_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "urejesho_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urejesho_project_updates_related_milestone_id_fkey"
            columns: ["related_milestone_id"]
            isOneToOne: false
            referencedRelation: "urejesho_milestones"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_projects: {
        Row: {
          actual_completion_date: string | null
          ai_approved_amount_usd: number | null
          amount_funded_usd: number | null
          beneficiary_count: number | null
          category: string | null
          chain: string
          completed_milestone_count: number | null
          country: string
          created_at: string
          description: string
          expected_completion_date: string | null
          expected_impact: string[] | null
          guardian_document_id: string | null
          hfs_file_id: string | null
          id: string
          images: string[] | null
          initial_fund_amount_usd: number | null
          initial_fund_released: boolean | null
          initial_fund_released_at: string | null
          latitude: number
          location: unknown
          long_description: string | null
          longitude: number
          milestone_count: number | null
          name: string
          ngo_id: string
          ngo_requested_amount_usd: number
          proposal_document_ipfs: string | null
          region: string | null
          short_description: string | null
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          actual_completion_date?: string | null
          ai_approved_amount_usd?: number | null
          amount_funded_usd?: number | null
          beneficiary_count?: number | null
          category?: string | null
          chain?: string
          completed_milestone_count?: number | null
          country: string
          created_at?: string
          description: string
          expected_completion_date?: string | null
          expected_impact?: string[] | null
          guardian_document_id?: string | null
          hfs_file_id?: string | null
          id?: string
          images?: string[] | null
          initial_fund_amount_usd?: number | null
          initial_fund_released?: boolean | null
          initial_fund_released_at?: string | null
          latitude: number
          location: unknown
          long_description?: string | null
          longitude: number
          milestone_count?: number | null
          name: string
          ngo_id: string
          ngo_requested_amount_usd: number
          proposal_document_ipfs?: string | null
          region?: string | null
          short_description?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          actual_completion_date?: string | null
          ai_approved_amount_usd?: number | null
          amount_funded_usd?: number | null
          beneficiary_count?: number | null
          category?: string | null
          chain?: string
          completed_milestone_count?: number | null
          country?: string
          created_at?: string
          description?: string
          expected_completion_date?: string | null
          expected_impact?: string[] | null
          guardian_document_id?: string | null
          hfs_file_id?: string | null
          id?: string
          images?: string[] | null
          initial_fund_amount_usd?: number | null
          initial_fund_released?: boolean | null
          initial_fund_released_at?: string | null
          latitude?: number
          location?: unknown
          long_description?: string | null
          longitude?: number
          milestone_count?: number | null
          name?: string
          ngo_id?: string
          ngo_requested_amount_usd?: number
          proposal_document_ipfs?: string | null
          region?: string | null
          short_description?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_projects_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "urejesho_ngo_stats"
            referencedColumns: ["ngo_id"]
          },
          {
            foreignKeyName: "urejesho_projects_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "urejesho_ngos"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_satellite_imagery: {
        Row: {
          acquisition_date: string
          analysis_data: Json | null
          chain: string
          change_detected: boolean | null
          changed_area_sqm: number | null
          cloud_coverage_percent: number | null
          confidence_score: number | null
          created_at: string
          id: string
          ipfs_cid: string
          layer_type: string
          milestone_id: string | null
          project_id: string
          resolution_meters: number | null
          satellite_source: string | null
        }
        Insert: {
          acquisition_date: string
          analysis_data?: Json | null
          chain?: string
          change_detected?: boolean | null
          changed_area_sqm?: number | null
          cloud_coverage_percent?: number | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          ipfs_cid: string
          layer_type: string
          milestone_id?: string | null
          project_id: string
          resolution_meters?: number | null
          satellite_source?: string | null
        }
        Update: {
          acquisition_date?: string
          analysis_data?: Json | null
          chain?: string
          change_detected?: boolean | null
          changed_area_sqm?: number | null
          cloud_coverage_percent?: number | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          ipfs_cid?: string
          layer_type?: string
          milestone_id?: string | null
          project_id?: string
          resolution_meters?: number | null
          satellite_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_satellite_imagery_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "urejesho_milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urejesho_satellite_imagery_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "urejesho_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_saved_projects: {
        Row: {
          chain: string
          id: string
          project_id: string
          saved_at: string
          user_hedera_account_id: string
        }
        Insert: {
          chain: string
          id?: string
          project_id: string
          saved_at?: string
          user_hedera_account_id: string
        }
        Update: {
          chain?: string
          id?: string
          project_id?: string
          saved_at?: string
          user_hedera_account_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_saved_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "urejesho_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_users: {
        Row: {
          avatar_ipfs_cid: string | null
          bio: string | null
          chain: string
          countries_of_interest: string[] | null
          country: string | null
          created_at: string
          current_badge_tier: string | null
          did: string | null
          hedera_account_id: string
          id: string
          lifetime_contribution_usd: number | null
          name: string | null
          notification_preferences: Json | null
          privacy_settings: Json | null
          projects_supported: number | null
          total_donations_usd: number | null
          updated_at: string
        }
        Insert: {
          avatar_ipfs_cid?: string | null
          bio?: string | null
          chain?: string
          countries_of_interest?: string[] | null
          country?: string | null
          created_at?: string
          current_badge_tier?: string | null
          did?: string | null
          hedera_account_id: string
          id?: string
          lifetime_contribution_usd?: number | null
          name?: string | null
          notification_preferences?: Json | null
          privacy_settings?: Json | null
          projects_supported?: number | null
          total_donations_usd?: number | null
          updated_at?: string
        }
        Update: {
          avatar_ipfs_cid?: string | null
          bio?: string | null
          chain?: string
          countries_of_interest?: string[] | null
          country?: string | null
          created_at?: string
          current_badge_tier?: string | null
          did?: string | null
          hedera_account_id?: string
          id?: string
          lifetime_contribution_usd?: number | null
          name?: string | null
          notification_preferences?: Json | null
          privacy_settings?: Json | null
          projects_supported?: number | null
          total_donations_usd?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      urejesho_vault_fee_accounts: {
        Row: {
          allowance_expires_at: string | null
          authorized_allowance: number
          created_at: string | null
          donation_mode: string
          hedera_account_id: string
          is_active: boolean | null
          last_monthly_charge: string | null
          last_transaction_at: string | null
          monthly_amount: number
          monthly_charge_count: number
          monthly_charge_day: number | null
          monthly_enabled: boolean | null
          next_monthly_charge: string | null
          pause_reason: string | null
          paused_at: string | null
          per_transaction_amount: number
          per_transaction_enabled: boolean | null
          remaining_allowance: number
          service_key_public: string
          threshold_key_enabled: boolean | null
          total_fees_collected: number
          transaction_count: number
          updated_at: string | null
          user_id: string | null
          user_original_key: string
        }
        Insert: {
          allowance_expires_at?: string | null
          authorized_allowance?: number
          created_at?: string | null
          donation_mode?: string
          hedera_account_id: string
          is_active?: boolean | null
          last_monthly_charge?: string | null
          last_transaction_at?: string | null
          monthly_amount?: number
          monthly_charge_count?: number
          monthly_charge_day?: number | null
          monthly_enabled?: boolean | null
          next_monthly_charge?: string | null
          pause_reason?: string | null
          paused_at?: string | null
          per_transaction_amount?: number
          per_transaction_enabled?: boolean | null
          remaining_allowance?: number
          service_key_public: string
          threshold_key_enabled?: boolean | null
          total_fees_collected?: number
          transaction_count?: number
          updated_at?: string | null
          user_id?: string | null
          user_original_key: string
        }
        Update: {
          allowance_expires_at?: string | null
          authorized_allowance?: number
          created_at?: string | null
          donation_mode?: string
          hedera_account_id?: string
          is_active?: boolean | null
          last_monthly_charge?: string | null
          last_transaction_at?: string | null
          monthly_amount?: number
          monthly_charge_count?: number
          monthly_charge_day?: number | null
          monthly_enabled?: boolean | null
          next_monthly_charge?: string | null
          pause_reason?: string | null
          paused_at?: string | null
          per_transaction_amount?: number
          per_transaction_enabled?: boolean | null
          remaining_allowance?: number
          service_key_public?: string
          threshold_key_enabled?: boolean | null
          total_fees_collected?: number
          transaction_count?: number
          updated_at?: string | null
          user_id?: string | null
          user_original_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_vault_fee_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "urejesho_users"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_vault_fee_monitoring_state: {
        Row: {
          consecutive_errors: number | null
          hedera_account_id: string
          is_monitoring: boolean | null
          last_checked_consensus_timestamp: string | null
          last_error_at: string | null
          last_error_message: string | null
          last_processed_transaction_id: string | null
          monitoring_started_at: string | null
          monitoring_stopped_at: string | null
          updated_at: string | null
        }
        Insert: {
          consecutive_errors?: number | null
          hedera_account_id: string
          is_monitoring?: boolean | null
          last_checked_consensus_timestamp?: string | null
          last_error_at?: string | null
          last_error_message?: string | null
          last_processed_transaction_id?: string | null
          monitoring_started_at?: string | null
          monitoring_stopped_at?: string | null
          updated_at?: string | null
        }
        Update: {
          consecutive_errors?: number | null
          hedera_account_id?: string
          is_monitoring?: boolean | null
          last_checked_consensus_timestamp?: string | null
          last_error_at?: string | null
          last_error_message?: string | null
          last_processed_transaction_id?: string | null
          monitoring_started_at?: string | null
          monitoring_stopped_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_vault_fee_monitoring_state_hedera_account_id_fkey"
            columns: ["hedera_account_id"]
            isOneToOne: true
            referencedRelation: "urejesho_user_vault_fee_dashboard"
            referencedColumns: ["hedera_account_id"]
          },
          {
            foreignKeyName: "urejesho_vault_fee_monitoring_state_hedera_account_id_fkey"
            columns: ["hedera_account_id"]
            isOneToOne: true
            referencedRelation: "urejesho_vault_fee_accounts"
            referencedColumns: ["hedera_account_id"]
          },
        ]
      }
      urejesho_vault_fee_monthly_schedule: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          hedera_account_id: string
          hedera_transaction_id: string | null
          id: string
          scheduled_date: string
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          hedera_account_id: string
          hedera_transaction_id?: string | null
          id?: string
          scheduled_date: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          hedera_account_id?: string
          hedera_transaction_id?: string | null
          id?: string
          scheduled_date?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_vault_fee_monthly_schedule_hedera_account_id_fkey"
            columns: ["hedera_account_id"]
            isOneToOne: false
            referencedRelation: "urejesho_user_vault_fee_dashboard"
            referencedColumns: ["hedera_account_id"]
          },
          {
            foreignKeyName: "urejesho_vault_fee_monthly_schedule_hedera_account_id_fkey"
            columns: ["hedera_account_id"]
            isOneToOne: false
            referencedRelation: "urejesho_vault_fee_accounts"
            referencedColumns: ["hedera_account_id"]
          },
        ]
      }
      urejesho_vault_fee_transactions: {
        Row: {
          collection_type: string
          consensus_timestamp: string | null
          created_at: string | null
          error_message: string | null
          hedera_account_id: string
          hedera_transaction_id: string
          id: string
          original_transaction_id: string | null
          status: string
          updated_at: string | null
          vault_fee_amount: number
        }
        Insert: {
          collection_type: string
          consensus_timestamp?: string | null
          created_at?: string | null
          error_message?: string | null
          hedera_account_id: string
          hedera_transaction_id: string
          id?: string
          original_transaction_id?: string | null
          status?: string
          updated_at?: string | null
          vault_fee_amount: number
        }
        Update: {
          collection_type?: string
          consensus_timestamp?: string | null
          created_at?: string | null
          error_message?: string | null
          hedera_account_id?: string
          hedera_transaction_id?: string
          id?: string
          original_transaction_id?: string | null
          status?: string
          updated_at?: string | null
          vault_fee_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_vault_fee_transactions_hedera_account_id_fkey"
            columns: ["hedera_account_id"]
            isOneToOne: false
            referencedRelation: "urejesho_user_vault_fee_dashboard"
            referencedColumns: ["hedera_account_id"]
          },
          {
            foreignKeyName: "urejesho_vault_fee_transactions_hedera_account_id_fkey"
            columns: ["hedera_account_id"]
            isOneToOne: false
            referencedRelation: "urejesho_vault_fee_accounts"
            referencedColumns: ["hedera_account_id"]
          },
        ]
      }
      urejesho_votes: {
        Row: {
          chain: string
          consensus_timestamp: string
          created_at: string
          did_signature: string | null
          hcs_message_id: string
          id: string
          proposal_id: string
          user_id: string | null
          vote_choice: string
          voter_account_id: string
          voting_power: number
        }
        Insert: {
          chain?: string
          consensus_timestamp: string
          created_at?: string
          did_signature?: string | null
          hcs_message_id: string
          id?: string
          proposal_id: string
          user_id?: string | null
          vote_choice: string
          voter_account_id: string
          voting_power: number
        }
        Update: {
          chain?: string
          consensus_timestamp?: string
          created_at?: string
          did_signature?: string | null
          hcs_message_id?: string
          id?: string
          proposal_id?: string
          user_id?: string | null
          vote_choice?: string
          voter_account_id?: string
          voting_power?: number
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "urejesho_voting_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urejesho_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "urejesho_users"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_voting_proposals: {
        Row: {
          accept_votes: number | null
          accept_voting_power: number | null
          ai_analysis_reasoning: string | null
          ai_proposal_id: string | null
          ai_proposed_amount: number
          chain: string
          created_at: string
          decrease_votes: number | null
          decrease_voting_power: number | null
          description: string
          end_date: string
          guardian_document_id: string | null
          hcs_result_message_id: string | null
          id: string
          increase_votes: number | null
          increase_voting_power: number | null
          iteration_number: number | null
          ngo_requested_amount: number
          parent_proposal_id: string | null
          project_id: string
          reject_votes: number | null
          reject_voting_power: number | null
          start_date: string
          status: string
          title: string
          total_votes: number | null
          total_voting_power: number | null
          updated_at: string
        }
        Insert: {
          accept_votes?: number | null
          accept_voting_power?: number | null
          ai_analysis_reasoning?: string | null
          ai_proposal_id?: string | null
          ai_proposed_amount: number
          chain?: string
          created_at?: string
          decrease_votes?: number | null
          decrease_voting_power?: number | null
          description: string
          end_date: string
          guardian_document_id?: string | null
          hcs_result_message_id?: string | null
          id?: string
          increase_votes?: number | null
          increase_voting_power?: number | null
          iteration_number?: number | null
          ngo_requested_amount: number
          parent_proposal_id?: string | null
          project_id: string
          reject_votes?: number | null
          reject_voting_power?: number | null
          start_date: string
          status?: string
          title: string
          total_votes?: number | null
          total_voting_power?: number | null
          updated_at?: string
        }
        Update: {
          accept_votes?: number | null
          accept_voting_power?: number | null
          ai_analysis_reasoning?: string | null
          ai_proposal_id?: string | null
          ai_proposed_amount?: number
          chain?: string
          created_at?: string
          decrease_votes?: number | null
          decrease_voting_power?: number | null
          description?: string
          end_date?: string
          guardian_document_id?: string | null
          hcs_result_message_id?: string | null
          id?: string
          increase_votes?: number | null
          increase_voting_power?: number | null
          iteration_number?: number | null
          ngo_requested_amount?: number
          parent_proposal_id?: string | null
          project_id?: string
          reject_votes?: number | null
          reject_voting_power?: number | null
          start_date?: string
          status?: string
          title?: string
          total_votes?: number | null
          total_voting_power?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_voting_proposals_ai_proposal_id_fkey"
            columns: ["ai_proposal_id"]
            isOneToOne: false
            referencedRelation: "urejesho_ai_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urejesho_voting_proposals_parent_proposal_id_fkey"
            columns: ["parent_proposal_id"]
            isOneToOne: false
            referencedRelation: "urejesho_voting_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urejesho_voting_proposals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "urejesho_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      vault_fee_accounts: {
        Row: {
          created_at: string | null
          hedera_account_id: string
          id: string
          is_active: boolean | null
          last_transaction_at: string | null
          opt_out_reason: string | null
          opted_out_at: string | null
          service_key_public: string
          threshold_key_enabled: boolean | null
          threshold_key_setup_at: string | null
          total_fees_collected: number | null
          transaction_count: number | null
          updated_at: string | null
          user_id: string | null
          user_original_key: string | null
          vault_fee_amount: number | null
          vault_fee_enabled: boolean | null
        }
        Insert: {
          created_at?: string | null
          hedera_account_id: string
          id?: string
          is_active?: boolean | null
          last_transaction_at?: string | null
          opt_out_reason?: string | null
          opted_out_at?: string | null
          service_key_public: string
          threshold_key_enabled?: boolean | null
          threshold_key_setup_at?: string | null
          total_fees_collected?: number | null
          transaction_count?: number | null
          updated_at?: string | null
          user_id?: string | null
          user_original_key?: string | null
          vault_fee_amount?: number | null
          vault_fee_enabled?: boolean | null
        }
        Update: {
          created_at?: string | null
          hedera_account_id?: string
          id?: string
          is_active?: boolean | null
          last_transaction_at?: string | null
          opt_out_reason?: string | null
          opted_out_at?: string | null
          service_key_public?: string
          threshold_key_enabled?: boolean | null
          threshold_key_setup_at?: string | null
          total_fees_collected?: number | null
          transaction_count?: number | null
          updated_at?: string | null
          user_id?: string | null
          user_original_key?: string | null
          vault_fee_amount?: number | null
          vault_fee_enabled?: boolean | null
        }
        Relationships: []
      }
      vault_fee_transactions: {
        Row: {
          consensus_timestamp: string | null
          created_at: string | null
          error_message: string | null
          hedera_account_id: string
          hedera_transaction_id: string
          id: string
          original_transaction_amount: number | null
          processed_at: string | null
          retry_count: number | null
          status: string | null
          transaction_memo: string | null
          transaction_type: string | null
          vault_fee_amount: number
        }
        Insert: {
          consensus_timestamp?: string | null
          created_at?: string | null
          error_message?: string | null
          hedera_account_id: string
          hedera_transaction_id: string
          id?: string
          original_transaction_amount?: number | null
          processed_at?: string | null
          retry_count?: number | null
          status?: string | null
          transaction_memo?: string | null
          transaction_type?: string | null
          vault_fee_amount: number
        }
        Update: {
          consensus_timestamp?: string | null
          created_at?: string | null
          error_message?: string | null
          hedera_account_id?: string
          hedera_transaction_id?: string
          id?: string
          original_transaction_amount?: number | null
          processed_at?: string | null
          retry_count?: number | null
          status?: string | null
          transaction_memo?: string | null
          transaction_type?: string | null
          vault_fee_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "vault_fee_transactions_hedera_account_id_fkey"
            columns: ["hedera_account_id"]
            isOneToOne: false
            referencedRelation: "vault_fee_accounts"
            referencedColumns: ["hedera_account_id"]
          },
        ]
      }
      velox_maker_transactions: {
        Row: {
          created_at: string | null
          id: number
          intent_id: string
          maker_tx_hash: string
          user_address: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          intent_id: string
          maker_tx_hash: string
          user_address: string
        }
        Update: {
          created_at?: string | null
          id?: number
          intent_id?: string
          maker_tx_hash?: string
          user_address?: string
        }
        Relationships: []
      }
      velox_taker_transactions: {
        Row: {
          created_at: string | null
          fill_amount: string | null
          id: number
          intent_id: string
          solver_address: string
          taker_tx_hash: string
        }
        Insert: {
          created_at?: string | null
          fill_amount?: string | null
          id?: number
          intent_id: string
          solver_address: string
          taker_tx_hash: string
        }
        Update: {
          created_at?: string | null
          fill_amount?: string | null
          id?: number
          intent_id?: string
          solver_address?: string
          taker_tx_hash?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          address: string
          balance: number | null
          chain: string
          created_at: string | null
          doxxed: boolean | null
          id: string
          name: string
          token_balances: Json | null
          updated_at: string | null
        }
        Insert: {
          address: string
          balance?: number | null
          chain: string
          created_at?: string | null
          doxxed?: boolean | null
          id?: string
          name: string
          token_balances?: Json | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          balance?: number | null
          chain?: string
          created_at?: string | null
          doxxed?: boolean | null
          id?: string
          name?: string
          token_balances?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      workflows: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          project_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          project_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          project_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      yellowdotfun_comment_likes: {
        Row: {
          comment_id: string
          created_at: string | null
          id: string
          user_address: string
        }
        Insert: {
          comment_id: string
          created_at?: string | null
          id?: string
          user_address: string
        }
        Update: {
          comment_id?: string
          created_at?: string | null
          id?: string
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "yellowdotfun_comment_likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yellowdotfun_comment_likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_comments_with_likes"
            referencedColumns: ["id"]
          },
        ]
      }
      yellowdotfun_comments: {
        Row: {
          content: string
          created_at: string | null
          edited_at: string | null
          id: string
          image_url: string | null
          is_deleted: boolean | null
          likes_count: number | null
          parent_comment_id: string | null
          token_id: string
          user_address: string
        }
        Insert: {
          content: string
          created_at?: string | null
          edited_at?: string | null
          id?: string
          image_url?: string | null
          is_deleted?: boolean | null
          likes_count?: number | null
          parent_comment_id?: string | null
          token_id: string
          user_address: string
        }
        Update: {
          content?: string
          created_at?: string | null
          edited_at?: string | null
          id?: string
          image_url?: string | null
          is_deleted?: boolean | null
          likes_count?: number | null
          parent_comment_id?: string | null
          token_id?: string
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "yellowdotfun_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yellowdotfun_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_comments_with_likes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yellowdotfun_comments_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      yellowdotfun_creator_earnings: {
        Row: {
          creator_address: string
          id: string
          last_claim_at: string | null
          last_fee_at: string | null
          token_id: string
          total_fees_claimed: number | null
          total_fees_earned: number | null
        }
        Insert: {
          creator_address: string
          id?: string
          last_claim_at?: string | null
          last_fee_at?: string | null
          token_id: string
          total_fees_claimed?: number | null
          total_fees_earned?: number | null
        }
        Update: {
          creator_address?: string
          id?: string
          last_claim_at?: string | null
          last_fee_at?: string | null
          token_id?: string
          total_fees_claimed?: number | null
          total_fees_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "yellowdotfun_creator_earnings_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      yellowdotfun_tokens: {
        Row: {
          bonding_curve_k: number
          circulating_supply: number
          created_at: string
          creator_address: string
          creator_fee_percentage: number
          description: string | null
          graduated_at: string | null
          holder_count: number | null
          id: string
          image_url: string | null
          initial_virtual_sol_reserves: number
          initial_virtual_token_reserves: number
          is_graduated: boolean | null
          last_trade_at: string | null
          launch_block: number | null
          liquidity_pool_address: string | null
          name: string
          ticker: string
          total_supply: number
          trade_count_24h: number | null
          trade_count_total: number | null
          volume_24h: number | null
          volume_7d: number | null
          volume_total: number | null
        }
        Insert: {
          bonding_curve_k: number
          circulating_supply?: number
          created_at?: string
          creator_address: string
          creator_fee_percentage?: number
          description?: string | null
          graduated_at?: string | null
          holder_count?: number | null
          id?: string
          image_url?: string | null
          initial_virtual_sol_reserves?: number
          initial_virtual_token_reserves?: number
          is_graduated?: boolean | null
          last_trade_at?: string | null
          launch_block?: number | null
          liquidity_pool_address?: string | null
          name: string
          ticker: string
          total_supply: number
          trade_count_24h?: number | null
          trade_count_total?: number | null
          volume_24h?: number | null
          volume_7d?: number | null
          volume_total?: number | null
        }
        Update: {
          bonding_curve_k?: number
          circulating_supply?: number
          created_at?: string
          creator_address?: string
          creator_fee_percentage?: number
          description?: string | null
          graduated_at?: string | null
          holder_count?: number | null
          id?: string
          image_url?: string | null
          initial_virtual_sol_reserves?: number
          initial_virtual_token_reserves?: number
          is_graduated?: boolean | null
          last_trade_at?: string | null
          launch_block?: number | null
          liquidity_pool_address?: string | null
          name?: string
          ticker?: string
          total_supply?: number
          trade_count_24h?: number | null
          trade_count_total?: number | null
          volume_24h?: number | null
          volume_7d?: number | null
          volume_total?: number | null
        }
        Relationships: []
      }
      yellowdotfun_top_holders: {
        Row: {
          balance: number
          id: string
          percentage_held: number
          rank: number
          token_id: string
          updated_at: string | null
          user_address: string
        }
        Insert: {
          balance: number
          id?: string
          percentage_held: number
          rank: number
          token_id: string
          updated_at?: string | null
          user_address: string
        }
        Update: {
          balance?: number
          id?: string
          percentage_held?: number
          rank?: number
          token_id?: string
          updated_at?: string | null
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "yellowdotfun_top_holders_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      yellowdotfun_trades: {
        Row: {
          block_number: number | null
          creator_fee_amount: number | null
          id: string
          price_per_token: number
          sol_amount: number
          timestamp: string
          token_amount: number
          token_id: string
          trade_type: string
          trader_address: string
          tx_signature: string | null
          virtual_sol_reserves: number
          virtual_token_reserves: number
        }
        Insert: {
          block_number?: number | null
          creator_fee_amount?: number | null
          id?: string
          price_per_token: number
          sol_amount: number
          timestamp?: string
          token_amount: number
          token_id: string
          trade_type: string
          trader_address: string
          tx_signature?: string | null
          virtual_sol_reserves: number
          virtual_token_reserves: number
        }
        Update: {
          block_number?: number | null
          creator_fee_amount?: number | null
          id?: string
          price_per_token?: number
          sol_amount?: number
          timestamp?: string
          token_amount?: number
          token_id?: string
          trade_type?: string
          trader_address?: string
          tx_signature?: string | null
          virtual_sol_reserves?: number
          virtual_token_reserves?: number
        }
        Relationships: [
          {
            foreignKeyName: "yellowdotfun_trades_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      yellowdotfun_user_balances: {
        Row: {
          avg_buy_price: number | null
          balance: number
          first_bought_at: string | null
          id: string
          last_updated: string | null
          token_id: string
          total_bought: number | null
          total_sold: number | null
          user_address: string
        }
        Insert: {
          avg_buy_price?: number | null
          balance?: number
          first_bought_at?: string | null
          id?: string
          last_updated?: string | null
          token_id: string
          total_bought?: number | null
          total_sold?: number | null
          user_address: string
        }
        Update: {
          avg_buy_price?: number | null
          balance?: number
          first_bought_at?: string | null
          id?: string
          last_updated?: string | null
          token_id?: string
          total_bought?: number | null
          total_sold?: number | null
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "yellowdotfun_user_balances_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      yellowdotfun_watchlist: {
        Row: {
          added_at: string | null
          id: string
          token_id: string
          user_address: string
        }
        Insert: {
          added_at?: string | null
          id?: string
          token_id: string
          user_address: string
        }
        Update: {
          added_at?: string | null
          id?: string
          token_id?: string
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "yellowdotfun_watchlist_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      yellowperps_level_history: {
        Row: {
          credit_multiplier: number | null
          dev_deposit_amount: number | null
          id: string
          new_level: number | null
          old_level: number | null
          profit_milestone: number | null
          upgraded_at: string | null
          user_id: string | null
        }
        Insert: {
          credit_multiplier?: number | null
          dev_deposit_amount?: number | null
          id?: string
          new_level?: number | null
          old_level?: number | null
          profit_milestone?: number | null
          upgraded_at?: string | null
          user_id?: string | null
        }
        Update: {
          credit_multiplier?: number | null
          dev_deposit_amount?: number | null
          id?: string
          new_level?: number | null
          old_level?: number | null
          profit_milestone?: number | null
          upgraded_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "yellowperps_level_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "yellowperps_users"
            referencedColumns: ["id"]
          },
        ]
      }
      yellowperps_positions: {
        Row: {
          closed_at: string | null
          closed_price: number | null
          entry_price: number
          fees_cbtc: number | null
          id: string
          leverage: number
          margin_cbtc: number
          opened_at: string | null
          realized_pnl: number | null
          side: string
          size: number
          status: string | null
          symbol: string
          user_id: string | null
        }
        Insert: {
          closed_at?: string | null
          closed_price?: number | null
          entry_price: number
          fees_cbtc?: number | null
          id?: string
          leverage: number
          margin_cbtc: number
          opened_at?: string | null
          realized_pnl?: number | null
          side: string
          size: number
          status?: string | null
          symbol: string
          user_id?: string | null
        }
        Update: {
          closed_at?: string | null
          closed_price?: number | null
          entry_price?: number
          fees_cbtc?: number | null
          id?: string
          leverage?: number
          margin_cbtc?: number
          opened_at?: string | null
          realized_pnl?: number | null
          side?: string
          size?: number
          status?: string | null
          symbol?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "yellowperps_positions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "yellowperps_users"
            referencedColumns: ["id"]
          },
        ]
      }
      yellowperps_price_feeds: {
        Row: {
          price: number
          source: string | null
          symbol: string
          timestamp: string | null
        }
        Insert: {
          price: number
          source?: string | null
          symbol: string
          timestamp?: string | null
        }
        Update: {
          price?: number
          source?: string | null
          symbol?: string
          timestamp?: string | null
        }
        Relationships: []
      }
      yellowperps_trades: {
        Row: {
          executed_at: string | null
          fee_btc: number | null
          id: string
          position_id: string | null
          price: number
          realized_pnl: number | null
          side: string
          size: number
          symbol: string
          trade_type: string | null
          user_id: string | null
        }
        Insert: {
          executed_at?: string | null
          fee_btc?: number | null
          id?: string
          position_id?: string | null
          price: number
          realized_pnl?: number | null
          side: string
          size: number
          symbol: string
          trade_type?: string | null
          user_id?: string | null
        }
        Update: {
          executed_at?: string | null
          fee_btc?: number | null
          id?: string
          position_id?: string | null
          price?: number
          realized_pnl?: number | null
          side?: string
          size?: number
          symbol?: string
          trade_type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "yellowperps_trades_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "yellowperps_positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yellowperps_trades_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "yellowperps_users"
            referencedColumns: ["id"]
          },
        ]
      }
      yellowperps_transactions: {
        Row: {
          block_number: number | null
          chain: string
          created_at: string
          description: string
          gas_price: string | null
          gas_used: string | null
          id: string
          status: string
          timestamp: string
          token_symbol: string | null
          transaction_hash: string | null
          transaction_id: string | null
          updated_at: string
          value: string | null
          wallet_address: string
        }
        Insert: {
          block_number?: number | null
          chain: string
          created_at?: string
          description: string
          gas_price?: string | null
          gas_used?: string | null
          id?: string
          status: string
          timestamp?: string
          token_symbol?: string | null
          transaction_hash?: string | null
          transaction_id?: string | null
          updated_at?: string
          value?: string | null
          wallet_address: string
        }
        Update: {
          block_number?: number | null
          chain?: string
          created_at?: string
          description?: string
          gas_price?: string | null
          gas_used?: string | null
          id?: string
          status?: string
          timestamp?: string
          token_symbol?: string | null
          transaction_hash?: string | null
          transaction_id?: string | null
          updated_at?: string
          value?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      yellowperps_users: {
        Row: {
          channel_id: string | null
          created_at: string | null
          id: string
          total_deposits_cbtc: number | null
          total_profit_cbtc: number | null
          total_volume_cbtc: number | null
          updated_at: string | null
          user_level: number | null
          wallet_address: string
        }
        Insert: {
          channel_id?: string | null
          created_at?: string | null
          id?: string
          total_deposits_cbtc?: number | null
          total_profit_cbtc?: number | null
          total_volume_cbtc?: number | null
          updated_at?: string | null
          user_level?: number | null
          wallet_address: string
        }
        Update: {
          channel_id?: string | null
          created_at?: string | null
          id?: string
          total_deposits_cbtc?: number | null
          total_profit_cbtc?: number | null
          total_volume_cbtc?: number | null
          updated_at?: string | null
          user_level?: number | null
          wallet_address?: string
        }
        Relationships: []
      }
    }
    Views: {
      active_owner_conversations: {
        Row: {
          agent_display_name: string | null
          agent_mood: string | null
          agent_name: string | null
          agent_status: string | null
          business_name: string | null
          id: string | null
          last_message: Json | null
          last_message_at: string | null
          message_count: number | null
          pending_actions: number | null
          priority: string | null
          project_title: string | null
          purpose: string | null
          started_at: string | null
          status: string | null
          title: string | null
        }
        Relationships: []
      }
      active_playwright_allocations: {
        Row: {
          allocated_at: string | null
          category: string | null
          hours_allocated: number | null
          port: number | null
          project_id: string | null
          project_title: string | null
          server_id: string | null
          session_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playwright_allocations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playwright_allocations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playwright_allocations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      dxyperps_leaderboard: {
        Row: {
          avatar_url: string | null
          chain_id: number | null
          id: string | null
          last_trade_at: string | null
          losses: number | null
          pnl_rank: number | null
          roi_percentage: number | null
          roi_rank: number | null
          total_pnl: number | null
          total_trades: number | null
          total_volume: number | null
          username: string | null
          volume_rank: number | null
          wallet_address: string | null
          win_rate: number | null
          wins: number | null
        }
        Relationships: []
      }
      dxyperps_market_stats: {
        Row: {
          active_traders: number | null
          chain_id: number | null
          id: string | null
          last_price: number | null
          long_open_interest: number | null
          name: string | null
          open_positions: number | null
          short_open_interest: number | null
          symbol: string | null
          total_open_interest: number | null
          volume_24h: number | null
        }
        Relationships: []
      }
      dxyperps_positions_summary: {
        Row: {
          chain_id: number | null
          entry_price: number | null
          id: string | null
          initial_margin: number | null
          leverage: number | null
          liquidation_price: number | null
          margin_ratio: number | null
          mark_price: number | null
          market_id: string | null
          market_symbol: string | null
          opened_at: string | null
          pnl_percentage: number | null
          position_type: string | null
          size: number | null
          stop_loss_price: number | null
          take_profit_price: number | null
          trader_id: string | null
          unrealized_pnl: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dxyperps_positions_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_market_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_positions_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_positions_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dxyperps_positions_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "dxyperps_traders"
            referencedColumns: ["id"]
          },
        ]
      }
      finance_summary: {
        Row: {
          net_profit: number | null
          periods: Json | null
          total_revenue: number | null
          total_spend: number | null
        }
        Relationships: []
      }
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown
          f_table_catalog: unknown
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown
          f_table_catalog: string | null
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      liquidity_pool_stats: {
        Row: {
          avg_lp_token_price: number | null
          daily_actions: number | null
          daily_deposits: number | null
          daily_deposits_usdc: number | null
          daily_withdrawals: number | null
          daily_withdrawals_usdc: number | null
          day: string | null
          end_of_day_tvl: number | null
        }
        Relationships: []
      }
      liquidity_user_stats: {
        Row: {
          current_lp_balance: number | null
          first_action: string | null
          last_action: string | null
          total_actions: number | null
          total_deposited_usdc: number | null
          total_deposits: number | null
          total_withdrawals: number | null
          total_withdrawn_usdc: number | null
          wallet_address: string | null
        }
        Relationships: []
      }
      mocat_ai_agent_performance: {
        Row: {
          accuracy_rate: number | null
          agent_description: string | null
          agent_name: string | null
          agent_version: string | null
          available_revenue: number | null
          chain_id: number | null
          claimable_revenue: number | null
          deployed_at: string | null
          developer_id: string | null
          developer_name: string | null
          id: string | null
          image_url: string | null
          is_active: boolean | null
          is_testnet: boolean | null
          losses: number | null
          per_analysis_fee: number | null
          tee_deployment_url: string | null
          tee_logic_hash: string | null
          total_revenue: number | null
          total_validations: number | null
          updated_at: string | null
          wins: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mocat_ai_ai_agents_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_users"
            referencedColumns: ["id"]
          },
        ]
      }
      mocat_ai_expert_leaderboard: {
        Row: {
          available_revenue: number | null
          avg_agent_confidence: number | null
          bio: string | null
          chain_id: number | null
          created_at: string | null
          current_followers: number | null
          display_name: string | null
          id: string | null
          is_testnet: boolean | null
          is_verified: boolean | null
          losses: number | null
          profit_cut: number | null
          reputation_score: number | null
          total_followers: number | null
          total_loss_amount: number | null
          total_signals_posted: number | null
          total_win_amount: number | null
          user_id: string | null
          verification_date: string | null
          wallet_address: string | null
          win_rate: number | null
          wins: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mocat_ai_expert_traders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "mocat_ai_users"
            referencedColumns: ["id"]
          },
        ]
      }
      owner_conversation_stats: {
        Row: {
          active_conversations: number | null
          agent_display_name: string | null
          agent_messages: number | null
          agent_name: string | null
          avg_performance_rating: number | null
          completed_conversations: number | null
          last_activity: string | null
          owner_messages: number | null
          pending_actions: number | null
          total_commands: number | null
          total_conversations: number | null
          total_messages: number | null
        }
        Relationships: []
      }
      playwright_allocation_status: {
        Row: {
          allocated_instances: number | null
          available_instances: number | null
          category: string | null
          error_instances: number | null
          maintenance_instances: number | null
          total_instances: number | null
          utilization_percentage: number | null
        }
        Relationships: []
      }
      project_status_summary: {
        Row: {
          agent_name: string | null
          association_type: string | null
          business_id: string | null
          business_name: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          hackathon_id: string | null
          hackathon_name: string | null
          id: string | null
          image_url: string | null
          is_template: boolean | null
          managing_agent_id: string | null
          progress: number | null
          public_url: string | null
          started_at: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          workflows: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_hackathon_id_fkey"
            columns: ["hackathon_id"]
            isOneToOne: false
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_managing_agent_id_fkey"
            columns: ["managing_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      project_wallet_summary: {
        Row: {
          address: string | null
          balance: number | null
          chain: string | null
          created_at: string | null
          ecosystem: string | null
          funding_count: number | null
          id: string | null
          last_funded_at: string | null
          project_id: string | null
          project_title: string | null
          total_funded: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_wallets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_status_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_wallets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      recent_transactions: {
        Row: {
          amount: number | null
          amount_usd: number | null
          business_name: string | null
          category: string | null
          currency: string | null
          description: string | null
          from_address: string | null
          id: string | null
          needs_categorization: boolean | null
          project_title: string | null
          to_address: string | null
          transaction_date: string | null
          transaction_hash: string | null
          type: string | null
          wallet_chain: string | null
          wallet_doxxed: boolean | null
          wallet_name: string | null
        }
        Relationships: []
      }
      recent_vault_fee_transactions: {
        Row: {
          consensus_timestamp: string | null
          hedera_account_id: string | null
          hedera_transaction_id: string | null
          id: string | null
          status: string | null
          user_id: string | null
          vault_fee_amount: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vault_fee_transactions_hedera_account_id_fkey"
            columns: ["hedera_account_id"]
            isOneToOne: false
            referencedRelation: "vault_fee_accounts"
            referencedColumns: ["hedera_account_id"]
          },
        ]
      }
      spending_breakdown: {
        Row: {
          avg_transaction: number | null
          category: string | null
          first_transaction: string | null
          last_transaction: string | null
          total_amount: number | null
          transaction_count: number | null
        }
        Relationships: []
      }
      urejesho_category_distribution: {
        Row: {
          avg_funded_usd: number | null
          category: string | null
          chain: string | null
          funding_percentage: number | null
          project_count: number | null
          total_approved_usd: number | null
          total_funded_usd: number | null
        }
        Relationships: []
      }
      urejesho_donation_trends: {
        Row: {
          avg_amount_usd: number | null
          chain: string | null
          date: string | null
          total_amount_usd: number | null
          transaction_count: number | null
          unique_donors: number | null
        }
        Relationships: []
      }
      urejesho_geographic_distribution: {
        Row: {
          avg_latitude: number | null
          avg_longitude: number | null
          chain: string | null
          country: string | null
          project_count: number | null
          total_approved_usd: number | null
          total_beneficiaries: number | null
          total_funded_usd: number | null
        }
        Relationships: []
      }
      urejesho_ngo_stats: {
        Row: {
          chain: string | null
          country: string | null
          email: string | null
          logo_url: string | null
          name: string | null
          ngo_id: string | null
          projects_active: number | null
          projects_completed: number | null
          projects_voting: number | null
          total_approved_usd: number | null
          total_beneficiaries_reached: number | null
          total_funded_usd: number | null
          total_projects: number | null
          verification_status: string | null
          website: string | null
        }
        Relationships: []
      }
      urejesho_pending_monthly_charges: {
        Row: {
          amount: number | null
          hedera_account_id: string | null
          id: string | null
          is_active: boolean | null
          remaining_allowance: number | null
          scheduled_date: string | null
          status: string | null
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_vault_fee_monthly_schedule_hedera_account_id_fkey"
            columns: ["hedera_account_id"]
            isOneToOne: false
            referencedRelation: "urejesho_user_vault_fee_dashboard"
            referencedColumns: ["hedera_account_id"]
          },
          {
            foreignKeyName: "urejesho_vault_fee_monthly_schedule_hedera_account_id_fkey"
            columns: ["hedera_account_id"]
            isOneToOne: false
            referencedRelation: "urejesho_vault_fee_accounts"
            referencedColumns: ["hedera_account_id"]
          },
        ]
      }
      urejesho_user_vault_fee_dashboard: {
        Row: {
          allowance_expires_at: string | null
          authorized_allowance: number | null
          created_at: string | null
          donation_mode: string | null
          hedera_account_id: string | null
          is_active: boolean | null
          is_monitoring: boolean | null
          last_checked_consensus_timestamp: string | null
          monthly_amount: number | null
          monthly_charge_count: number | null
          monthly_charge_day: number | null
          monthly_enabled: boolean | null
          next_monthly_charge: string | null
          pause_reason: string | null
          paused_at: string | null
          per_transaction_amount: number | null
          per_transaction_enabled: boolean | null
          remaining_allowance: number | null
          threshold_key_enabled: boolean | null
          total_fees_collected: number | null
          transaction_count: number | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "urejesho_vault_fee_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "urejesho_users"
            referencedColumns: ["id"]
          },
        ]
      }
      urejesho_vault_fee_stats: {
        Row: {
          active_accounts: number | null
          monthly_accounts: number | null
          per_transaction_accounts: number | null
          total_accounts: number | null
          total_fees_collected_hbar: number | null
          total_fees_collected_tinybars: number | null
          total_monthly_count: number | null
          total_transaction_count: number | null
        }
        Relationships: []
      }
      vault_fee_stats: {
        Row: {
          active_accounts: number | null
          avg_vault_fee_amount: number | null
          enabled_accounts: number | null
          total_accounts: number | null
          total_fees_collected_tinybars: number | null
          total_transactions: number | null
        }
        Relationships: []
      }
      wallet_portfolio: {
        Row: {
          address: string | null
          chain: string | null
          created_at: string | null
          doxxed: boolean | null
          id: string | null
          name: string | null
          native_balance: number | null
          native_balance_usd: number | null
          token_balances: Json | null
          total_value_usd: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          chain?: string | null
          created_at?: string | null
          doxxed?: boolean | null
          id?: string | null
          name?: string | null
          native_balance?: number | null
          native_balance_usd?: never
          token_balances?: Json | null
          total_value_usd?: never
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          chain?: string | null
          created_at?: string | null
          doxxed?: boolean | null
          id?: string | null
          name?: string | null
          native_balance?: number | null
          native_balance_usd?: never
          token_balances?: Json | null
          total_value_usd?: never
          updated_at?: string | null
        }
        Relationships: []
      }
      yellowdotfun_comments_with_likes: {
        Row: {
          content: string | null
          created_at: string | null
          edited_at: string | null
          id: string | null
          image_url: string | null
          is_deleted: boolean | null
          likes_count: number | null
          parent_comment_id: string | null
          replies_count: number | null
          token_id: string | null
          user_address: string | null
          user_liked: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "yellowdotfun_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yellowdotfun_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_comments_with_likes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yellowdotfun_comments_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "yellowdotfun_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { newname: string; oldname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { col: string; tbl: unknown }
        Returns: unknown
      }
      _postgis_pgsql_version: { Args: never; Returns: string }
      _postgis_scripts_pgsql_version: { Args: never; Returns: string }
      _postgis_selectivity: {
        Args: { att_name: string; geom: unknown; mode?: string; tbl: unknown }
        Returns: number
      }
      _postgis_stats: {
        Args: { ""?: string; att_name: string; tbl: unknown }
        Returns: string
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_sortablehash: { Args: { geom: unknown }; Returns: number }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          clip?: unknown
          g1: unknown
          return_polygons?: boolean
          tolerance?: number
        }
        Returns: unknown
      }
      _st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      addauth: { Args: { "": string }; Returns: boolean }
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              new_dim: number
              new_srid_in: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
      authorize_vault_fee_allowance: {
        Args: {
          p_allowance_amount: number
          p_expires_in_days?: number
          p_hedera_account_id: string
        }
        Returns: undefined
      }
      calculate_next_monthly_charge: {
        Args: { charge_day: number; from_date?: string }
        Returns: string
      }
      calculate_total_contribution: {
        Args: { p_days?: number; p_hedera_account_id: string }
        Returns: {
          avg_per_transaction: number
          monthly_count: number
          per_transaction_count: number
          period_end: string
          period_start: string
          total_amount: number
          transaction_count: number
        }[]
      }
      check_allowance_status: {
        Args: { p_hedera_account_id: string }
        Returns: {
          authorized_allowance: number
          days_until_expiry: number
          expires_at: string
          is_expired: boolean
          needs_renewal: boolean
          remaining_allowance: number
          usage_percentage: number
          used_allowance: number
        }[]
      }
      disablelongtransactions: { Args: never; Returns: string }
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { column_name: string; table_name: string }; Returns: string }
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { schema_name: string; table_name: string }; Returns: string }
        | { Args: { table_name: string }; Returns: string }
      dxyperps_calculate_liquidation_price: {
        Args: {
          entry_price: number
          leverage: number
          maintenance_margin_rate: number
          position_type: string
        }
        Returns: number
      }
      enablelongtransactions: { Args: never; Returns: string }
      equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      geometry: { Args: { "": string }; Returns: unknown }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geomfromewkt: { Args: { "": string }; Returns: unknown }
      get_accounts_for_monitoring: {
        Args: never
        Returns: {
          hedera_account_id: string
          per_transaction_amount: number
          remaining_allowance: number
        }[]
      }
      get_global_vault_fee_stats: {
        Args: never
        Returns: {
          active_accounts: number
          avg_monthly_amount: number
          avg_per_transaction_amount: number
          last_24h_fees: number
          last_24h_transactions: number
          monthly_accounts: number
          per_transaction_accounts: number
          total_accounts: number
          total_fees_collected_hbar: number
          total_fees_collected_tinybars: number
          total_transactions: number
        }[]
      }
      get_recent_vault_fee_transactions: {
        Args: { p_account_id: string; p_limit?: number }
        Returns: {
          amount: number
          status: string
          tx_id: string
          tx_timestamp: string
        }[]
      }
      get_user_monthly_schedule: {
        Args: { p_hedera_account_id: string; p_months_ahead?: number }
        Returns: {
          amount: number
          completed_at: string
          hedera_transaction_id: string
          id: string
          scheduled_date: string
          status: string
        }[]
      }
      get_user_vault_fee_history: {
        Args: {
          p_hedera_account_id: string
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          collection_type: string
          consensus_timestamp: string
          created_at: string
          hedera_transaction_id: string
          id: string
          original_transaction_id: string
          status: string
          vault_fee_amount: number
        }[]
      }
      get_vault_fee_account_stats: {
        Args: { p_account_id: string }
        Returns: {
          account_id: string
          avg_fee: number
          is_active: boolean
          last_tx: string
          total_donated: number
          tx_count: number
        }[]
      }
      gettransactionid: { Args: never; Returns: unknown }
      increment_vault_fee_stats: {
        Args: {
          p_fee_amount: number
          p_hedera_account_id: string
          p_transaction_type: string
        }
        Returns: undefined
      }
      longtransactionsenabled: { Args: never; Returns: boolean }
      opt_in_vault_fee: { Args: { p_account_id: string }; Returns: boolean }
      opt_out_vault_fee: {
        Args: { p_account_id: string; p_reason?: string }
        Returns: boolean
      }
      pause_vault_fee: {
        Args: { p_hedera_account_id: string; p_reason?: string }
        Returns: undefined
      }
      populate_geometry_columns:
        | { Args: { tbl_oid: unknown; use_typmod?: boolean }; Returns: number }
        | { Args: { use_typmod?: boolean }; Returns: string }
      postgis_constraint_dims: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: string
      }
      postgis_extensions_upgrade: { Args: never; Returns: string }
      postgis_full_version: { Args: never; Returns: string }
      postgis_geos_version: { Args: never; Returns: string }
      postgis_lib_build_date: { Args: never; Returns: string }
      postgis_lib_revision: { Args: never; Returns: string }
      postgis_lib_version: { Args: never; Returns: string }
      postgis_libjson_version: { Args: never; Returns: string }
      postgis_liblwgeom_version: { Args: never; Returns: string }
      postgis_libprotobuf_version: { Args: never; Returns: string }
      postgis_libxml_version: { Args: never; Returns: string }
      postgis_proj_version: { Args: never; Returns: string }
      postgis_scripts_build_date: { Args: never; Returns: string }
      postgis_scripts_installed: { Args: never; Returns: string }
      postgis_scripts_released: { Args: never; Returns: string }
      postgis_svn_version: { Args: never; Returns: string }
      postgis_type_name: {
        Args: {
          coord_dimension: number
          geomname: string
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_version: { Args: never; Returns: string }
      postgis_wagyu_version: { Args: never; Returns: string }
      release_stale_playwright_allocations: { Args: never; Returns: number }
      resume_vault_fee: {
        Args: { p_hedera_account_id: string }
        Returns: undefined
      }
      schedule_next_monthly_charge: {
        Args: { p_hedera_account_id: string }
        Returns: undefined
      }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle:
        | { Args: { line1: unknown; line2: unknown }; Returns: number }
        | {
            Args: { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
            Returns: number
          }
      st_area:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkt: { Args: { "": string }; Returns: string }
      st_asgeojson:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: {
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
              r: Record<string, unknown>
            }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_asgml:
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
            }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
      st_askml:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: { Args: { format?: string; geom: unknown }; Returns: string }
      st_asmvtgeom: {
        Args: {
          bounds: unknown
          buffer?: number
          clip_geom?: boolean
          extent?: number
          geom: unknown
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_astext: { Args: { "": string }; Returns: string }
      st_astwkb:
        | {
            Args: {
              geom: unknown
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: number }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_boundingdiagonal: {
        Args: { fits?: boolean; geom: unknown }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: { geom: unknown; options?: string; radius: number }
            Returns: unknown
          }
        | {
            Args: { geom: unknown; quadsegs: number; radius: number }
            Returns: unknown
          }
      st_centroid: { Args: { "": string }; Returns: unknown }
      st_clipbybox2d: {
        Args: { box: unknown; geom: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collect: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_concavehull: {
        Args: {
          param_allow_holes?: boolean
          param_geom: unknown
          param_pctconvex: number
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_coorddim: { Args: { geometry: unknown }; Returns: number }
      st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_crosses: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_curvetoline: {
        Args: { flags?: number; geom: unknown; tol?: number; toltype?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { flags?: number; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance:
        | {
            Args: { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
            Returns: number
          }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_distancesphere:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
        | {
            Args: { geom1: unknown; geom2: unknown; radius: number }
            Returns: number
          }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_expand:
        | { Args: { box: unknown; dx: number; dy: number }; Returns: unknown }
        | {
            Args: { box: unknown; dx: number; dy: number; dz?: number }
            Returns: unknown
          }
        | {
            Args: {
              dm?: number
              dx: number
              dy: number
              dz?: number
              geom: unknown
            }
            Returns: unknown
          }
      st_force3d: { Args: { geom: unknown; zvalue?: number }; Returns: unknown }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; mvalue?: number; zvalue?: number }
        Returns: unknown
      }
      st_generatepoints:
        | { Args: { area: unknown; npoints: number }; Returns: unknown }
        | {
            Args: { area: unknown; npoints: number; seed: number }
            Returns: unknown
          }
      st_geogfromtext: { Args: { "": string }; Returns: unknown }
      st_geographyfromtext: { Args: { "": string }; Returns: unknown }
      st_geohash:
        | { Args: { geog: unknown; maxchars?: number }; Returns: string }
        | { Args: { geom: unknown; maxchars?: number }; Returns: string }
      st_geomcollfromtext: { Args: { "": string }; Returns: unknown }
      st_geometricmedian: {
        Args: {
          fail_if_not_converged?: boolean
          g: unknown
          max_iter?: number
          tolerance?: number
        }
        Returns: unknown
      }
      st_geometryfromtext: { Args: { "": string }; Returns: unknown }
      st_geomfromewkt: { Args: { "": string }; Returns: unknown }
      st_geomfromgeojson:
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": string }; Returns: unknown }
      st_geomfromgml: { Args: { "": string }; Returns: unknown }
      st_geomfromkml: { Args: { "": string }; Returns: unknown }
      st_geomfrommarc21: { Args: { marc21xml: string }; Returns: unknown }
      st_geomfromtext: { Args: { "": string }; Returns: unknown }
      st_gmltosql: { Args: { "": string }; Returns: unknown }
      st_hasarc: { Args: { geometry: unknown }; Returns: boolean }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_isvaliddetail: {
        Args: { flags?: number; geom: unknown }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
        SetofOptions: {
          from: "*"
          to: "valid_detail"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      st_length:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_letters: { Args: { font?: Json; letters: string }; Returns: unknown }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { nprecision?: number; txtin: string }
        Returns: unknown
      }
      st_linefromtext: { Args: { "": string }; Returns: unknown }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linetocurve: { Args: { geometry: unknown }; Returns: unknown }
      st_locatealong: {
        Args: { geometry: unknown; leftrightoffset?: number; measure: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          frommeasure: number
          geometry: unknown
          leftrightoffset?: number
          tomeasure: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { fromelevation: number; geometry: unknown; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_mlinefromtext: { Args: { "": string }; Returns: unknown }
      st_mpointfromtext: { Args: { "": string }; Returns: unknown }
      st_mpolyfromtext: { Args: { "": string }; Returns: unknown }
      st_multilinestringfromtext: { Args: { "": string }; Returns: unknown }
      st_multipointfromtext: { Args: { "": string }; Returns: unknown }
      st_multipolygonfromtext: { Args: { "": string }; Returns: unknown }
      st_node: { Args: { g: unknown }; Returns: unknown }
      st_normalize: { Args: { geom: unknown }; Returns: unknown }
      st_offsetcurve: {
        Args: { distance: number; line: unknown; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_pointfromtext: { Args: { "": string }; Returns: unknown }
      st_pointm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
        }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_polyfromtext: { Args: { "": string }; Returns: unknown }
      st_polygonfromtext: { Args: { "": string }; Returns: unknown }
      st_project: {
        Args: { azimuth: number; distance: number; geog: unknown }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_m?: number
          prec_x: number
          prec_y?: number
          prec_z?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: { Args: { geom1: unknown; geom2: unknown }; Returns: string }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid:
        | { Args: { geog: unknown; srid: number }; Returns: unknown }
        | { Args: { geom: unknown; srid: number }; Returns: unknown }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; is_outer?: boolean; vertex_fraction: number }
        Returns: unknown
      }
      st_split: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_square: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | { Args: { geog: unknown }; Returns: number }
        | { Args: { geom: unknown }; Returns: number }
      st_subdivide: {
        Args: { geom: unknown; gridsize?: number; maxvertices?: number }
        Returns: unknown[]
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          bounds?: unknown
          margin?: number
          x: number
          y: number
          zoom: number
        }
        Returns: unknown
      }
      st_touches: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_transform:
        | {
            Args: { from_proj: string; geom: unknown; to_proj: string }
            Returns: unknown
          }
        | {
            Args: { from_proj: string; geom: unknown; to_srid: number }
            Returns: unknown
          }
        | { Args: { geom: unknown; to_proj: string }; Returns: unknown }
      st_triangulatepolygon: { Args: { g1: unknown }; Returns: unknown }
      st_union:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
        | {
            Args: { geom1: unknown; geom2: unknown; gridsize: number }
            Returns: unknown
          }
      st_voronoilines: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_wkbtosql: { Args: { wkb: string }; Returns: unknown }
      st_wkttosql: { Args: { "": string }; Returns: unknown }
      st_wrapx: {
        Args: { geom: unknown; move: number; wrap: number }
        Returns: unknown
      }
      unlockrows: { Args: { "": string }; Returns: number }
      update_vault_fee_account_stats: {
        Args: { p_account_id: string; p_fee_amount: number }
        Returns: undefined
      }
      update_vault_fee_settings: {
        Args: {
          p_donation_mode?: string
          p_hedera_account_id: string
          p_monthly_amount?: number
          p_monthly_charge_day?: number
          p_monthly_enabled?: boolean
          p_per_transaction_amount?: number
          p_per_transaction_enabled?: boolean
        }
        Returns: undefined
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          column_name: string
          new_srid_in: number
          schema_name: string
          table_name: string
        }
        Returns: string
      }
      yellowdotfun_cleanup_token_stats: { Args: never; Returns: undefined }
    }
    Enums: {
      position_status: "pending" | "active" | "closed" | "failed"
      trade_status: "pending" | "active" | "closed" | "failed"
      trade_type:
        | "swap"
        | "add_liquidity"
        | "remove_liquidity"
        | "perps_long"
        | "perps_short"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      position_status: ["pending", "active", "closed", "failed"],
      trade_status: ["pending", "active", "closed", "failed"],
      trade_type: [
        "swap",
        "add_liquidity",
        "remove_liquidity",
        "perps_long",
        "perps_short",
      ],
    },
  },
} as const
