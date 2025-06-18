import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppStore } from "@/lib/store";
import AIAssistant from "./AIAssistant";

export default function AIModal() {
  const { aiModalOpen, setAIModalOpen } = useAppStore();
  return (
    <Dialog open={aiModalOpen} onOpenChange={setAIModalOpen}>
      <DialogContent className="max-w-2xl p-0">
        <AIAssistant />
      </DialogContent>
    </Dialog>
  );
}
