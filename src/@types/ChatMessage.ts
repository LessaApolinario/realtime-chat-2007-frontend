export interface ChatMessage {
  id: string;
  text: string;
  sentByMe: boolean;
  senderId: string;
  senderName: string;
  createdAt: string;
}
