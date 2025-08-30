import { useState } from "react";
import { io, type Socket } from "socket.io-client";

type EventCallback = (...args: any[]) => void | Promise<void>;

export function useSocket(baseUrl?: string) {
  const [socket, setSocket] = useState<Socket>();

  function createWebSocketConnection(token: string) {
    const newSocket = io(baseUrl, { auth: { token } });
    setSocket(newSocket);
  }

  function emitEvent(event: string, ...args: any[]) {
    socket?.emit(event, ...args);
  }

  function onEvent(event: string, callback: EventCallback) {
    socket?.on(event, callback);
  }

  function offEvent(event: string, callback?: EventCallback) {
    socket?.off(event, callback);
  }

  return {
    socket,
    createWebSocketConnection,
    emitEvent,
    onEvent,
    offEvent,
  };
}
