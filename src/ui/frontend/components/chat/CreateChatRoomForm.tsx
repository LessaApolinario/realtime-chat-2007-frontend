"use client";

import { ChatPermission } from "@/@types/enum/chat/ChatPermission";
import { ChatRoomType } from "@/@types/enum/chat/ChatRoomType";
import type { CreateChatRoomRequest } from "@/@types/http/request/auth";
import type { CreateChatRoomResponse } from "@/@types/http/response/auth";
import * as BaseSelect from "@/ui/frontend/components/radix/select";
import { useState } from "react";
import { InlineBannerMessage } from "../base/InlineBannerMessage";

interface CreateChatRoomFormProps {
  onClose: () => void;
  onCreateChatRoom: (
    chatRoom: CreateChatRoomRequest,
  ) => Promise<CreateChatRoomResponse>;
}

export function CreateChatRoomForm({
  onClose,
  onCreateChatRoom,
}: CreateChatRoomFormProps) {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState("");
  const [permission, setPermission] = useState<ChatPermission>(
    ChatPermission.ALL,
  );
  const [type, setType] = useState<ChatRoomType>(ChatRoomType.PUBLIC);
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (type === "private" && !password) {
      setError("Informe uma senha para salas privadas.");
      return;
    }

    try {
      const payload: CreateChatRoomRequest = {
        name,
        permission,
        type,
      };

      if (password) {
        payload.password = password;
      }

      const data = await onCreateChatRoom(payload);

      if (data.error) {
        setError(data.error.message ?? "Erro ao criar a sala.");
        return;
      }

      onClose();
    } catch (error) {
      console.error(error);
      setError("Erro inesperado. Tente novamente.");
    }
  }

  const fieldClasses =
    "h-12 w-full rounded-md border border-cyan-500 bg-zinc-900 px-3 text-cyan-400 placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none";

  const itemClasses =
    "cursor-pointer px-3 py-2 text-cyan-400 hover:bg-cyan-600 hover:text-zinc-900 focus:bg-cyan-500 focus:text-zinc-900";

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-center text-3xl font-semibold text-cyan-400">
        Criar sala
      </h2>

      {error && <InlineBannerMessage type="error" text={error} />}

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="roomName" className="text-sm text-zinc-300">
          Nome da sala
        </label>
        <input
          id="roomName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Digite o nome da sala"
          className={fieldClasses}
          required
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <label className="text-sm text-zinc-300">Permissão</label>
        <BaseSelect.Select
          value={permission}
          onValueChange={(val: ChatPermission) => setPermission(val)}
        >
          <BaseSelect.SelectTrigger className={fieldClasses}>
            <BaseSelect.SelectValue placeholder="Selecione a permissão" />
          </BaseSelect.SelectTrigger>
          <BaseSelect.SelectContent className="rounded-md border border-zinc-700 bg-zinc-900 text-cyan-400 shadow-lg">
            <BaseSelect.SelectItem value="all" className={itemClasses}>
              Todos
            </BaseSelect.SelectItem>
            <BaseSelect.SelectItem value="admin" className={itemClasses}>
              Admin
            </BaseSelect.SelectItem>
            <BaseSelect.SelectItem value="guest" className={itemClasses}>
              Convidado
            </BaseSelect.SelectItem>
          </BaseSelect.SelectContent>
        </BaseSelect.Select>
      </div>

      <div className="flex w-full flex-col gap-2">
        <label className="text-sm text-zinc-300">Tipo de sala</label>
        <BaseSelect.Select
          value={type}
          onValueChange={(val: ChatRoomType) => setType(val)}
        >
          <BaseSelect.SelectTrigger className={fieldClasses}>
            <BaseSelect.SelectValue placeholder="Selecione o tipo" />
          </BaseSelect.SelectTrigger>
          <BaseSelect.SelectContent className="rounded-md border border-zinc-700 bg-zinc-900 text-cyan-400 shadow-lg">
            <BaseSelect.SelectItem value="public" className={itemClasses}>
              Pública
            </BaseSelect.SelectItem>
            <BaseSelect.SelectItem value="private" className={itemClasses}>
              Privada
            </BaseSelect.SelectItem>
          </BaseSelect.SelectContent>
        </BaseSelect.Select>
      </div>

      {type === "private" && (
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-zinc-300">
            Senha da sala
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Digite uma senha"
            className={fieldClasses}
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="mt-4 h-12 w-full cursor-pointer rounded-md bg-cyan-600 font-medium text-zinc-800 transition-colors hover:bg-cyan-700"
      >
        Criar
      </button>
    </form>
  );
}
