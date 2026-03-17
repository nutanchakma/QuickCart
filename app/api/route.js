import { serve } from "inngest/next";
import { 
  inngest, 
  syncUserCreation, 
  syncUserUpdation, 
  syncUserDeletion   // ✅ ADD THIS
} from "@/config/inngest";

export const dynamic = "force-dynamic";

// Create an API that serves functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion   // ✅ ADD THIS
  ],
});