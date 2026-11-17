import { useActionState, useState } from "react";
import SubmitButton from "./SubmitButton";
import api from "./api";

const PostForm = ({ onCreated }) => {
  const [charCount, setCharCount] = useState(0);

  const submitAction = async (prev, formData) => {
    const title = formData.get("title")?.trim();
    const content = formData.get("content")?.trim();

    if (!title || !content) {
      return {
        error: "Both a title and content are required.",
        msg: "",
        title: title || "",
        content: content || "",
      };
    }

    try {
      await api.post("/posts", { title, content });
      await onCreated?.();
      setCharCount(0);

      return {
        error: null,
        msg: "Your post is live!",
        title: "",
        content: "",
      };
    } catch (error) {
      return {
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to publish post. Please try again.",
        msg: "",
        title,
        content,
      };
    }
  };

  const [state, formAction, isPending] = useActionState(submitAction, {
    error: null,
    msg: "",
    title: "",
    content: "",
  });

  return (
    <form
      action={formAction}
      className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <h3 className="text-base font-bold tracking-tight text-slate-900">
          Create a Post
        </h3>
        <span className="text-[11px] font-medium text-slate-400">
          {charCount} chars
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Headline
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Give your post an engaging title..."
            defaultValue={state.title}
            required
            disabled={isPending}
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white disabled:opacity-50 transition-all text-sm font-medium"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Body
          </label>
          <textarea
            name="content"
            id="content"
            placeholder="Share your thoughts, ideas, or updates..."
            rows={5}
            defaultValue={state.content}
            onChange={(e) => setCharCount(e.target.value.length)}
            required
            disabled={isPending}
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white disabled:opacity-50 transition-all text-sm leading-relaxed resize-y"
          />
        </div>
      </div>

      <SubmitButton label="Publish Post" pendingLabel="Publishing..." />

      {state.msg && (
        <div
          role="status"
          className="flex items-center gap-2 p-3 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/70 rounded-xl"
        >
          <svg
            className="w-4 h-4 shrink-0 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{state.msg}</span>
        </div>
      )}

      {state.error && (
        <div
          role="alert"
          className="flex items-center gap-2 p-3 text-xs font-medium bg-red-50 text-red-700 border border-red-200/70 rounded-xl"
        >
          <svg
            className="w-4 h-4 shrink-0 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{state.error}</span>
        </div>
      )}
    </form>
  );
};

export default PostForm;
